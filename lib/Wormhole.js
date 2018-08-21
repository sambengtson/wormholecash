'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _DataRetrieval = require('./DataRetrieval');

var _DataRetrieval2 = _interopRequireDefault(_DataRetrieval);

var _PayloadCreation = require('./PayloadCreation');

var _PayloadCreation2 = _interopRequireDefault(_PayloadCreation);

var _RawTransactions = require('./RawTransactions');

var _RawTransactions2 = _interopRequireDefault(_RawTransactions);

var _Transaction = require('./Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _Wallet = require('./Wallet');

var _Wallet2 = _interopRequireDefault(_Wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;

var Wormhole = function (_BITBOXCli) {
  _inherits(Wormhole, _BITBOXCli);

  function Wormhole(config) {
    _classCallCheck(this, Wormhole);

    var _this = _possibleConstructorReturn(this, (Wormhole.__proto__ || Object.getPrototypeOf(Wormhole)).call(this, config));

    if (config && config.restURL && config.restURL !== '') {
      _this.restURL = config.restURL;
    } else {
      _this.restURL = 'https://wormholerest.bitcoin.com/v1/';
    }

    _this.Configuration = new _Configuration2.default(_this.restURL);
    _this.DataRetrieval = new _DataRetrieval2.default(_this.restURL);
    _this.PayloadCreation = new _PayloadCreation2.default(_this.restURL);
    _this.RawTransactions = new _RawTransactions2.default(_this.restURL);
    _this.Transaction = new _Transaction2.default(_this.restURL);
    _this.Wallet = new _Wallet2.default(_this.restURL);
    return _this;
  }

  return Wormhole;
}(BITBOXCli);

exports.default = Wormhole;