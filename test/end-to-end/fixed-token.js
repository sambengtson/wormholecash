/*
  This is an end-to-end test which verified the happy-path of creating and
  sending a fixed token.

  This program expects two wallets. Wallet 1 must have at least 1WHC and 10,0000
  satoshis. Wallet 2 is the recieving wallet. These are wallet.json files generated
  by the create-wallet example app.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const WH = require("wormholecash/lib/Wormhole").default

// Instantiate Wormhole based on the network.
if (NETWORK === `mainnet`)
  var Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
//else var Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })
else var Wormhole = new WH({ restURL: `https://trest.christroutner.com/v1/` })

// The main test function.
async function fixedTokenTest() {
  try {
    // Open wallet 1.
    const wallet1 = await openWallet(`./wallet1.json`)
    console.log(`wallet1: ${JSON.stringify(wallet1, null, 2)}`)

    // Verify wallet has 1 WHC
    // Verify wallet has at least 10000 satoshis
    // Create token
    // Wait for 1-conf
    // Send tokens to wallet 2.
    // Wait for 1-conf
    // Verify wallet 2 has tokens.
  } catch (err) {
    console.log(`Error in fixedTokenTest: `, err)
  }
}
fixedTokenTest()

// Open a wallet and return an object with its address, BCH balance, and WHC
// token balance.
async function openWallet(filename) {
  try {
    walletInfo = require(filename)

    const walletBalance = await getBalance(walletInfo)

    return walletBalance
  } catch (err) {
    console.log(
      `Could not open ${filename}. Generate a wallet with create-wallet first.`
    )
    process.exit(0)
  }
}

// Get the balance for an opened wallet.
async function getBalance(walletInfo) {
  try {
    // first get BCH balance
    const balance = await Wormhole.Address.details([walletInfo.cashAddress])

    walletInfo.bchBalance = balance

    // get token balances
    try {
      const tokens = await Wormhole.DataRetrieval.balancesForAddress(
        walletInfo.cashAddress
      )

      walletInfo.tokenBalance = tokens

      return walletInfo
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  } catch (err) {
    console.error(`Error in getBalance()`)
    throw err
  }
}
