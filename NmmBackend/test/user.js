process.env.NODE_ENV = 'test';
// process.nev.<CONFIG_FILE>="name of db"
const mongoose = require('mongoose');
const User = require('../models/Users');

const chai = require('chai');
const chaiHttp = require('chai-http');
// peter called this app instead of server.
const server = require('../app');
// server.listen(3000);

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
            console.log('this is res', res.body);
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });
});

// const should = chai.should().expect;
//
// // change it to false to see if the test function is actually working. This is more integration testing than unit testing.
// /
// describe ('simple test', function() {
//   it ('always true', function() {
//     expect(true).to.be.true;
//   })
// })
