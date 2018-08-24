import axios from 'axios';
class Transaction {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async burnBCHGetWHC(amount, redeemAddress = undefined) {
    let path;
    if(redeemAddress) {
      path = `${this.restURL}transaction/burnBCHGetWHC/${amount}?redeemAddress=${redeemAddress}`;
    } else {
      path = `${this.restURL}transaction/burnBCHGetWHC/${amount}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async partiCrowSale(fromAddress, toAddress, amount, redeemAddress = undefined, referenceAmount = undefined) {
    let path;
    if(redeemAddress) {
      path = `${this.restURL}transaction/partiCrowSale/${fromAddress}/${toAddress}/${amount}?redeemAddress=${redeemAddress}`;
    } else if(redeemAddress && referenceAmount) {
      path = `${this.restURL}transaction/partiCrowSale/${fromAddress}/${toAddress}/${amount}?redeemAddress=${redeemAddress}&referenceAmount=${referenceAmount}`;
    } else if(referenceAmount) {
      path = `${this.restURL}transaction/partiCrowSale/${fromAddress}/${toAddress}/${amount}?referenceAmount=${referenceAmount}`;
    } else {
      path = `${this.restURL}transaction/partiCrowSale/${fromAddress}/${toAddress}/${amount}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async send(fromAddress, toAddress, propertyId, amount, redeemAddress = undefined, referenceAmount = undefined) {
    let path;
    if(redeemAddress) {
      path = `${this.restURL}transaction/send/${fromAddress}/${toAddress}/${propertyId}/${amount}?redeemAddress=${redeemAddress}`;
    } else if(redeemAddress && referenceAmount) {
      path = `${this.restURL}transaction/send/${fromAddress}/${toAddress}/${propertyId}/${amount}?redeemAddress=${redeemAddress}&referenceAmount=${referenceAmount}`;
    } else if(referenceAmount) {
      path = `${this.restURL}transaction/send/${fromAddress}/${toAddress}/${propertyId}/${amount}?referenceAmount=${referenceAmount}`;
    } else {
      path = `${this.restURL}transaction/send/${fromAddress}/${toAddress}/${propertyId}/${amount}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async all(fromAddress, toAddress, ecosystem, redeemAddress = undefined, referenceAmount = undefined) {
    let path;
    if(redeemAddress) {
      path = `${this.restURL}transaction/all/${fromAddress}/${toAddress}/${ecosystem}?redeemAddress=${redeemAddress}`;
    } else if(redeemAddress && referenceAmount) {
      path = `${this.restURL}transaction/all/${fromAddress}/${toAddress}/${ecosystem}?redeemAddress=${redeemAddress}&referenceAmount=${referenceAmount}`;
    } else if(referenceAmount) {
      path = `${this.restURL}transaction/all/${fromAddress}/${toAddress}/${ecosystem}?referenceAmount=${referenceAmount}`;
    } else {
      path = `${this.restURL}transaction/all/${fromAddress}/${toAddress}/${ecosystem}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async changeIssuer(fromAddress, toAddress, propertyId) {
    try {
      let response = await axios.post(`${this.restURL}transaction/changeIssuer/${fromAddress}/${toAddress}/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async closeCrowdSale(fromAddress, propertyId) {
    try {
      let response = await axios.post(`${this.restURL}transaction/closeCrowdSale/${fromAddress}/${propertyId}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async grant(fromAddress, toAddress, propertyId, amount, memo = undefined) {
    let path;
    if(memo) {
      path = `${this.restURL}transaction/grant/${fromAddress}/${toAddress}/${propertyId}/${amount}?memo=${memo}`;
    } else {
      path = `${this.restURL}transaction/grant/${fromAddress}/${toAddress}/${propertyId}/${amount}`;
    }
    try {
      let response = await axios.post(path)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async crowdSale(fromAddress, ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, propertyIdDesired, tokensPerUnit, deadline, earlyBonus, undefine, totalNumber) {
    try {
      let response = await axios.post(`${this.restURL}transaction/crowdSale/${fromAddress}/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${propertyIdDesired}/${tokensPerUnit}/${deadline}/${earlyBonus}/${undefine}/${totalNumber}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async fixed(fromAddress, ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, totalNumber) {
    try {
      let response = await axios.post(`${this.restURL}transaction/fixed/${fromAddress}/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${totalNumber}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async managed(fromAddress, ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data) {
    try {
      let response = await axios.post(`${this.restURL}transaction/managed/${fromAddress}/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async rawTx(fromAddress, rawTransaction) {
    try {
      let response = await axios.post(`${this.restURL}transaction/rawTx/${fromAddress}/${rawTransaction}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async revoke(fromAddress, propertyId, amount) {
    try {
      let response = await axios.post(`${this.restURL}transaction/revoke/${fromAddress}/${propertyId}/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }

  async STO(fromAddress, propertyId, amount) {
    try {
      let response = await axios.post(`${this.restURL}transaction/STO/${fromAddress}/${propertyId}/${amount}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default Transaction;
