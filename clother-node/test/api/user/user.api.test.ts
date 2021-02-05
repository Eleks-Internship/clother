import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { ObjectID } from 'mongodb';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test database user', () => {
    const firstName: string = "firstName";
    const lastName: string = "lastName";
    const email: string = "email@email.com";
    const password: string = "password";
    let _id: ObjectID = new ObjectID("601beeb6964b0a126801b7ff");

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
    });

    it('get user', async () => {
        return chai.request('http://' + server +':' + port + '/api').get('/v1/users/' + _id).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data.firstName).to.eql(firstName);
                chai.expect(res.body.data.lastName).to.eql(lastName);
                chai.expect(res.body.data.email).to.eql(email);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('put', () => {
        return chai.request('http://' + server +':' + port + '/api').put('/v1/users').send({
            id: _id,
            firstName,
            lastName,
            email,
            password
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.eql(true);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });
});