import chai from 'chai';
import chaiHttp from 'chai-http';
import { ObjectID } from 'mongodb';
import 'mocha';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test api look', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    const name: string = "test"
    const clothesSend: { _id: string }[] = [{ _id: '6015a18c923e0e3b6442751c' }];
    const clothes: { _id: ObjectID }[] = [{ _id: new ObjectID('6015a18c923e0e3b6442751c') }];
    let _id: ObjectID;

    it('post', () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/looks').send({
            name,
            clothes: clothesSend,
            user: { _id: user._id.toString() }
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                _id = res.body.data._id;
                chai.expect(res.body.data.name).to.eql(name);
                chai.expect(res.body.data.clothes[0]._id.toString()).to.eql(clothes[0]._id.toString());
                chai.expect(res.body.data.user.toString()).to.eql(user.toString());
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('get list', () => {
        return chai.request('http://' + server +':' + port + '/api').get('/v1/looks').then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data.length).to.not.eql(0);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('like for look', () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/looks/602588ade94c1f37bfdda2dc/like')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWQ1ZGRhMmNjOGY2MDVkYzNiMzVkYyIsImlhdCI6MTYxMzQwNjQ3MH0.SvWfDFCYL-27xF4ZP4VBkYvaD_uu14Od311ZOnb8-bQ')
        .then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.not.eql(null);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('like for look without auth', () => {
        return chai.request('http://' + server +':' + port + '/api').post('/v1/looks/602588ade94c1f37bfdda2dc/like').then(res => {
            chai.expect(res.status).to.eql(401);
            if (res.body) {
                chai.expect(res.body.data).to.eql(null);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('put', () => {
        return chai.request('http://' + server +':' + port + '/api').put('/v1/clothes').send({
            id: _id,
            name,
            clothes
        }).then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.eql(true);
            } else {
                chai.expect(res.body).to.not.eql(false);
            }
        });
    });
});
