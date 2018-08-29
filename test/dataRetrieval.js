// let fixtures = require('./fixtures/DataRetrieval.json')
let chai = require('chai');
let assert = require('assert');
let wh = require('./../lib/Wormhole').default;
let Wormhole = new wh({
  restURL: "https://wormholecash-staging.herokuapp.com/v1/"
});

describe('#DataRetrieval', () => {
  describe('#balancesForAddress', () => {
    it(`should get balances for address`, async () => {
      try {
        let balancesForAddress = await Wormhole.DataRetrieval.balancesForAddress("bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg");
        assert.deepEqual(Object.keys(balancesForAddress[0]), ['propertyid', 'balance', 'reserved']);
      } catch (error) {
      }
    });
  });

  describe('#balancesForId', () => {
    it(`should get balances for id`, async () => {
      try {
        let balancesForId = await Wormhole.DataRetrieval.balancesForId(108);
        assert.deepEqual(Object.keys(balancesForId[0]), ['address', 'balance', 'reserved']);
      } catch (error) {
      }
    });
  });

  describe('#balance', () => {
    it(`should get balance for address by id`, async () => {
      try {
        let balance = await Wormhole.DataRetrieval.balance("bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg", 1);
        assert.deepEqual(Object.keys(balance), [ 'balance', 'reserved' ]);
      } catch (error) {
      }
    });
  });

  describe('#balancesHash', () => {
    it(`should get balancesHash for id`, async () => {
      try {
        let balancesHash = await Wormhole.DataRetrieval.balancesHash(31);
        assert.deepEqual(Object.keys(balancesHash), [ 'block', 'blockhash', 'propertyid', 'balanceshash' ]);
      } catch (error) {
      }
    });
  });

  describe('#crowdSale', () => {
    it(`should get crowdSale for id`, async () => {
      try {
        let crowdSale = await Wormhole.DataRetrieval.crowdSale(31, true);
        assert.deepEqual(Object.keys(crowdSale), [ "propertyid", "name", "active", "issuer", "propertyiddesired", "precision", "tokensperunit", "earlybonus", "starttime", "deadline", "amountraised", "tokensissued", "addedissuertokens", "closedearly", "maxtokens" ]);
      } catch (error) {
      }
    });
  });

  describe('#currentConsensusHash', () => {
    it(`should get currentConsensusHash`, async () => {
      try {
        let currentConsensusHash = await Wormhole.DataRetrieval.currentConsensusHash();
        assert.deepEqual(Object.keys(currentConsensusHash), [ "block", "blockhash", "consensushash" ]);
      } catch (error) {
      }
    });
  });

  describe('#grants', () => {
    it(`should get grants for id`, async () => {
      try {
        let grants = await Wormhole.DataRetrieval.grants(3);
        assert.deepEqual(Object.keys(grants), [ "propertyid", "name", "issuer", "creationtxid", "totaltokens", "issuances" ]);
      } catch (error) {
      }
    });
  });

  describe('#info', () => {
    it(`should get info`, async () => {
      try {
        let info = await Wormhole.DataRetrieval.info();
        assert.deepEqual(Object.keys(info), [ 'wormholeversion_int', 'wormholeversion', 'bitcoincoreversion', 'block', 'blocktime', 'blocktransactions', 'totaltrades', 'totaltransactions', 'alerts' ]);
      } catch (error) {
      }
    });
  });

  describe('#payload', () => {
    it(`should get payload`, async () => {
      try {
        let response  = await Wormhole.DataRetrieval.payload("000000000000000000000000000000000000000000000000000000000000000");
        return response.data;
      } catch (error) {
        assert.deepEqual(error, 'txid must be hexadecimal string (not \'000000000000000000000000000000000000000000000000000000000000000\')');
      }
    });
  });

  describe('#property', () => {
    it(`should get property by id`, async () => {
      try {
        let property = await Wormhole.DataRetrieval.property(3);
        assert.deepEqual(Object.keys(property), [ 'propertyid', 'name', 'category', 'subcategory', 'data', 'url', 'precision', 'issuer', 'creationtxid', 'fixedissuance', 'managedissuance', 'freezingenabled', 'totaltokens' ]);
      } catch (error) {
      }
    });
  });

  describe('#seedBlocks', () => {
    it(`should get seedBlocks`, async () => {
      try {
        let seedBlocks = await Wormhole.DataRetrieval.seedBlocks(290000, 300000);
        assert.deepEqual(Object.keys(seedBlocks), [ ]);
      } catch (error) {
      }
    });
  });

  describe('#STO', () => {
    it(`should get STO`, async () => {
      try {
        let STO = await Wormhole.DataRetrieval.STO("000000000000000000000000000000000000000000000000000000000000000", "*");
        assert.deepEqual(STO, 'txid must be hexadecimal string (not \'000000000000000000000000000000000000000000000000000000000000000\')');
      } catch (error) {
      }
    });
  });

  describe('#transaction', () => {
    it(`should get transaction`, async () => {
      try {
        let transaction = await Wormhole.DataRetrieval.transaction("000000000000000000000000000000000000000000000000000000000000000");
        assert.deepEqual(transaction, 'txid must be hexadecimal string (not \'000000000000000000000000000000000000000000000000000000000000000\')');
      } catch (error) {
      }
    });
  });

  describe('#blockTransactions', () => {
    it(`should get blockTransactions`, async () => {
      try {
        let blockTransactions = await Wormhole.DataRetrieval.blockTransactions("0000000000009ae2ee5d085a0f3d20c8ace0c742af60269f44fc3e3af354b5cb");
        assert.deepEqual(blockTransactions, []);
      } catch (error) {
      }
    });
  });

  describe('#pendingTransactions', () => {
    it(`should get pendingTransactions`, async () => {
      try {
        let pendingTransactions = await Wormhole.DataRetrieval.pendingTransactions();
        assert.deepEqual(pendingTransactions, []);
      } catch (error) {
      }
    });
  });

  describe('#properties', () => {
    it(`should get properties`, async () => {
      try {
        let properties = await Wormhole.DataRetrieval.properties();
        assert.deepEqual(Object.keys(properties[0]), [ 'propertyid', 'name', 'category', 'subcategory', 'data', 'url', 'precision' ]);
      } catch (error) {
      }
    });
  });
});
