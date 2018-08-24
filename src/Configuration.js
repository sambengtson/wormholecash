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
      console.log('ererer', response)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default Configuration;
