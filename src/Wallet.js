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

  sendTo(address, amount) {
    return axios.post(`${this.restURL}wallet/sendTo/:address/:amount`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Wallet;
