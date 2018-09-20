/*
  Get the token information based on the primaryid value assigned to it.
*/

"use strict"

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
})

const propertyId = 195

async function getTokenInfo() {
  try {
    const retVal = await Wormhole.DataRetrieval.property(propertyId)

    console.log(
      `Info from token with propertyId of ${propertyId}: ${JSON.stringify(
        retVal,
        null,
        2
      )}`
    )
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err)
    throw err
  }
}
getTokenInfo()
