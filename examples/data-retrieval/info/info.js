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

balances-hash
block-transactions
check-balances-for-id
check-single-balance
check-total-balance
current-consensus-hash
fixed-token-info-from-tx
grants
info
list-all-tokens
lookup-token
payload
pending-transactions
seed-blocks
sto
