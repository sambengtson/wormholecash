/*
  This is an end-to-end test which verified the happy-path of creating and
  sending a fixed token.

  This program expects two wallets. Wallet 1 must have at least 1WHC and 10,0000
  satoshis. Wallet 2 is the recieving wallet. These are wallet.json files generated
  by the create-wallet example app.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// The main test function.
async function fixedTokenTest() {
  try {
    // Open wallet 1.
    const wallet1 = openWallet(`wallet1.json`)
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
function openWallet(filename) {}
