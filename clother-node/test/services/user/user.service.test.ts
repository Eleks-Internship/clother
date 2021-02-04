import { expect } from 'chai';

import UserService from '../../../src/services/user/user.service';
import User from '../../../src/interface/object/user';
import { ObjectID } from 'mongodb';

describe('Test service user', () => {
    const firstName: string = "firstName";
    const lastName: string = "lastName";
    const email: string = "email@email.com";
    const password: string = "password";
    let _id: ObjectID;

    it('create', async () => {
        const userService: UserService = new UserService("user-test");
        const user: User | null = await userService.create({ firstName, lastName, email, password });
        if (user) {
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.email).to.eql(email);
            _id = user._id;
        } else {
            expect(user).to.not.eql(null);
        }
    });

    it('get', async () => {
        const userDatabase: UserService = new UserService("user-test");
        const user: User | null = await userDatabase.get(_id);
        if (user) {
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.email).to.eql(email);
        } else {
            expect(user).to.not.eql(null);
        }
    });
});