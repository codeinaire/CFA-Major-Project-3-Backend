process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../models/Users');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
    it('it should GET all the Users', (done) => {
      chai.request(server)
          .get('/api/user')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
    });
  });
});
