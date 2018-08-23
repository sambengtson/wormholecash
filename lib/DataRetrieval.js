'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataRetrieval = function () {
  function DataRetrieval(restURL) {
    _classCallCheck(this, DataRetrieval);

    this.restURL = restURL;
  }

  _createClass(DataRetrieval, [{
    key: 'balancesForAddress',
    value: async function balancesForAddress(address) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/balancesForAddress/' + address);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'balancesForId',
    value: async function balancesForId(propertyId) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/balancesForId/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'balance',
    value: async function balance(address, propertyId) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/balance/' + address + '/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'balancesHash',
    value: async function balancesHash(propertyId) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/balancesHash/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'crowdSale',
    value: async function crowdSale(propertyId) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/crowdSale/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'currentConsensusHash',
    value: async function currentConsensusHash() {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/currentConsensusHash');
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'feeShare',
    value: async function feeShare() {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/feeShare');
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'grants',
    value: async function grants(propertyId) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/grants/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'info',
    value: async function info() {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/info');
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'payload',
    value: async function payload(txid) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/payload/' + txid);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'property',
    value: async function property(propertyId) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/property/' + propertyId);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'seedBlocks',
    value: async function seedBlocks(startBlock, endBlock) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/seedBlocks/' + startBlock + '/' + endBlock);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'STO',
    value: async function STO(txid, recipientFilter) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/STO/' + txid + '/' + recipientFilter);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'transaction',
    value: async function transaction(txid) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/transaction/' + txid);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'blockTransactions',
    value: async function blockTransactions(index) {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/blockTransactions/' + index);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'pendingTransactions',
    value: async function pendingTransactions(address) {
      var path = this.restURL + 'dataRetrieval/pendingTransactions';
      if (address) {
        path = this.restURL + 'dataRetrieval/pendingTransactions?address=' + address;
      }
      try {
        var response = await _axios2.default.get(path);
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'properties',
    value: async function properties() {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/properties');
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'transactions',
    value: async function transactions() {
      try {
        var response = await _axios2.default.get(this.restURL + 'dataRetrieval/transactions');
        return response.data;
      } catch (err) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }]);

  return DataRetrieval;
}();

exports.default = DataRetrieval;