import chai from 'chai';
import chaiHttp from 'chai-http';
import { ObjectID } from 'mongodb';
import 'mocha';
import fs from 'fs';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test api clothes', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    const name: string = "test";
    const urlForBuy: string = "test";
    let _id: ObjectID;

    it('post without image', () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/clothes')
        .send({
            name,
            urlForBuy,
            user: { _id: user._id.toHexString() }
        })
        .then(res => {
            chai.expect(res.status).to.eql(500);
            if (res.body) {
                chai.expect(res.body.data).to.be.null;
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    // it('post', () => {
    //     return chai.request('http://' + server +':' + port + '/api').post('/v1/clothes')
    //     .type('form')
    //     .attach('image', __dirname + '/../../image/recommendation/image.jpg', 'image.jpg')
    //     .field('name', name)
    //     .field('urlForBuy', urlForBuy)
    //     .field('user', user)
    //     .send({
    //         name,
    //         urlForBuy,
    //         user: { _id: user._id.toHexString() }
    //     })
    //     .then(res => {
    //         console.log(res.body);
    //         chai.expect(res.status).to.eql(200);
    //         if (res.body) {
    //             _id = res.body.data._id;
    //             chai.expect(res.body.data.name).to.eql(name);
    //             chai.expect(res.body.data.photoName).to.be.a('string');
    //             chai.expect(res.body.data.urlForBuy).to.eql(urlForBuy);
    //             chai.expect(res.body.data.infoOfClothes.length).to.not.eql(0);
    //             chai.expect(res.body.data.user.toString()).to.eql(user.toString());
    //         } else {
    //             chai.expect(res.body).to.not.eql(null);
    //         }
    //     });
    // });

    // it('get', () => {
    //     return chai.request('http://' + server +':' + port + '/api').get('/v1/clothes/' + _id).then(res => {
    //         chai.expect(res.status).to.eql(200);
    //         if (res.body) {
    //             chai.expect(res.body.data.name).to.eql(name);
    //             chai.expect(res.body.data.photoName).to.be.a('string');
    //             chai.expect(res.body.data.urlForBuy).to.eql(urlForBuy);
    //             chai.expect(res.body.data.infoOfClothes.length).to.not.eql(0);
    //             chai.expect(res.body.data.user.toString()).to.eql(user.toString());
    //         } else {
    //             chai.expect(res.body).to.not.eql(null);
    //         }
    //     });
    // });

    // it('put', () => {
    //     return chai.request('http://' + server +':' + port + '/api').put('/v1/clothes').send({
    //         id: _id,
    //         name,
    //         urlForBuy
    //     }).then(res => {
    //         chai.expect(res.status).to.eql(200);
    //         if (res.body) {
    //             chai.expect(res.body.data).to.eql(true);
    //         } else {
    //             chai.expect(res.body).to.not.eql(false);
    //         }
    //     });
    // });

    // it('delete', () => {
    //     return chai.request('http://' + server +':' + port + '/api').delete('/v1/clothes/' + _id).then(res => {
    //         chai.expect(res.status).to.eql(200);
    //         if (res.body) {
    //             chai.expect(res.body.data).to.eql(true);
    //         } else {
    //             chai.expect(res.body).to.not.eql(null);
    //         }
    //     });
    // });
});
