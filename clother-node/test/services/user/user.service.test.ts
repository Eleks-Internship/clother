import { expect } from 'chai';

import UserService from '../../../src/services/user/user.service';
import User from '../../../src/interface/object/user';

describe('Test service user', () => {
    const firstName: string = "firstName";
    const lastName: string = "lastName";
    const email: string = "email@email.com";
    const password: string = "password";

    it('create', async () => {
        const userService: UserService = new UserService("user-test");
        const user: User | null = await userService.create({ firstName, lastName, email, password });
        if (user) {
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.email).to.eql(email);
        } else {
            expect(user).to.not.eql(null);
        }
    })
});