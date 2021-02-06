import { expect } from 'chai';

import UserService from '../../../src/services/user/user.service';
import User from '../../../src/interface/object/user';
import CollectionDatabase from '../../../src/database/collection/collection.database';
import { ObjectID } from 'mongodb';

describe('Test service user', () => {
    let firstName: string = "firstName";
    let lastName: string = "lastName";
    let email: string = "email3@email.com";
    let password: string = "password";
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

    it('get list', async () => {
        const userDatabase: UserService = new UserService("user-test");
        const userList: User[] = await userDatabase.getList();
        expect(userList.length).to.not.eql(0);
    });

    it('update', async () => {
        firstName = "fistNameUpdate"
        lastName = "lastNameUpdate";
        email = "emailUpdate@email.com";
        password = "passwordUpdate";

        const userService: UserService = new UserService("user-test");

        CollectionDatabase.deleteUser();

        expect(await userService.update({ _id, data: { firstName, lastName, email, password } })).eql(true);
    });
});