let BITBOXCli = require("bitbox-cli/lib/bitbox-cli").default;
import DataRetrieval from "./DataRetrieval";
import PayloadCreation from "./PayloadCreation";
import RawTransactions from "./RawTransactions";
import ERC20 from "./ERC20";

class Wormhole extends BITBOXCli {
  constructor(config) {
    super(config);
    if (config && config.restURL && config.restURL !== "") {
      this.restURL = config.restURL;
    } else {
      this.restURL = "http://wormholecash-staging.herokuapp.com/v1/";
    }

    this.DataRetrieval = new DataRetrieval(this.restURL);
    this.PayloadCreation = new PayloadCreation(this.restURL);
    this.RawTransactions = new RawTransactions(
      this.restURL,
      this.RawTransactions
    );
    this.ERC20 = new ERC20(
      this.restURL,
      this.DataRetrieval,
      this.PayloadCreation,
      this.RawTransactions
    );
  }
}

export default Wormhole;
