/*
  Burn 1 BCH to generate 100 WHC used for creating new tokens.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const WH = require("../../lib/Wormhole").default

// Instantiate Wormhole based on the network.
if (NETWORK === `mainnet`)
  var Wormhole = new WH({ restURL: `https://rest.bitcoin.com/v1/` })
else var Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function burnBch() {
  try {
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

    // master HDNode
    if (NETWORK === `mainnet`)
      var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed)
    else var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet") // Testnet

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    // Generate the first change address.
    const change = Wormhole.HDNode.derivePath(account, "0/0")

    // get the cash address from the change address.
    const cashAddress = Wormhole.HDNode.toCashAddress(change)

    // Exit if the user does not have 1.0 BCH to burn.
    const bchBalance = await getBCHBalance(cashAddress, false)
    console.log(`bchBalance: ${bchBalance}`)
    if (bchBalance < 1.0) {
      console.log(
        `Wallet has a balance of ${bchBalance} which is less than the 1 BCH requirement to burn. Exiting.`
      )
      process.exit(0)
    }

    // Get a utxo to use for this transaction.
    const u = await Wormhole.Address.utxo([cashAddress])
    const utxo = findBiggestUtxo(u[0])

    // Instatiate the transaction builder
    if (NETWORK === `mainnet`)
      var transactionBuilder = new Wormhole.TransactionBuilder()
    else var transactionBuilder = new Wormhole.TransactionBuilder("testnet")

    // Create the input part of the transaction.
    const vout = utxo.vout
    const txid = utxo.txid
    transactionBuilder.addInput(txid, vout)

    // Constant values to be used in creating the output of the TX.
    const satoshiBalance = utxo.satoshis
    const satoshisToBurn = 100000000
    const minerFee = 1000 // This could be more refined than a hard value.
    const burnAddr = "bchtest:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqdmwgvnjkt8whc"

    // Remainder amount to send back to the sending address.
    const remainder = satoshiBalance - satoshisToBurn - minerFee
    console.log(
      `remainder: ${remainder} satoshis - will be sent back to orginating address.`
    )

    // add outputs w/ address and amount to send
    transactionBuilder.addOutput(burnAddr, satoshisToBurn)
    transactionBuilder.addOutput(cashAddress, remainder)

    // Generate a keypair from the change address.
    const keyPair = Wormhole.HDNode.toKeyPair(change)

    // Sign the transaction with the HD node.
    let redeemScript
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      satoshiBalance
    )

    // build tx
    const tx = transactionBuilder.build()
    const hex = tx.toHex()

    // Get the burnBCH OP_RETURN payload.
    const payload = await Wormhole.PayloadCreation.burnBCH()

    // Modify the raw TX hex to add the WH OP_RETURN.
    const opReturn3 = await Wormhole.RawTransactions.opReturn(hex, payload)

    console.log(`
You can review the output script for errors by replacing <tx-hex> with the TX
hex at this URL:
https://trest.bitcoin.com/v1/rawtransactions/decodeRawTransaction/<tx-hex>

      `)
    console.log(`TX Hex: ${opReturn3}`)

    // COMMENT OUT THESE LINES TO ACTUALLY BURN A TOKEN
    //const broadcast = await Wormhole.RawTransactions.sendRawTransaction(hex)
    //console.log(`You can monitor the below transaction ID on a block explorer.`)
    //console.log(`Transaction ID: ${broadcast}`)
  } catch (err) {
    console.error(err)
  }
}
burnBch()

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0
  let largestIndex = 0

  for (var i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i]

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis
      largestIndex = i
    }
  }

  return utxos[largestIndex]
}

// Get the balance in BCH of a BCH address.
async function getBCHBalance(addr, verbose) {
  try {
    const result = await Wormhole.Address.details([addr])

    if (verbose) console.log(result)

    const bchBalance = result[0]

    return bchBalance.balance
  } catch (err) {
    console.error(`Error in getBCHBalance: `, err)
    console.log(`addr: ${addr}`)
    throw err
  }
}
