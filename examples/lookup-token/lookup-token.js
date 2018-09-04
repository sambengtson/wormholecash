/*
  Get the token information based on the primaryid value assigned to it.
*/

"use strict";

// Instantiate wormholecash
let Wormhole = require("wormholecash/lib/Wormhole").default;
let wormhole = new Wormhole({ restURL: `http://localhost:3000/v1/` });
//let wormhole = new Wormhole({ restURL: `https://trest.bitcoin.com/v1/` });

const propertyId = 195;

async function getTokenInfo() {
  const retVal = await wormhole.DataRetrieval.property(propertyId);

  console.log(
    `Info from token with propertyId of ${propertyId}: ${JSON.stringify(
      retVal,
      null,
      2
    )}`
  );
}
getTokenInfo();
