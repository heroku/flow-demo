const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../index');

describe('server', () => {
  it('should respond with 200', (done) => {
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
