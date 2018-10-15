import { DataRetrieval } from "./DataRetrieval"
import { PayloadCreation } from "./PayloadCreation"
import { RawTransactions } from "./RawTransactions"
import { ERC20 } from "./ERC20"
import BITBOXCli from "bitbox-cli/lib/bitbox-cli"

declare class Wormhole extends BITBOXCli {
  constructor(config?: Config)

  DataRetrieval: DataRetrieval
  PayloadCreation: PayloadCreation
  RawTransactions: RawTransactions
  ERC20: ERC20
}

export declare interface Config {
  restURL?: string
}

export default Wormhole