/*
  Burn 1 BCH to generate 100 WHC used for creating new tokens.
*/

// Used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true
}

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
    // Exit if the user does not have 1.0 BCH to burn.
    const bchBalance = await getBCHBalance(walletInfo.cashAddress, false)
    if (bchBalance < 1.0) {
      console.log(
        `Wallet has a balance of ${bchBalance} which is less than the 1 BCH requirement to burn. Exiting.`
      )
      process.exit(0)
    }

    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

    // master HDNode
    if (NETWORK === `mainnet`)
      var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed)
    else var masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet") // Testnet

    // HDNode of BIP44 account
    const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/1'")

    const change = Wormhole.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = Wormhole.HDNode.toCashAddress(change)

    // Exit if the user does not have 1.0 BCH to burn.
    const bchBalance = await getBCHBalance(cashAddress, false)
    if (bchBalance < 1.0) {
      console.log(
        `Wallet has a balance of ${bchBalance} which is less than the 1 BCH requirement to burn. Exiting.`
      )
      process.exit(0)
    }

    const burnBCH = await Wormhole.PayloadCreation.burnBCH()

    // Get a utxo to use for this transaction.
    const u = await Wormhole.Address.utxo([cashAddress])
    const utxo = findBiggestUtxo(u[0])

    // Create a rawTx using the largest utxo in the wallet.
    utxo.value = utxo.amount
    const rawTx = await Wormhole.RawTransactions.create([utxo], {})

    // Add the token information as an op-return code to the tx.
    const opReturn = await Wormhole.RawTransactions.opReturn(rawTx, burnBCH)

    // Set the destination/recieving address for the tokens, with the actual
    // amount of BCH set to a minimal amount.
    const burnAddr = "bchtest:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqdmwgvnjkt8whc"
    //const ref = await Wormhole.RawTransactions.reference(opReturn, cashAddress)
    const ref = await Wormhole.RawTransactions.reference(opReturn, burnAddr)

    const minerFee = 0.000005

    // Generate a change output.
    const changeHex = await Wormhole.RawTransactions.change(
      ref, // Raw transaction we're working with.
      [utxo], // Previous utxo
      burnAddr, // Destination address.
      //cashAddress,
      minerFee // Miner fee.
    )

    /*
    const tx = Wormhole.Transaction.fromHex(ref)
    tx.outs.unshift({
      value: 199990000,
      script: Buffer.from(
        "76a9140000000000000000000000000000000000376e4388ac",
        "hex"
      )
    })
    const buf = Wormhole.Script.pubKey.output.encode(
      Buffer.from("bchtest:", "hex")
    )

    console.log(tx.outs)
    const tb = Wormhole.Transaction.fromTransaction(tx)
    // let ca = "mfWxJ45yp2SFn7UciZyNpvDKu6S3TYMHMR";
    // console.log(tb);
    // tb.addOutput('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqdmwgvnjkt8whc', Wormhole.BitcoinCash.toSatoshi(1));
    */

    const tx = Wormhole.Transaction.fromHex(changeHex)
    const tb = Wormhole.Transaction.fromTransaction(tx)

    // amount to send back to the sending address. It's the original amount - 1 sat/byte for tx size
    //const remainder = bchBalance - 1.0 - minerFee
    //tb.addOutput(walletInfo.cashAddress, remainder)

    // Finalize and sign transaction.
    const keyPair = Wormhole.HDNode.toKeyPair(change)
    let redeemScript
    tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis)
    const builtTx = tb.build()
    const txHex = builtTx.toHex()
    console.log(txHex)

    // sendRawTransaction to running BCH node

    // const broadcast = await Wormhole.RawTransactions.sendRawTransaction(txHex)
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
