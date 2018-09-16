/*
  Get the token balance for the wallet generated with create-wallet.
  Note: WHC tokens have a propertyid of 1.
*/

"use strict";

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default;
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
});

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
    const result = await Wormhole.DataRetrieval.balancesForAddress(
      walletInfo.cashAddress
    );
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(err);
  }
}
tokenBalance();
