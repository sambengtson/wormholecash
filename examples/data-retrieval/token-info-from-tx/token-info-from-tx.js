/*
  Get token information from a TXID
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// The TXID to check.
const TXID = "36200e48c894043ccbe343d8dee7b417b149189a46b0c7a622f6a2ccd4054d69"

const WH = require("wormholecash/lib/Wormhole").default

// Instantiate Wormhole based on the network.
if (NETWORK === `mainnet`)
  var Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
else var Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

// Get Token info from the TX.
async function getTxInfo() {
  const retVal = await Wormhole.DataRetrieval.transaction(TXID)

  console.log(`Info from TXID ${TXID}: ${JSON.stringify(retVal, null, 2)}`)
}
getTxInfo()
