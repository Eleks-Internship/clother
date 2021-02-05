import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test database user', () => {
    const firstName: string = "firstName";
    const lastName: string = "lastName";
    const email: string = "email@email.com";
    const password: string = "password";

    it('post', async () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/users').send({
            firstName,
            lastName,
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
    })
});