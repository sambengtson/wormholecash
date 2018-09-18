/*
  Burn 1 BCH to generate 100 WHC used for creating new tokens.
*/

"use strict";

const fs = require("fs");

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" });
const WH = require("wormholecash/lib/Wormhole").default;
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
});

const util = require("util");
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true
};
console.log(`wormhole.Transaction: ${util.inspect(Wormhole.Transaction)}`);

// Open the wallet generated with create-wallet.
let walletInfo;
try {
  walletInfo = require(`../create-wallet/wallet.json`);
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  );
  process.exit(0);
}

// Verify the address has at least 1 BCH.

async function burnBch() {
  try {
    const mnemonic = walletInfo.mnemonic;

    // root seed buffer
    const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic);

    // master HDNode
    const masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet");

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

    const change = Wormhole.HDNode.derivePath(account, "0/0");

    // get the cash address
    //let cashAddress = BITBOX.HDNode.toCashAddress(change);
    const cashAddress = walletInfo.cashAddress;

    let burnBCH = await Wormhole.PayloadCreation.burnBCH();

    // Get a utxo to use for this transaction.
    const u = await BITBOX.Address.utxo([cashAddress]);
    const utxo = findBiggestUtxo(u[0]);

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount;
    const rawTx = await Wormhole.RawTransactions.create([utxo], {});

    // Add the token information as an op-return code to the tx.
    const opReturn = await Wormhole.RawTransactions.opReturn(rawTx, burnBCH);

    // Set the destination/recieving address for the tokens, with the actual
    // amount of BCH set to a minimal amount.
    const ref = await Wormhole.RawTransactions.reference(opReturn, cashAddress);

    // Generate a change output.
    const changeHex = await Wormhole.RawTransactions.change(
      ref, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.00001 // Miner fee.
    );

    const tx = Wormhole.Transaction.fromHex(changeHex);
    const tb = Wormhole.Transaction.fromTransaction(tx);

    // Finalize and sign transaction.
    const keyPair = Wormhole.HDNode.toKeyPair(change);
    let redeemScript;
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
    const builtTx = tb.build();
    const txHex = builtTx.toHex();
    console.log(txHex);

    // sendRawTransaction to running BCH node
    // const broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex);

    console.log(
      `You can monitor the below transaction ID on a block explorer.`
    );
    console.log(`Transaction ID: ${broadcast}`);
  } catch (err) {
    console.error(err);
  }
}
burnBch();

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
