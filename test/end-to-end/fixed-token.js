/*
  This is an end-to-end test which verified the happy-path of creating and
  sending a fixed token.

  This program expects two wallets. Wallet 1 must have at least 1WHC and 10,0000
  satoshis. Wallet 2 is the recieving wallet. These are wallet.json files generated
  by the create-wallet example app.
*/

const WALLET1 = `./wallet1.json`
const WALLET2 = `./wallet2.json`

const lib = require("./util.js") // Support library.

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

// The main test function.
async function fixedTokenTest() {
  try {
    // Open wallet 1.
    const wallet1 = await lib.openWallet(WALLET1)
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
    //const txid = await lib.createFixedToken()
    const txid = `3b2e9747767cf3d0070ceaffbd60ae40f1cd46f04c8dac3617659073f324f19d`
    console.log(`txid: ${txid}`)

    // Wait for 1-conf
    await lib.waitFor1Conf(txid)
    console.log(`1 confirmation detected.`)

    // Send tokens to wallet 2.
    // Wait for 1-conf
    // Verify wallet 2 has tokens.
  } catch (err) {
    console.log(`Error in fixedTokenTest: `, err)
  }
}
fixedTokenTest()
