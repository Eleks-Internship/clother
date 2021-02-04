import { expect } from 'chai';

import AuthService from '../../../src/services/auth/auth.service';

describe('Test service password', () => {
    let token: string = '';

    it('create token', async () => {
        const authService: AuthService = new AuthService();
        token = await authService.createToken('id');
        expect(token).to.not.eql(null);
        expect(token).to.not.eql('');
        expect(token).to.be.a('string');
    });
});