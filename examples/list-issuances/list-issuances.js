/*
  Get the token information based on the primaryid value assigned to it.
*/

"use strict"

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
})

const propertyId = 216

async function getGrants() {
  try {
    const grants = await Wormhole.DataRetrieval.grants(propertyId)
    console.log(grants)
  } catch (err) {
    console.error(`Error in getGrants: `, err)
    throw err
  }
}
getGrants()
