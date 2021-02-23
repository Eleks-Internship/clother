import { expect } from 'chai';

import LoginService from '../../../src/services/auth/login.service';
import CollectionDatabase from '../../../src/database/collection/collection.database';
import { ObjectID } from 'mongodb';

describe('Test service login', () => {
    const firstName: string = 'firstName';
    const lastName: string = 'lastName';
    const email: string = 'email@email.com';
    const password: string = 'password';

    it('get token after create user', async () => {
        const loginService: LoginService = new LoginService("user-test");

        const token: string = await loginService.getTokenAfterCreateUser({ firstName, lastName, email, password });
        expect(token).to.not.eql(null);
        expect(token).to.not.eql('');
        expect(token).to.be.a('string');
    });

    it('get token', async () => {
        const loginService: LoginService = new LoginService("user-test");

        const token: string = await loginService.getToken({ email, password });

        expect(token).to.not.eql(null);
        expect(token).to.not.eql('');
        expect(token).to.be.a('string');
    });

    it('get token by social media', async () => {
        const loginService: LoginService = new LoginService("user-test");

        const token: string = await loginService.getTokenBySocialMedia({ firstName, lastName, email });

        CollectionDatabase.deleteUser();

        expect(token).to.not.eql(null);
        expect(token).to.not.eql('');
        expect(token).to.be.a('string');
    });

    it('get id of user login', async () => {
        const loginService: LoginService = new LoginService("user-test");

        const userId: ObjectID | null = await loginService.getIdOfUserLogin({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWQ1ZGRhMmNjOGY2MDVkYzNiMzVkYyIsImlhdCI6MTYxMzQwNjQ3MH0.SvWfDFCYL-27xF4ZP4VBkYvaD_uu14Od311ZOnb8-bQ" });

        CollectionDatabase.deleteUser();

        expect(userId).to.not.eql(null);
        if (userId) {
            expect(userId.toString()).to.not.eql('');
        }
    });
});