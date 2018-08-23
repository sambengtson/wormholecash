'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function () {
  function Transaction(restURL) {
    _classCallCheck(this, Transaction);

    this.restURL = restURL;
  }

  _createClass(Transaction, [{
    key: 'burnBCHGetWHC',
    value: async function burnBCHGetWHC(amount) {
      var redeemAddress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var path = void 0;
      if (redeemAddress) {
        path = this.restURL + 'transaction/burnBCHGetWHC/' + amount + '?redeemAddress=' + redeemAddress;
      } else {
        path = this.restURL + 'transaction/burnBCHGetWHC/' + amount;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'partiCrowSale',
    value: async function partiCrowSale(fromAddress, toAddress, amount) {
      var redeemAddress = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var referenceAmount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

      var path = void 0;
      if (redeemAddress) {
        path = this.restURL + 'transaction/partiCrowSale/' + fromAddress + '/' + toAddress + '/' + amount + '?redeemAddress=' + redeemAddress;
      } else if (redeemAddress && referenceAmount) {
        path = this.restURL + 'transaction/partiCrowSale/' + fromAddress + '/' + toAddress + '/' + amount + '?redeemAddress=' + redeemAddress + '&referenceAmount=' + referenceAmount;
      } else if (referenceAmount) {
        path = this.restURL + 'transaction/partiCrowSale/' + fromAddress + '/' + toAddress + '/' + amount + '?referenceAmount=' + referenceAmount;
      } else {
        path = this.restURL + 'transaction/partiCrowSale/' + fromAddress + '/' + toAddress + '/' + amount;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'send',
    value: async function send(fromAddress, toAddress, propertyId, amount) {
      var redeemAddress = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var referenceAmount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

      var path = void 0;
      if (redeemAddress) {
        path = this.restURL + 'transaction/send/' + fromAddress + '/' + toAddress + '/' + propertyId + '/' + amount + '?redeemAddress=' + redeemAddress;
      } else if (redeemAddress && referenceAmount) {
        path = this.restURL + 'transaction/send/' + fromAddress + '/' + toAddress + '/' + propertyId + '/' + amount + '?redeemAddress=' + redeemAddress + '&referenceAmount=' + referenceAmount;
      } else if (referenceAmount) {
        path = this.restURL + 'transaction/send/' + fromAddress + '/' + toAddress + '/' + propertyId + '/' + amount + '?referenceAmount=' + referenceAmount;
      } else {
        path = this.restURL + 'transaction/send/' + fromAddress + '/' + toAddress + '/' + propertyId + '/' + amount;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'all',
    value: async function all(fromAddress, toAddress, ecosystem) {
      var redeemAddress = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var referenceAmount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

      var path = void 0;
      if (redeemAddress) {
        path = this.restURL + 'transaction/all/' + fromAddress + '/' + toAddress + '/' + ecosystem + '?redeemAddress=' + redeemAddress;
      } else if (redeemAddress && referenceAmount) {
        path = this.restURL + 'transaction/all/' + fromAddress + '/' + toAddress + '/' + ecosystem + '?redeemAddress=' + redeemAddress + '&referenceAmount=' + referenceAmount;
      } else if (referenceAmount) {
        path = this.restURL + 'transaction/all/' + fromAddress + '/' + toAddress + '/' + ecosystem + '?referenceAmount=' + referenceAmount;
      } else {
        path = this.restURL + 'transaction/all/' + fromAddress + '/' + toAddress + '/' + ecosystem;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'changeIssuer',
    value: async function changeIssuer(fromAddress, toAddress, propertyId) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/changeIssuer/' + fromAddress + '/' + toAddress + '/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'closeCrowdSale',
    value: async function closeCrowdSale(fromAddress, propertyId) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/closeCrowdSale/' + fromAddress + '/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'grant',
    value: async function grant(fromAddress, toAddress, propertyId, amount) {
      var memo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

      var path = void 0;
      if (memo) {
        path = this.restURL + 'transaction/grant/' + fromAddress + '/' + toAddress + '/' + propertyId + '/' + amount + '?memo=' + memo;
      } else {
        path = this.restURL + 'transaction/grant/' + fromAddress + '/' + toAddress + '/' + propertyId + '/' + amount;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'crowdSale',
    value: async function crowdSale(fromAddress, ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, propertyIdDesired, tokensPerUnit, deadline, earlyBonus, undefine, totalNumber) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/crowdSale/' + fromAddress + '/' + ecosystem + '/' + propertyPrecision + '/' + previousId + '/' + category + '/' + subcategory + '/' + name + '/' + url + '/' + data + '/' + propertyIdDesired + '/' + tokensPerUnit + '/' + deadline + '/' + earlyBonus + '/' + undefine + '/' + totalNumber);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'fixed',
    value: async function fixed(fromAddress, ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data, totalNumber) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/fixed/' + fromAddress + '/' + ecosystem + '/' + propertyPrecision + '/' + previousId + '/' + category + '/' + subcategory + '/' + name + '/' + url + '/' + data + '/' + totalNumber);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'managed',
    value: async function managed(fromAddress, ecosystem, propertyPrecision, previousId, category, subcategory, name, url, data) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/managed/' + fromAddress + '/' + ecosystem + '/' + propertyPrecision + '/' + previousId + '/' + category + '/' + subcategory + '/' + name + '/' + url + '/' + data);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'rawTx',
    value: async function rawTx(fromAddress, rawTransaction) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/rawTx/' + fromAddress + '/' + rawTransaction);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'revoke',
    value: async function revoke(fromAddress, propertyId, amount) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/revoke/' + fromAddress + '/' + propertyId + '/' + amount);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'STO',
    value: async function STO(fromAddress, propertyId, amount) {
      try {
        var response = await _axios2.default.post(this.restURL + 'transaction/STO/' + fromAddress + '/' + propertyId + '/' + amount);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }]);

  return Transaction;
}();

exports.default = Transaction;