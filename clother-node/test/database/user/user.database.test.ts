import { expect } from 'chai';

import UserDatabase from '../../../src/database/user/user.database';
import User from '../../../src/interface/object/user';

describe('Test database user', () => {
    const firstName: string = "firstName";
    const lastName: string = "lastName";
    const email: string = "email@email.com";
    const password: string = "password";

    it('create', async () => {
        const userDatabase: UserDatabase = new UserDatabase("user-test");
        const user: User | null = await userDatabase.create({ firstName, lastName, email, password });
        if (user) {
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.email).to.eql(email);
            expect(user.password).to.eql(password);
        } else {
            expect(user).to.not.eql(null);
        }
    })
});