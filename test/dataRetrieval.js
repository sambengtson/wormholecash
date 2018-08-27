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
      let balancesForAddress = await Wormhole.DataRetrieval.balancesForAddress("bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg");
      assert.deepEqual(Object.keys(balancesForAddress[0]), ['propertyid', 'balance', 'reserved']);
    });
  });

  describe('#balancesForId', () => {
    it(`should get balances for id`, async () => {
      let balancesForId = await Wormhole.DataRetrieval.balancesForId(108);
      assert.deepEqual(Object.keys(balancesForId[0]), ['address', 'balance', 'reserved']);
    });
  });

  describe('#balance', () => {
    it(`should get balance for address by id`, async () => {
      let balance = await Wormhole.DataRetrieval.balance("bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg", 1);
      assert.deepEqual(Object.keys(balance), [ 'balance', 'reserved' ]);
    });
  });

  describe('#balancesHash', () => {
    it(`should get balancesHash for id`, async () => {
      let balancesHash = await Wormhole.DataRetrieval.balancesHash(31);
      assert.deepEqual(Object.keys(balancesHash), [ 'block', 'blockhash', 'propertyid', 'balanceshash' ]);
    });
  });

  describe('#crowdSale', () => {
    it(`should get crowdSale for id`, async () => {
      let crowdSale = await Wormhole.DataRetrieval.crowdSale(31, true);
      assert.deepEqual(Object.keys(crowdSale), [ "propertyid", "name", "active", "issuer", "propertyiddesired", "precision", "tokensperunit", "earlybonus", "starttime", "deadline", "amountraised", "tokensissued", "addedissuertokens", "closedearly", "maxtokens" ]);
    });
  });

  describe('#currentConsensusHash', () => {
    it(`should get currentConsensusHash`, async () => {
      let currentConsensusHash = await Wormhole.DataRetrieval.currentConsensusHash();
      assert.deepEqual(Object.keys(currentConsensusHash), [ "block", "blockhash", "consensushash" ]);
    });
  });

  describe('#grants', () => {
    it(`should get grants for id`, async () => {
      let grants = await Wormhole.DataRetrieval.grants(3);
      assert.deepEqual(Object.keys(grants), [ "propertyid", "name", "issuer", "creationtxid", "totaltokens", "issuances" ]);
    });
  });

  describe('#info', () => {
    it(`should get info`, async () => {
      let info = await Wormhole.DataRetrieval.info();
      assert.deepEqual(Object.keys(info), [ 'wormholeversion_int', 'wormholeversion', 'bitcoincoreversion', 'block', 'blocktime', 'blocktransactions', 'totaltrades', 'totaltransactions', 'alerts' ]);
    });
  });

  describe('#payload', () => {
    it(`should get payload`, async () => {
      let payload = await Wormhole.DataRetrieval.payload("000000000000000000000000000000000000000000000000000000000000000");
      assert.deepEqual(payload, 'txid must be hexadecimal string (not \'000000000000000000000000000000000000000000000000000000000000000\')');
    });
  });

  describe('#property', () => {
    it(`should get property by id`, async () => {
      let property = await Wormhole.DataRetrieval.property(3);
      assert.deepEqual(Object.keys(property), [ 'propertyid', 'name', 'category', 'subcategory', 'data', 'url', 'precision', 'issuer', 'creationtxid', 'fixedissuance', 'managedissuance', 'freezingenabled', 'totaltokens' ]);
    });
  });

  describe('#seedBlocks', () => {
    it(`should get seedBlocks`, async () => {
      let seedBlocks = await Wormhole.DataRetrieval.seedBlocks(290000, 300000);
      assert.deepEqual(Object.keys(seedBlocks), [ ]);
    });
  });

  describe('#STO', () => {
    it(`should get STO`, async () => {
      let STO = await Wormhole.DataRetrieval.STO("000000000000000000000000000000000000000000000000000000000000000", "*");
      assert.deepEqual(STO, 'txid must be hexadecimal string (not \'000000000000000000000000000000000000000000000000000000000000000\')');
    });
  });

  describe('#transaction', () => {
    it(`should get transaction`, async () => {
      let transaction = await Wormhole.DataRetrieval.transaction("000000000000000000000000000000000000000000000000000000000000000");
      assert.deepEqual(transaction, 'txid must be hexadecimal string (not \'000000000000000000000000000000000000000000000000000000000000000\')');
    });
  });

  describe('#blockTransactions', () => {
    it(`should get blockTransactions`, async () => {
      let blockTransactions = await Wormhole.DataRetrieval.blockTransactions("0000000000009ae2ee5d085a0f3d20c8ace0c742af60269f44fc3e3af354b5cb");
      assert.deepEqual(blockTransactions, []);
    });
  });

  describe('#pendingTransactions', () => {
    it(`should get pendingTransactions`, async () => {
      let pendingTransactions = await Wormhole.DataRetrieval.pendingTransactions();
      assert.deepEqual(pendingTransactions, []);
    });
  });

  describe('#properties', () => {
    it(`should get properties`, async () => {
      let properties = await Wormhole.DataRetrieval.properties();
      assert.deepEqual(Object.keys(properties[0]), [ 'propertyid', 'name', 'category', 'subcategory', 'data', 'url', 'precision' ]);
    });
  });
});
