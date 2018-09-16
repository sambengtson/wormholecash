/*
  Create an HDNode wallet using Wormhole. The mnemonic from this wallet
  will be used in future examples.
*/

"use strict";

const WH = require("wormholecash/lib/Wormhole").default;
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
});

const fs = require("fs");

let lang = "english";
let outStr = "";
let outObj = {};

// create 256 bit BIP39 mnemonic
let mnemonic = Wormhole.Mnemonic.generate(
  256,
  Wormhole.Mnemonic.wordLists()[lang]
);
console.log("BIP44 $BCH Wallet");
outStr += "BIP44 $BCH Wallet\n";
console.log(`256 bit ${lang} BIP39 Mnemonic: `, mnemonic);
outStr += `\n256 bit ${lang} BIP32 Mnemonic:\n${mnemonic}\n\n`;
outObj.mnemonic = mnemonic;

// root seed buffer
let rootSeed = Wormhole.Mnemonic.toSeed(mnemonic);

// master HDNode
let masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet");

// HDNode of BIP44 account
let account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");
console.log(`BIP44 Account: "m/44'/145'/0'"`);
outStr += `BIP44 Account: "m/44'/145'/0'"\n`;

for (let i = 0; i < 10; i++) {
  let childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);
  console.log(
    `m/44'/145'/0'/0/${i}: ${Wormhole.HDNode.toCashAddress(childNode)}`
  );
  outStr += `m/44'/145'/0'/0/${i}: ${Wormhole.HDNode.toCashAddress(
    childNode
  )}\n`;

  if (i === 0) {
    outObj.cashAddress = Wormhole.HDNode.toCashAddress(childNode);
    outObj.legacyAddress = Wormhole.HDNode.toLegacyAddress(childNode);
  }
}

// derive the first external change address HDNode which is going to spend utxo
let change = Wormhole.HDNode.derivePath(account, "0/0");

// get the cash address
let cashAddress = Wormhole.HDNode.toCashAddress(change);

// Get the legacy address.

outStr += `\n\n\n`;
fs.writeFile("wallet-info.txt", outStr, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log(`wallet-info.txt written successfully.`);
});

// Write out the basic information into a json file for other apps to use.
fs.writeFile("wallet.json", JSON.stringify(outObj, null, 2), function(err) {
  if (err) return console.error(err);
  console.log(`wallet.json written successfully.`);
});
