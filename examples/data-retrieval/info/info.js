/*
  Information about granted and revoked units of managed tokens.
*/

const WH = require("wormholecash/lib/Wormhole").default
const Wormhole = new WH({ restURL: `/v1/` })

async function info() {
  try {
    const info = await Wormhole.DataRetrieval.info()

    console.log(JSON.stringify(info, null, 2))
  } catch (error) {
    console.log(error)
  }
}
info()
