import { expect } from 'chai';

import PasswordService from '../../../src/services/user/password.service';

describe('Test service password', () => {
    const password: string = "password";
    let passwordHash: string = '';

    it('hash password', async () => {
        const passwordService: PasswordService = new PasswordService(password);
        passwordHash = await passwordService.hashPassword();
        expect(passwordHash).to.not.eql(null);
        expect(passwordHash).to.not.eql('');
        expect(passwordHash).to.be.a('string');
    });

    it('verificate password', async () => {
        const passwordService: PasswordService = new PasswordService(password);
        const verificatePassword: boolean = await passwordService.verificatePassword(passwordHash);
        expect(verificatePassword).to.eql(true);
    });
});