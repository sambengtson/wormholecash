/*
  Close crowdsale
*/

"use strict";

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default;
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
});

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" });

const fs = require("fs");

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

// Create a fixed token.
async function createCrowdSale() {
  try {
    let mnemonic = walletInfo.mnemonic;
    console.log(mnemonic)

    // root seed buffer
    let rootSeed = Wormhole.Mnemonic.toSeed(mnemonic);

    // master HDNode
    let masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet");

    // HDNode of BIP44 account
    let account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

    let change = Wormhole.HDNode.derivePath(account, "0/0");

    // get the cash address
    let cashAddress = BITBOX.HDNode.toCashAddress(change);
    console.log(cashAddress)
    // let cashAddress = walletInfo.cashAddress;

    // close the crowdsale.
    let closeCrowdSale = await Wormhole.PayloadCreation.closeCrowdSale(220);

    // Get a utxo to use for this transaction.
    let u = await BITBOX.Address.utxo([cashAddress]);
    let utxo = findBiggestUtxo(u[0]);

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount;
    let rawTx = await Wormhole.RawTransactions.create([utxo], {});

    // Add the token information as an op-return code to the tx.
    let opReturn = await Wormhole.RawTransactions.opReturn(rawTx, closeCrowdSale);

    // Generate a change output.
    let changeHex = await Wormhole.RawTransactions.change(
      opReturn, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.00001 // Miner fee.
    );

    let tx = Wormhole.Transaction.fromHex(changeHex);
    const tb = Wormhole.Transaction.fromTransaction(tx);

    // Finalize and sign transaction.
    let keyPair = Wormhole.HDNode.toKeyPair(change);
    let redeemScript;
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
    let builtTx = tb.build();
    let txHex = builtTx.toHex();
    //console.log(txHex);

    // sendRawTransaction to running BCH node
    const broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex);
    console.log(`Transaction ID: ${broadcast}`);
  } catch (err) {
    console.log(err);
  }
}
createCrowdSale();

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0;
  let largestIndex = 0;

  for (let i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i];

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis;
      largestIndex = i;
    }
  }

  return utxos[largestIndex];
}
