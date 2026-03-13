const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('GET /', () => {
  describe('response status', () => {
    const server = require('../index');

    it('should respond with 200', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          done();
        });
    });

    it('should not respond with 404', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.not.equal(404);
          done();
        });
    });
  });

  describe('response content', () => {
    const server = require('../index');

    it('should return HTML content', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.type.should.include('html');
          done();
        });
    });
  });

  describe('environment display', () => {
    afterEach(() => {
      delete process.env.APP_ENV;
      delete require.cache[require.resolve('../index')];
    });

    it('should display "staging" when APP_ENV is staging', (done) => {
      process.env.APP_ENV = 'staging';
      const server = require('../index');
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.text.should.include('staging');
          done();
        });
    });

    it('should display "production" when APP_ENV is production', (done) => {
      process.env.APP_ENV = 'production';
      const server = require('../index');
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.text.should.include('production');
          done();
        });
    });

    it('should display "review app" when APP_ENV is not set', (done) => {
      const server = require('../index');
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.text.should.include('review app');
          done();
        });
    });

    it('should display "review app" for an unknown APP_ENV value', (done) => {
      process.env.APP_ENV = 'unknown';
      const server = require('../index');
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.text.should.include('review app');
          done();
        });
    });
  });
});
