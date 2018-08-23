import axios from 'axios';
class RawTransactions {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async change(rawtx, prevTxs, destination, fee, position = undefined) {
    let path;
    if(position) {
      path = `${this.restURL}rawTransactions/change/${rawtx}/${JSON.stringify(prevTxs)}/${destination}/${fee}?position=${position}`;
    } else {
      path = `${this.restURL}rawTransactions/change/${rawtx}/${JSON.stringify(prevTxs)}/${destination}/${fee}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (err) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async input(rawtx, txid, n) {
    try {
      let response = await axios.post(`${this.restURL}rawTransactions/input/${rawtx}/${txid}/${n}`)
      return response.data;
    } catch (err) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async opReturn(rawtx, payload) {
    try {
      let response = await axios.post(`${this.restURL}rawTransactions/opReturn/${rawtx}/${payload}`)
      return response.data;
    } catch (err) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async reference(rawtx, destination, amount) {
    let path;
    if(amount) {
      path = `${this.restURL}rawTransactions/reference/${rawtx}/${destination}?amount=${amount}`;
    } else {
      path = `${this.restURL}rawTransactions/reference/${rawtx}/${destination}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (err) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async decodeTransaction(rawtx, prevTxs = undefined, height = undefined) {
    let path;
    if(prevTxs) {
      path = `${this.restURL}rawTransactions/decodeTransaction/${rawtx}?prevTxs=${JSON.stringify(prevTxs)}`;
    } else if(prevTxs && height) {
      path = `${this.restURL}rawTransactions/decodeTransaction/${rawtx}?prevTxs=${JSON.stringify(prevTxs)}&height=${height}`;
    } else if(height) {
      path = `${this.restURL}rawTransactions/decodeTransaction/${rawtx}?height=${height}`;
    } else {
      path = `${this.restURL}rawTransactions/decodeTransaction/${rawtx}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (err) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default RawTransactions;
