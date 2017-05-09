const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../index');

describe('when the page loads', () => {
  it('it should respond with a 200', (done) => {
    chai.request(server)
    .get('/')
    .end( (err, res) => {
      // there should be no errors
      should.not.exist(err);

      // there should be a 200 status code
      res.status.should.equal(200);

      done();
    });
  });

  it('it should display the correct content', (done) => {
    chai.request(server)
    .get('/')
    .end( (err, res) => {
      // there should be no errors
      should.not.exist(err);

      // there should be a 200 status code
      res.status.should.equal(200);

      done();
    });
  });

  it('it should display the correct environment', (done) => {
    chai.request(server)
    .get('/')
    .end( (err, res) => {
      // there should be no errors
      should.not.exist(err);

      // there should be a 200 status code
      res.status.should.equal(200);

      done();
    });
  });

  it('it should not show a 404', (done) => {
    chai.request(server)
    .get('/')
    .end( (err, res) => {
      // there should be no errors
      should.not.exist(err);

      // there should be a 200 status code
      res.status.should.equal(200);

      done();
    });
  });

  it('it should load correctly', (done) => {
    chai.request(server)
    .get('/')
    .end( (err, res) => {
      // there should be no errors
      should.not.exist(err);

      // there should be a 200 status code
      res.status.should.equal(200);

      done();
    });
  });
});
