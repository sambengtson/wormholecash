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
      throw error;
    }
  }

  async changeIssuer(propertyId) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/changeIssuer/${propertyId}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async closeCrowdSale(propertyId) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/closeCrowdSale/${propertyId}`)
      return response.data;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  async crowdsale(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, propertyIdDesired, tokensPerUnit, deadline, earlyBonus, undefine, totalNumber) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/crowdsale/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${propertyIdDesired}/${tokensPerUnit}/${deadline}/${earlyBonus}/${undefine}/${totalNumber}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fixed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/fixed/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${amount}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async managed(ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/managed/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async participateCrowdSale(amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/participateCrowdSale/${amount}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async revoke(propertyId, amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/revoke/${propertyId}/${amount}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendAll(ecosystem) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/sendAll/${ecosystem}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async simpleSend(propertyId, amount) {
    try {
      let response = await axios.post(`${this.restURL}payloadCreation/simpleSend/${propertyId}/${amount}`)
      return response.data;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
}

export default PayloadCreation;
