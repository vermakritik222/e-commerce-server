const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /health-check', () => {
  it('Health check passed', (done) => {
    chai
      .request(app)
      .get('/health-check')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.msg).to.equal('Health check passed');
        done();
      });
  });
});
