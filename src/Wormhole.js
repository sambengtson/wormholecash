let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
import Configuration from './Configuration';
import DataRetrieval from './DataRetrieval';
import PayloadCreation from './PayloadCreation';
import RawTransactions from './RawTransactions';
// import Transaction from './Transaction';
import Wallet from './Wallet';

class Wormhole extends BITBOXCli {
  constructor(config) {
    super(config);
    if(config && config.restURL && config.restURL !== '') {
      this.restURL = config.restURL;
    } else {
      this.restURL = 'https://wormholerest.bitcoin.com/v1/';
    }

    this.Configuration = new Configuration(this.restURL);
    this.DataRetrieval = new DataRetrieval(this.restURL);
    this.PayloadCreation = new PayloadCreation(this.restURL);
    this.RawTransactions = new RawTransactions(this.restURL);
    // this.Transaction = new Transaction(this.restURL);
    this.Wallet = new Wallet(this.restURL);
  }
}

export default Wormhole;
