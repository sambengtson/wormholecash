/*
  Get the token balance for the wallet generated with create-wallet.
  Note: WHC tokens have a propertyid of 1.
*/

"use strict";

// Instantiate wormholecash
let Wormhole = require("wormholecash/lib/Wormhole").default;
let wormhole = new Wormhole({ restURL: `http://localhost:3000/v1/` });
//let wormhole = new Wormhole({ restURL: `https://trest.bitcoin.com/v1/` });

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

// Retrieve the token balance.
async function tokenBalance() {
  try {
    const result = await wormhole.DataRetrieval.balancesForAddress(
      walletInfo.cashAddress
    );
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(err);
  }
}
tokenBalance();
