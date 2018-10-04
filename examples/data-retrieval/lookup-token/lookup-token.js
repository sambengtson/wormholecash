/*
  Get the token information based on the primaryid value assigned to it.
*/

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default
const Wormhole = new WH({
  restURL: `/v1/`
})

const propertyId = 194

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
