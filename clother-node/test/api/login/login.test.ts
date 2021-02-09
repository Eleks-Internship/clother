import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test api login', () => {
    const firstName: string = 'firstName';
    const lastName: string = 'lastName';
    const email: string = "test@test.com";
    const password: string = "test";

    it('post', async () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/login').send({
            email,
            password
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.not.eql(null);
                chai.expect(res.body.data).to.not.eql('');
                chai.expect(res.body.data).to.be.a('string');
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('post facebook', async () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/login/facebook').send({
            firstName,
            lastName,
            email
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.not.eql(null);
                chai.expect(res.body.data).to.not.eql('');
                chai.expect(res.body.data).to.be.a('string');
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });
});
