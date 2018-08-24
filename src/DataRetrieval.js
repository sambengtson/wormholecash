import axios from 'axios';
class DataRetrieval {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async balancesForAddress(address) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/balancesForAddress/${address}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async balancesForId(propertyId) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/balancesForId/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async balance(address, propertyId) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/balance/${address}/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async balancesHash(propertyId) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/balancesHash/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async crowdSale(propertyId) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/crowdSale/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async currentConsensusHash() {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/currentConsensusHash`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async feeShare() {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/feeShare`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async grants(propertyId) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/grants/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async info() {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/info`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async payload(txid) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/payload/${txid}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async property(propertyId) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/property/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async seedBlocks(startBlock, endBlock) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/seedBlocks/${startBlock}/${endBlock}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async STO(txid, recipientFilter) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/STO/${txid}/${recipientFilter}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async transaction(txid) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/transaction/${txid}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async blockTransactions(index) {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/blockTransactions/${index}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async pendingTransactions(address) {
    let path = `${this.restURL}dataRetrieval/pendingTransactions`;
    if(address) {
      path = `${this.restURL}dataRetrieval/pendingTransactions?address=${address}`
    }
    try {
      let response = await axios.get(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async properties() {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/properties`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async transactions() {
    try {
      let response = await axios.get(`${this.restURL}dataRetrieval/transactions`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default DataRetrieval;
