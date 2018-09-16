/*
  Ping the Wormhole node to make sure all the networking involved
  is functioning correctly.
*/

"use strict";

const WH = require("wormholecash/lib/Wormhole").default;
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
});

async function pingNode() {
  try {
    const result = await Wormhole.DataRetrieval.info();
    console.log(`Ping succeeded: `);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
pingNode();
