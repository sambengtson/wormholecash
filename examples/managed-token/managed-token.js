/*
  Consume 1 WHC to create a new managed token.
*/

"use strict";

// Instantiate wormholecash
//let Wormhole = require("wormholecash/lib/Wormhole").default;
let Wormhole = require("../../src/node/Wormhole");
let wormhole = new Wormhole({ restURL: `http://localhost:3000/v1/` });
//let wormhole = new Wormhole({ restURL: `https://trest.bitcoin.com/v1/` });

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" });

const fs = require("fs");

const util = require("util");
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true
};
console.log(
  `wormhole.RawTransactions: ${util.inspect(wormhole.RawTransactions)}`
);
//process.exit(0);

// Open the wallet generated with create-wallet.
let walletInfo;
try {
  walletInfo = require(`../create-wallet/wallet.json`);
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.
    Exiting.`
  );
  process.exit(0);
}

// Create a managed token.
async function createManagedToken() {
  try {
    let mnemonic = walletInfo.mnemonic;

    // root seed buffer
    let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

    // master HDNode
    let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, "testnet");

    // HDNode of BIP44 account
    let account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

    let change = BITBOX.HDNode.derivePath(account, "0/0");

    // get the cash address
    //let cashAddress = BITBOX.HDNode.toCashAddress(change);
    let cashAddress = walletInfo.cashAddress;

    // Create the managed token.
    let managed = await wormhole.PayloadCreation.managed(
      1, // Ecosystem, must be 1.
      1, // Precision, number of decimal places. Must be 0-8.
      0, // Predecessor token. 0 for new tokens.
      "Companies", // Category.
      "Bitcoin Cash Mining", // Subcategory
      "QMC", // Name/Ticker
      "www.qmc.cash", // URL
      "Made with BITBOX" // Description.
    );

    // Get a utxo to use for this transaction.
    let u = await BITBOX.Address.utxo([cashAddress]);
    let utxo = findBiggestUtxo(u[0]);

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount;
    let rawTx = await wormhole.RawTransactions.create([utxo], {});

    // Add the token information as an op-return code to the tx.
    let opReturn = await wormhole.RawTransactions.opReturn(rawTx, managed);

    // Set the destination/recieving address, with the actual amount of BCH set to a minimal amount.
    let ref = await wormhole.RawTransactions.reference(opReturn, cashAddress);

    // Generate a change output.
    let changeHex = await wormhole.RawTransactions.change(
      ref, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.0006 // Miner fee.
    );

    let tx = BITBOX.Transaction.fromHex(changeHex);
    let tb = BITBOX.Transaction.fromTransaction(tx);

    // Finalize and sign transaction.
    let keyPair = BITBOX.HDNode.toKeyPair(change);
    let redeemScript;
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
    let builtTx = tb.build();
    let txHex = builtTx.toHex();
    console.log(txHex);

    // Write out the basic information into a json file for other apps to use.
    const tokenInfo = { tokenTx: txHex };
    fs.writeFile("token-tx.json", JSON.stringify(tokenInfo, null, 2), function(
      err
    ) {
      if (err) return console.error(err);
      console.log(`token-tx.json written successfully.`);
    });
  } catch (err) {
    console.log(err);
  }
}
createManagedToken();

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0;
  let largestIndex = 0;

  for (var i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i];

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis;
      largestIndex = i;
    }
  }

  return utxos[largestIndex];
}
