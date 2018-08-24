import axios from 'axios';
class PayloadCreation {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async burnBCH() {
    try {
      let response = await axios.get(`${this.restURL}payloadCreation/burnBCH`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async changeIssuer(propertyId) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/changeIssuer/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async closeCrowdSale(propertyId) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/closeCrowdSale/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async grant(propertyId, amount, memo = '') {
    let path;
    if(memo !== '') {
      path = `${this.restURL}payloadCreation/grant/${propertyId}/${amount}?memo=${memo}`;
    } else {
      path = `${this.restURL}payloadCreation/grant/${propertyId}/${amount}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async crowdsale(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, propertyIdDesired, tokensPerUnit, deadline, earlyBonus, undefine, totalNumber) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/crowdsale/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${propertyIdDesired}/${tokensPerUnit}/${deadline}/${earlyBonus}/${undefine}/${totalNumber}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async fixed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/fixed/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async managed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/managed/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async participateCrowdSale(amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/participateCrowdSale/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async revoke(propertyId, amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/revoke/${propertyId}/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async sendAll(ecosystem) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/sendAll/${ecosystem}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async simpleSend(propertyId, amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/simpleSend/${propertyId}/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async STO(propertyId, amount, distributionProperty = undefined) {
    let path;
    if(distributionProperty !== undefined) {
      path = `${this.restURL}payloadCreation/STO/${propertyId}/${amount}?distributionProperty=${distributionProperty}`;
    } else {
      path = `${this.restURL}payloadCreation/STO/${propertyId}/${amount}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default PayloadCreation;
