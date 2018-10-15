import axios from "axios"
class PayloadCreation {
  constructor(restURL) {
    this.restURL = restURL
  }

  async burnBCH() {
    try {
      const response = await axios.get(`${this.restURL}payloadCreation/burnBCH`)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async changeIssuer(propertyId) {
    try {
      const response = await axios.post(
        `${this.restURL}payloadCreation/changeIssuer/${propertyId}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async closeCrowdSale(propertyId) {
    try {
      const response = await axios.post(
        `${this.restURL}payloadCreation/closeCrowdSale/${propertyId}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async grant(propertyId, amount, memo = "") {
    let path
    if (memo !== "") {
      path = `${
        this.restURL
      }payloadCreation/grant/${propertyId}/${amount}?memo=${memo}`
    } else {
      path = `${this.restURL}payloadCreation/grant/${propertyId}/${amount}`
    }
    try {
      const response = await axios.post(path)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async crowdsale(
    ecosystem,
    propertyPrecision,
    previousId,
    category,
    subcategory,
    name,
    url,
    data,
    propertyIdDesired,
    tokensPerUnit,
    deadline,
    earlyBonus,
    undefine,
    totalNumber
  ) {
    try {
      const response = await axios.post(
        `${
          this.restURL
        }payloadCreation/crowdsale/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${propertyIdDesired}/${tokensPerUnit}/${deadline}/${earlyBonus}/${undefine}/${totalNumber}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async fixed(
    ecosystem,
    propertyPrecision,
    previousId,
    category,
    subcategory,
    name,
    url,
    data,
    amount
  ) {
    try {
      const response = await axios.post(
        `${
          this.restURL
        }payloadCreation/fixed/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}/${amount}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async managed(
    ecosystem,
    propertyPrecision,
    previousId,
    category,
    subcategory,
    name,
    url,
    data
  ) {
    try {
      const response = await axios.post(
        `${
          this.restURL
        }payloadCreation/managed/${ecosystem}/${propertyPrecision}/${previousId}/${category}/${subcategory}/${name}/${url}/${data}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async participateCrowdSale(amount) {
    try {
      const response = await axios.post(
        `${this.restURL}payloadCreation/participateCrowdSale/${amount}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async revoke(propertyId, amount) {
    try {
      const response = await axios.post(
        `${this.restURL}payloadCreation/revoke/${propertyId}/${amount}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async simpleSend(propertyId, amount) {
    try {
      const response = await axios.post(
        `${this.restURL}payloadCreation/simpleSend/${propertyId}/${amount}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async STO(propertyId, amount, distributionProperty = undefined) {
    let path
    if (distributionProperty !== undefined) {
      path = `${
        this.restURL
      }payloadCreation/STO/${propertyId}/${amount}?distributionProperty=${distributionProperty}`
    } else {
      path = `${this.restURL}payloadCreation/STO/${propertyId}/${amount}`
    }
    try {
      const response = await axios.post(path)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async freeze(toAddress, propertyId, amount) {
    const path = `${
      this.restURL
    }payloadCreation/freeze/${toAddress}/${propertyId}/${amount}`
    try {
      const response = await axios.post(path)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }

  async unfreeze(toAddress, propertyId, amount) {
    const path = `${
      this.restURL
    }payloadCreation/unfreeze/${toAddress}/${propertyId}/${amount}`
    try {
      const response = await axios.post(path)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default PayloadCreation
