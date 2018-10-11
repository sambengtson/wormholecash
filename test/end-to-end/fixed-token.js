/*
  This is an end-to-end test which verified the happy-path of creating and
  sending a fixed token.

  This program expects two wallets. Wallet 1 must have at least 1WHC and 10,0000
  satoshis. Wallet 2 is the recieving wallet. These are wallet.json files generated
  by the create-wallet example app.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const WALLET1 = `./wallet1.json`
const WALLET2 = `./wallet2.json`

const WH = require("../../lib/Wormhole").default

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

// Instantiate Wormhole based on the network.
if (NETWORK === `mainnet`)
  var Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
//else var Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })
else var Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

// The main test function.
async function fixedTokenTest() {
  try {
    // Open wallet 1.
    const wallet1 = await openWallet(WALLET1)
    console.log(`wallet1: ${JSON.stringify(wallet1, null, 2)}`)

    // Verify wallet has 1 WHC
    const WHC = wallet1.tokenBalance.find(token => token.propertyid === 1)
    const WHCBalance = Number(WHC.balance)
    if (WHCBalance < 1.0) {
      console.log(
        `Wallet 1 does not have a WHC token needed to run the test.
        Exiting.`
      )
      process.exit(0)
    }

    // Verify wallet has at least 10000 satoshis
    const BCHBalance = wallet1.bchBalance
    //console.log(`BCHBalance: ${JSON.stringify(BCHBalance, null, 2)}`)
    if (BCHBalance.balanceSat < 10000) {
      console.log(`Wallet 1 contains less than 10,000 satoshis. Exiting.`)
      process.exit(0)
    }

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

    walletInfo.bchBalance = balance[0]

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
