import { expect } from 'chai';

import LoginService from '../../../src/services/auth/login.service';

describe('Test service password', () => {
    const firstName: string = 'firstName';
    const lastName: string = 'lastName';
    const email: string = 'email@email.com';
    const password: string = 'password';

    it('hash password', async () => {
        const loginService: LoginService = new LoginService("user-test");
        const token: string = await loginService.getTokenAfterCreateUser({ firstName, lastName, email, password });
        expect(token).to.not.eql(null);
        expect(token).to.not.eql('');
        expect(token).to.be.a('string');
    });
});