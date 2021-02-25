import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);

const server: string = process.env.SERVER || 'localhost';
const port: string | number = process.env.PORT || 3000;

describe('Test api like', () => {
    it('post like for look', () => {
        return chai.request('http://' + server +':' + port + '/api').get('/v1/like')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWQ1ZGRhMmNjOGY2MDVkYzNiMzVkYyIsImlhdCI6MTYxMzQwNjQ3MH0.SvWfDFCYL-27xF4ZP4VBkYvaD_uu14Od311ZOnb8-bQ')
        .then(res => {
            chai.expect(res.status).to.eql(200);
            if (res.body) {
                chai.expect(res.body.data).to.not.eql(null);
                chai.expect(res.body.data.length).to.not.eql(0);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });

    it('post like for look without auth', () => {
        return chai.request('http://' + server +':' + port + '/api').get('/v1/like').then(res => {
            chai.expect(res.status).to.eql(401);
            if (res.body) {
                chai.expect(res.body.data).to.eql(null);
            } else {
                chai.expect(res.body).to.not.eql(null);
            }
        });
    });
});
