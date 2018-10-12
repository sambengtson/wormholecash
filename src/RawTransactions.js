import axios from "axios"
class RawTransactions {
  constructor(restURL, rawTransactions) {
    this.restURL = restURL
    this.decodeRawTransaction = rawTransactions.decodeRawTransaction
    this.decodeScript = rawTransactions.decodeScript
    this.getRawTransaction = rawTransactions.getRawTransaction
    this.sendRawTransaction = rawTransactions.sendRawTransaction
  }

  async change(rawtx, prevTxs, destination, fee, position = undefined) {
    let path
    if (position) {
      path = `${this.restURL}rawTransactions/change?position=${position}`
    } else {
      path = `${this.restURL}rawTransactions/change`
    }
    try {
      const response = await axios.post(path, {rawtx: rawtx, prevTxs: prevTxs, destination: destination, fee: fee})
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async input(rawtx, txid, n) {
    try {
      const response = await axios.post(
        `${this.restURL}rawTransactions/input/${rawtx}/${txid}/${n}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async opReturn(rawtx, payload) {
    try {
      const response = await axios.post(
        `${this.restURL}rawTransactions/opReturn`, {rawtx: rawtx, payload: payload}
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async reference(rawtx, destination, amount) {
    let path
    if (amount) {
      path = `${
        this.restURL
      }rawTransactions/reference?amount=${amount}`
    } else {
      path = `${this.restURL}rawTransactions/reference`
    }
    try {
      const response = await axios.post(path, {rawtx: rawtx, destination: destination})
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async decodeTransaction(rawtx, prevTxs = undefined, height = undefined) {
    let path
    if (prevTxs) {
      path = `${
        this.restURL
      }rawTransactions/decodeTransaction/${rawtx}?prevTxs=${JSON.stringify(
        prevTxs
      )}`
    } else if (prevTxs && height) {
      path = `${
        this.restURL
      }rawTransactions/decodeTransaction/${rawtx}?prevTxs=${JSON.stringify(
        prevTxs
      )}&height=${height}`
    } else if (height) {
      path = `${
        this.restURL
      }rawTransactions/decodeTransaction/${rawtx}?height=${height}`
    } else {
      path = `${this.restURL}rawTransactions/decodeTransaction/${rawtx}`
    }
    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async create(inputs, outputs = {}) {
    try {
      const response = await axios.post(
        `${this.restURL}rawTransactions/create/`, {inputs: inputs, outputs: outputs}
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default RawTransactions
