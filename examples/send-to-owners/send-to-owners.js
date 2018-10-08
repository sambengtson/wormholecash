/*
  Transfers coins in the specified currency from the sending address to the
  current owners of that currency.
  This is 'airdropping' more of an token to exsiting token holders
*/

// Instantiate wormholecash
//let Wormhole = require("wormholecash/lib/Wormhole").default;
const WH = require("wormholecash/lib/Wormhole").default
const Wormhole = new WH({
  restURL: `https://wormholecash-staging.herokuapp.com/v1/`
})

const BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default
const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.
    Exiting.`
  )
  process.exit(0)
}

// Change these values to match your token.
const propertyId = 248 // WH ID identifying the token.
const TOKEN_QTY = 1 // Number of tokens to send.

// Issue new tokens.
async function sendTokens() {
  try {
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

    // master HDNode
    const masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet")

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = Wormhole.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = BITBOX.HDNode.toCashAddress(change)
    // const cashAddress = walletInfo.cashAddress;

    // Create send to owners payload.
    const STO = await Wormhole.PayloadCreation.STO(propertyId, TOKEN_QTY)

    // Get a utxo to use for this transaction.
    const u = await BITBOX.Address.utxo([cashAddress])
    const utxo = findBiggestUtxo(u[0])
    // const utxo = u[0][1]

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount
    const rawTx = await Wormhole.RawTransactions.create([utxo], {})

    // Add the token information as an op-return code to the tx.
    const opReturn = await Wormhole.RawTransactions.opReturn(rawTx, STO)

    // Generate a change output.
    const changeHex = await Wormhole.RawTransactions.change(
      opReturn, // Raw transaction we're working with.
      [utxo], // Previous utxo
      cashAddress, // Destination address.
      0.00001 // Miner fee.
    )

    const tx = Wormhole.Transaction.fromHex(changeHex)
    const tb = Wormhole.Transaction.fromTransaction(tx)

    // Finalize and sign transaction.
    const keyPair = Wormhole.HDNode.toKeyPair(change)
    let redeemScript
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis)
    const builtTx = tb.build()
    const txHex = builtTx.toHex()

    // sendRawTransaction to running BCH node
    const broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex)

    console.log(`You can monitor the below transaction ID on a block explorer.`)
    console.log(`Transaction ID: ${broadcast}`)
  } catch (err) {
    console.log(err)
  }
}
sendTokens()

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0
  let largestIndex = 0

  for (let i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i]

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis
      largestIndex = i
    }
  }

  return utxos[largestIndex]
}
