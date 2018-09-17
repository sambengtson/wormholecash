/*
  Get the token information based on the primaryid value assigned to it.
*/

"use strict";

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default;
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
});

async function listAllTokens() {
  try {
    let properties = await Wormhole.DataRetrieval.properties();
    console.log(properties);
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err);
    throw err;
  }
}
listAllTokens();
