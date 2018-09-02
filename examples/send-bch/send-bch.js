/*
  Create an HDNode wallet using Bitbox. The mnemonic from this wallet
  will be used in future examples.
*/

"use strict";

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" });

const fs = require("fs");

let lang = "english";
let outStr = "";
let outObj = {};

// create 256 bit BIP39 mnemonic
let mnemonic = BITBOX.Mnemonic.generate(256, BITBOX.Mnemonic.wordLists()[lang]);
console.log("BIP44 $BCH Wallet");
outStr += "BIP44 $BCH Wallet\n";
console.log(`256 bit ${lang} BIP39 Mnemonic: `, mnemonic);
outStr += `\n256 bit ${lang} BIP32 Mnemonic:\n${mnemonic}\n\n`;
outObj.mnemonic = mnemonic;

// root seed buffer
let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

// master HDNode
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, "testnet");

// HDNode of BIP44 account
let account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");
console.log(`BIP44 Account: "m/44'/145'/0'"`);
outStr += `BIP44 Account: "m/44'/145'/0'"\n`;

for (let i = 0; i < 10; i++) {
  let childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`);
  console.log(
    `m/44'/145'/0'/0/${i}: ${BITBOX.HDNode.toCashAddress(childNode)}`
  );
  outStr += `m/44'/145'/0'/0/${i}: ${BITBOX.HDNode.toCashAddress(childNode)}\n`;

  if (i === 0) {
    outObj.cashAddress = BITBOX.HDNode.toCashAddress(childNode);
  }
}

// derive the first external change address HDNode which is going to spend utxo
let change = BITBOX.HDNode.derivePath(account, "0/0");

// get the cash address
let cashAddress = BITBOX.HDNode.toCashAddress(change);

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
