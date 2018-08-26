let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
import DataRetrieval from './DataRetrieval';
import PayloadCreation from './PayloadCreation';
import RawTransactions from './RawTransactions';

class Wormhole extends BITBOXCli {
  constructor(config) {
    super(config);
    if(config && config.restURL && config.restURL !== '') {
      this.restURL = config.restURL;
    } else {
      this.restURL = 'https://wormholerest.bitcoin.com/v1/';
    }

    this.DataRetrieval = new DataRetrieval(this.restURL);
    this.PayloadCreation = new PayloadCreation(this.restURL);
    this.RawTransactions = new RawTransactions(this.restURL, this.RawTransactions);
  }
}

export default Wormhole;
