import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test api clothes', () => {
    const name: string = "test"
    const photoName: string = "test";
    const urlForBuy: string = "test";

    it('should return response on call', () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/clothes').send({
            name,
            photoName,
            urlForBuy
        }).then(res => {
            chai.expect(res.status).to.eql(200);
        });
    });
});
