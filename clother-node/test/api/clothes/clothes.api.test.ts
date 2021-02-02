import chai from 'chai';
import chaiHttp from 'chai-http';
import { ObjectID } from 'mongodb';
import 'mocha';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test api clothes', () => {
    const name: string = "test"
    const photoName: string = "test";
    const urlForBuy: string = "test";
    let _id: ObjectID;

    it('post', () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/clothes').send({
            name,
            photoName,
            urlForBuy
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data.name).to.eql(name);
                chai.expect(res.body.data.photoName).to.eql(photoName);
                chai.expect(res.body.data.urlForBuy).to.eql(urlForBuy);
                _id = res.body.data._id;
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('get', () => {
        return chai.request('http://' + server +':' + port + '/api').get('/v1/clothes/' + _id).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data.name).to.eql(name);
                chai.expect(res.body.data.photoName).to.eql(photoName);
                chai.expect(res.body.data.urlForBuy).to.eql(urlForBuy);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('put', () => {
        return chai.request('http://' + server +':' + port + '/api').put('/v1/clothes').send({
            id: _id,
            name,
            photoName,
            urlForBuy
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.eql(true);
            } else {
                chai.expect(res.body).to.not.eql(false);
            }
        });
    });

    it('delete', () => {
        return chai.request('http://' + server +':' + port + '/api').delete('/v1/clothes/' + _id).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.eql(true);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });
});
