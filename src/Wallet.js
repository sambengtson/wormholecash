import axios from 'axios';
class Wallet {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async newAddress() {
    try {
      let response = await axios.get(`${this.restURL}wallet/newAddress`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async sendToAddress(address, amount) {
    try {
      let response = await axios.post(`${this.restURL}wallet/sendToAddress/${address}/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default Wallet;
