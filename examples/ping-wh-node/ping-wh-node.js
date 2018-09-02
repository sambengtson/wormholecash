/*
  Ping the Wormhole node to make sure all the networking involved
  is functioning correctly.
*/

"use strict";

let Wormhole = require("wormholecash/lib/Wormhole").default;
let wormhole = new Wormhole({ restURL: `http://localhost:3000/v1/` });
//let wormhole = new Wormhole({ restURL: `https://trest.bitcoin.com/v1/` });

async function pingNode() {
  try {
    const result = await wormhole.DataRetrieval.info();
    console.log(`Ping succeeded: `);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
pingNode();
