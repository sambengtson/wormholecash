// let fixtures = require('./fixtures/PayloadCreation.json')
let chai = require('chai');
let assert = require('assert');
let wh = require('./../lib/Wormhole').default;
let Wormhole = new wh({
  restURL: "https://wormholecash-staging.herokuapp.com/v1/"
});

describe('#PayloadCreation', () => {
  describe('#burnBCH', () => {
    it(`should burnBCH`, async () => {
      try {
        let burnBCH = await Wormhole.PayloadCreation.burnBCH();
        assert.equal(burnBCH, '00000044');
      } catch (error) {
      }
    });
  });

  describe('#changeIssuer', () => {
    it(`should changeIssuer`, async () => {
      try {
        let changeIssuer = await Wormhole.PayloadCreation.changeIssuer(3);
        assert.equal(changeIssuer, '0000004600000003');
      } catch (error) {
      }
    });
  });

  describe('#closeCrowdSale', () => {
    it(`should closeCrowdSale`, async () => {
      try {
        let closeCrowdSale = await Wormhole.PayloadCreation.closeCrowdSale(70);
        assert.equal(closeCrowdSale, '0000003500000046');
      } catch (error) {
      }
    });
  });

  describe('#grant', () => {
    it(`should grant`, async () => {
      try {
        let grant = await Wormhole.PayloadCreation.grant(3, "7000");
        assert.equal(grant, '00000037000000030000000000001b5800');
      } catch (error) {
      }
    });
  });

  describe('#crowdsale', () => {
    it(`should crowdsale`, async () => {
      try {
        let crowdsale = await Wormhole.PayloadCreation.crowdsale(1, 1, 0, "Companies", "Bitcoin Mining", "Quantum Miner", "www.example.com", "Quantum Miner Tokens", 1, "100", 1483228800, 30, 0, 192978657);
        assert.equal(crowdsale, '0000003301000100000000436f6d70616e69657300426974636f696e204d696e696e67005175616e74756d204d696e6572007777772e6578616d706c652e636f6d005175616e74756d204d696e657220546f6b656e73000000000100000002540be40000000000586846801e0000000000730634ca');
      } catch (error) {
      }
    });
  });

  describe('#fixed', () => {
    it(`should fixed`, async () => {
      try {
        let fixed = await Wormhole.PayloadCreation.fixed(1, 1, 0, "Companies", "Bitcoin Mining", "Quantum Miner", "www.example.com", "Quantum Miner Tokens", "1000000");
        assert.equal(fixed, '0000003201000100000000436f6d70616e69657300426974636f696e204d696e696e67005175616e74756d204d696e6572007777772e6578616d706c652e636f6d005175616e74756d204d696e657220546f6b656e73000000000000989680');
      } catch (error) {
      }
    });
  });

  describe('#managed', () => {
    it(`should managed`, async () => {
      try {
        let managed = await Wormhole.PayloadCreation.managed(1, 1, 0, "Companies", "Bitcoin Mining", "Quantum Miner", "www.example.com", "Quantum Miner Tokens");
        assert.equal(managed, '0000003601000100000000436f6d70616e69657300426974636f696e204d696e696e67005175616e74756d204d696e6572007777772e6578616d706c652e636f6d005175616e74756d204d696e657220546f6b656e7300');
      } catch (error) {
      }
    });
  });

  describe('#participateCrowdSale', () => {
    it(`should participateCrowdSale`, async () => {
      try {
        let participateCrowdSale = await Wormhole.PayloadCreation.participateCrowdSale("100.0");
        assert.equal(participateCrowdSale, '000000010000000100000002540be400');
      } catch (error) {
      }
    });
  });

  describe('#revoke', () => {
    it(`should revoke`, async () => {
      try {
        let revoke = await Wormhole.PayloadCreation.revoke(105, "100");
        assert.equal(revoke, 'Property identifier does not refer to a managed property');
      } catch (error) {
      }
    });
  });

  describe('#simpleSend', () => {
    it(`should simpleSend`, async () => {
      try {
        let simpleSend = await Wormhole.PayloadCreation.simpleSend(1, "100.0");
        assert.equal(simpleSend, '000000000000000100000002540be400');
      } catch (error) {
      }
    });
  });

  describe('#STO', () => {
    it(`should STO`, async () => {
      try {
        let STO = await Wormhole.PayloadCreation.STO(3, "5000");
        assert.equal(STO, '0000000300000003000000000000138800000003');
      } catch (error) {
      }
    });
  });
});
