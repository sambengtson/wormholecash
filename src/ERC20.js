import axios from 'axios';
let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

class ERC20 {
  constructor(restURL, dataRetrieval, payloadCreation, rawTransactions) {
    this.restURL = restURL;
    this.DataRetrieval = dataRetrieval;
    this.PayloadCreation = payloadCreation;
    this.RawTransactions = rawTransactions;
  }

  config(token, wallet = {}) {
    this.token = token;
    this.wallet = wallet;
  }

  async totalSupply() {
    // Get the total token supply
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/property/${this.token.propertyid}`)
      return response.data.totaltokens;
    } catch (error) {
      throw error.response.data;
    }
  }

  async balanceOf(owner) {
    // Get the account balance of another account with address `owner`
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/balancesForAddress/${owner}`)
      let token;
      let tokens = response.data;
      tokens.forEach((tk, ind) => {
        if(tk.propertyid === this.token.propertyid) {
          token = tk;
        }
      });
      return token.balance;
    } catch (error) {
      throw error.response.data;
    }
  }

  async transfer(to, value, cb) {
    // Send `value` amount of tokens to address `to`
    try {
      let mnemonic = this.wallet.mnemonic;

      // root seed buffer
      let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

      // master HDNode
      // let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, BITBOX.Address.detectAddressNetwork(to));
      let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, (BITBOX.Address.detectAddressNetwork(to) === 'mainnet' ? 'bitcoincash' : 'testnet'));

      // HDNode of BIP44 account
      let account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

      let change = BITBOX.HDNode.derivePath(account, "0/0");

      // get the cash address
      let cashAddress = BITBOX.HDNode.toCashAddress(change);

      // Create simple send payload.
      const payload = await this.PayloadCreation.simpleSend(this.token.propertyid, value);

      // Get a utxo to use for this transaction.
      let u = await BITBOX.Address.utxo([cashAddress]);
      let utxo = findBiggestUtxo(u[0]);

      // Create a rawTx using the largest utxo in the wallet.
      utxo.value = utxo.amount;
      let rawTx = await this.RawTransactions.create([utxo], {});

      // Add the token information as an op-return code to the tx.
      let opReturn = await this.RawTransactions.opReturn(rawTx, payload);

      // Set the destination/recieving address for the tokens, with the actual
      // amount of BCH set to a minimal amount.
      let ref = await this.RawTransactions.reference(opReturn, to);

      // Generate a change output.
      let changeHex = await this.RawTransactions.change(
        ref, // Raw transaction we're working with.
        [utxo], // Previous utxo
        cashAddress, // Destination address.
        0.00001 // Miner fee.
      );

      let tx = BITBOX.Transaction.fromHex(changeHex);
      let tb = BITBOX.Transaction.fromTransaction(tx);

      // Finalize and sign transaction.
      let keyPair = BITBOX.HDNode.toKeyPair(change);
      let redeemScript;
      tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
      let builtTx = tb.build();
      let txHex = builtTx.toHex();

      // sendRawTransaction to running BCH node
      const broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex);
      console.log(`Transaction ID: ${broadcast}`);
      cb(cashAddress, to, value);
      return true;
    } catch (error) {
      throw false;
    }
  }

  async transferFrom(from, to, value) {
    // Send `value` amount of tokens from address `from` to address `to`
    try {
      // get the cash address
      let cashAddress = BITBOX.HDNode.toCashAddress(from);

      // Create simple send payload.
      const payload = await this.PayloadCreation.simpleSend(this.token.propertyid, value);

      // Get a utxo to use for this transaction.
      let u = await BITBOX.Address.utxo([cashAddress]);
      let utxo = findBiggestUtxo(u[0]);

      // Create a rawTx using the largest utxo in the wallet.
      utxo.value = utxo.amount;
      let rawTx = await this.RawTransactions.create([utxo], {});

      // Add the token information as an op-return code to the tx.
      let opReturn = await this.RawTransactions.opReturn(rawTx, payload);

      // Set the destination/recieving address for the tokens, with the actual
      // amount of BCH set to a minimal amount.
      let ref = await this.RawTransactions.reference(opReturn, to);

      // Generate a change output.
      let changeHex = await this.RawTransactions.change(
        ref, // Raw transaction we're working with.
        [utxo], // Previous utxo
        cashAddress, // Destination address.
        0.00001 // Miner fee.
      );

      let tx = BITBOX.Transaction.fromHex(changeHex);
      let tb = BITBOX.Transaction.fromTransaction(tx);

      // Finalize and sign transaction.
      let keyPair = BITBOX.HDNode.toKeyPair(from);
      let redeemScript;
      tb.sign(0, keyPair, redeemScript, 0x01, utxo.satoshis);
      let builtTx = tb.build();
      let txHex = builtTx.toHex();

      // sendRawTransaction to running BCH node
      const broadcast = await BITBOX.RawTransactions.sendRawTransaction(txHex);
      console.log(`Transaction ID: ${broadcast}`);
      cb(cashAddress, to, value);
      return true;
    } catch (error) {
      throw false;
    }
  }

  async approve(spender, value, cb) {
    // Allow `spender` to withdraw from your account, multiple times, up to the `value` amount. If this function is called again it overwrites the current allowance with `value`
    // NOOP
  }

  async allowance(owner, spender) {
    // Returns the amount which `spender` is still allowed to withdraw from `owner`
    // NOOP
  }

// Transfer(address indexed _from, address indexed _to, uint256 _value). [Triggered when tokens are transferred.]
// Approval(address indexed _owner, address indexed _spender, uint256 _value)[Triggered whenever approve(address _spender, uint256 _value) is called.]

}

export default ERC20;

// SUPPORT/PRIVATE FUNCTIONS BELOW

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0;
  let largestIndex = 0;

  for (let i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i];

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis;
      largestIndex = i;
    }
  }

  return utxos[largestIndex];
}