/*
  Burn 1 BCH to generate 100 WHC used for creating new tokens.
*/

"use strict";

const fs = require("fs");

let Wormhole = require("wormholecash/lib/Wormhole").default;
let wormhole = new Wormhole({ restURL: `http://localhost:3000/v1/` });
//let wormhole = new Wormhole({ restURL: `https://trest.bitcoin.com/v1/` });

const util = require("util");
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true
};
console.log(`wormhole.Transaction: ${util.inspect(wormhole.Transaction)}`);

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
    /*
    const result = await wormhole.Transaction.burnBCHGetWHC(
      1,
      walletInfo.cashAddress
    );

    fs.writeFile("bch-burn-txid.txt", result, function(err) {
      if (err) {
        return console.error(err);
      }

      console.log(
        `BCH TXID ${result} successfully written to bch-burn-txid.txt.`
      );
    });
    */

    let burnBCH = await wormhole.PayloadCreation.burnBCH();
    console.log(burnBCH);
  } catch (err) {
    console.error(err);
  }
}
//burnBch();
