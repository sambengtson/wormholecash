/*
  Send BCH to RECV_ADDR.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Replace the address below with the address you want to send the BCH to.
const RECV_ADDR = `bchtest:qp6hgvevf4gzz6l7pgcte3gaaud9km0l459fa23dul`

// The amount of BCH to send, in satoshis. 1 satoshi = 0.00000001 BCH
const AMOUNT_TO_SEND = 1000

const WH = require("wormholecash/lib/Wormhole").default

// Instantiate Wormhole based on the network.
if (NETWORK === `mainnet`)
  var Wormhole = new WH({ restURL: `https://rest.btctest.net/v1/` })
//else var Wormhole = new WH({ restURL: `https://trest.bitcoin.com/v1/` })
else var Wormhole = new WH({ restURL: `https://trest.christroutner.com/v1/` })

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

const SEND_ADDR = walletInfo.cashAddress
const SEND_MNEMONIC = walletInfo.mnemonic

async function sendBch() {
  const balance = await getBCHBalance(SEND_ADDR, false)
  console.log(`balance: ${JSON.stringify(balance, null, 2)}`)
  console.log(`Balance of sending address ${SEND_ADDR} is ${balance} BCH.`)

  if (balance <= 0.0) {
    console.log(`Balance of sending address is zero. Exiting.`)
    process.exit(0)
  }

  const SEND_ADDR_LEGACY = Wormhole.Address.toLegacyAddress(SEND_ADDR)
  const RECV_ADDR_LEGACY = Wormhole.Address.toLegacyAddress(RECV_ADDR)
  console.log(`Sender Legacy Address: ${SEND_ADDR_LEGACY}`)
  console.log(`Receiver Legacy Address: ${RECV_ADDR_LEGACY}`)

  const balance2 = await getBCHBalance(RECV_ADDR, false)
  console.log(`Balance of recieving address ${RECV_ADDR} is ${balance2} BCH.`)

  const utxo = await Wormhole.Address.utxo(SEND_ADDR)

  // instance of transaction builder
  if (NETWORK === `mainnet`)
    var transactionBuilder = new Wormhole.TransactionBuilder()
  else var transactionBuilder = new Wormhole.TransactionBuilder("testnet")

  const satoshisToSend = AMOUNT_TO_SEND
  const originalAmount = utxo[0].satoshis
  const vout = utxo[0].vout
  const txid = utxo[0].txid

  // add input with txid and index of vout
  transactionBuilder.addInput(txid, vout)

  // get byte count to calculate fee. paying 1 sat/byte
  const byteCount = Wormhole.BitcoinCash.getByteCount(
    { P2PKH: 1 },
    { P2PKH: 2 }
  )
  console.log(`byteCount: ${byteCount}`)
  const satoshisPerByte = 1.1
  const txFee = Math.floor(satoshisPerByte * byteCount)
  console.log(`txFee: ${txFee}`)

  // amount to send back to the sending address. It's the original amount - 1 sat/byte for tx size
  const remainder = originalAmount - satoshisToSend - txFee

  // add output w/ address and amount to send
  transactionBuilder.addOutput(RECV_ADDR, satoshisToSend)
  transactionBuilder.addOutput(SEND_ADDR, remainder)

  // Generate a change address from a Mnemonic of a private key.
  const change = changeAddrFromMnemonic(SEND_MNEMONIC)

  // Generate a keypair from the change address.
  const keyPair = Wormhole.HDNode.toKeyPair(change)

  // Sign the transaction with the HD node.
  let redeemScript
  transactionBuilder.sign(
    0,
    keyPair,
    redeemScript,
    transactionBuilder.hashTypes.SIGHASH_ALL,
    originalAmount
  )

  // build tx
  const tx = transactionBuilder.build()
  // output rawhex
  const hex = tx.toHex()
  //console.log(`Transaction raw hex: `);
  //console.log(`${hex}`);

  // sendRawTransaction to running BCH node
  const broadcast = await Wormhole.RawTransactions.sendRawTransaction(hex)
  console.log(`Transaction ID: ${broadcast}`)
}
sendBch()

// Generate a change address from a Mnemonic of a private key.
function changeAddrFromMnemonic(mnemonic) {
  // root seed buffer
  const rootSeed = Wormhole.Mnemonic.toSeed(mnemonic)

  // master HDNode
  const masterHDNode = Wormhole.HDNode.fromSeed(rootSeed, "testnet")

  // HDNode of BIP44 account
  const account = Wormhole.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = Wormhole.HDNode.derivePath(account, "0/0")

  return change
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
