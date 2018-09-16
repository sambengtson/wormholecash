/*
  Create an HDNode wallet using Bitbox. The mnemonic from this wallet
  will be used in future examples.
*/

"use strict";

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" });
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
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  );
  process.exit(0);
}

async function getBalance() {
  try {
    // first get BCH balance
    let balance = await BITBOX.Address.details([walletInfo.cashAddress]);

    // get token balances
    balance[0].tokens = await Wormhole.DataRetrieval.balancesForAddress(
      walletInfo.cashAddress
    );
    console.log(balance);
  } catch (err) {
    console.error(`Error in getBalance: `, err);
    throw err;
  }
}
getBalance();
