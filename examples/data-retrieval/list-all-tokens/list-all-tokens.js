/*
  Get the token information based on the primaryid value assigned to it.
*/

// Instantiate wormholecash
const WH = require("wormholecash/lib/Wormhole").default
const Wormhole = new WH({
  restURL: `/v1/`
})

async function listAllTokens() {
  try {
    const properties = await Wormhole.DataRetrieval.properties()
    console.log(properties)
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err)
    throw err
  }
}
listAllTokens()
