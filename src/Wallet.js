import axios from 'axios';
class Wallet {
  constructor(restURL) {
    this.restURL = restURL;
  }

  newAddress() {
    return axios.get(`${this.restURL}wallet/newAddress`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  sendToAddress(address, amount) {
    return axios.post(`${this.restURL}wallet/sendToAddress/:address/:amount`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Wallet;
