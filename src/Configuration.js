import axios from 'axios';
class Configuration {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async autoCommit(flag = true) {
    let final;
    if(flag === true) {
      final = 'true';
    } else {
      final = 'false';
    }

    try {
      let response = await axios.get(`${this.restURL}configuration/autoCommit/${final}`)
      return response.data;
    } catch (err) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default Configuration;
