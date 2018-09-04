/*
  Issue new tokens for a manged token.
*/

"use strict";

// Instantiate wormholecash
//let Wormhole = require("wormholecash/lib/Wormhole").default;
let Wormhole = require("../../src/node/Wormhole");
let wormhole = new Wormhole({ restURL: `http://localhost:3000/v1/` });
//let wormhole = new Wormhole({ restURL: `https://trest.bitcoin.com/v1/` });

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" });

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

// Change this value to match your token.
const propertyId = 195;

// Issue new tokens.
async function issueNewTokens() {
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

    // grant 10 new tokens.
    let grant = await wormhole.PayloadCreation.grant(propertyId, "10");

    // Get a utxo to use for this transaction.
    let u = await BITBOX.Address.utxo([cashAddress]);
    let utxo = findBiggestUtxo(u[0]);

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount;
    let rawTx = await wormhole.RawTransactions.create([utxo], {});

    // Add the token information as an op-return code to the tx.
    let opReturn = await wormhole.RawTransactions.opReturn(rawTx, grant);

    // Set the destination/recieving address, with the actual amount of BCH set
    // to a minimal amount.
    // This sends the token to the same address as the issue. Change this to the
    // an address you want to send tokens to.
    let ref = await wormhole.RawTransactions.reference(opReturn, cashAddress);

    // Generate a change output.
    let changeHex = await wormhole.RawTransactions.change(
      ref, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.00001 // Miner fee.
    );

    let tx = BITBOX.Transaction.fromHex(changeHex);
    let tb = BITBOX.Transaction.fromTransaction(tx);

    // Finalize and sign transaction.
    let keyPair = BITBOX.HDNode.toKeyPair(change);
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
issueNewTokens();

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
