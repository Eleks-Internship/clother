import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import UserDatabase from '../../../src/database/user/user.database';
import User from '../../../src/interface/object/user';
import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test database user', () => {
    let firstName: string = "firstName";
    let lastName: string = "lastName";
    let email: string = "email@email.com";
    let password: string = "password";
    let _id: ObjectID;

    it('create', async () => {
        const userDatabase: UserDatabase = new UserDatabase("user-test");
        const user: User | null = await userDatabase.create({ firstName, lastName, email, password });
        if (user) {
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.email).to.eql(email);
            expect(user.password).to.eql(password);
            _id = user._id;
        } else {
            expect(user).to.not.eql(null);
        }
    });

    it('get', async () => {
        const userDatabase: UserDatabase = new UserDatabase("user-test");
        const user: User | null = await userDatabase.get(_id);
        if (user) {
            expect(user.firstName).to.eql(firstName);
            expect(user.lastName).to.eql(lastName);
            expect(user.email).to.eql(email);
            expect(user.password).to.eql(password);
        } else {
            expect(user).to.not.eql(null);
        }
    });

    it('get list', async () => {
        const userDatabase: UserDatabase = new UserDatabase("user-test");
        const userList: User[] = await userDatabase.getList();
        expect(userList.length).to.not.eql(0);
    });

    it('update', async () => {
        firstName = "fistNameUpdate"
        lastName = "lastNameUpdate";
        email = "emailUpdate@email.com";
        password = "passwordUpdate";

        const userDatabase: UserDatabase = new UserDatabase("user-test");

        CollectionDatabase.deleteUser();

        expect(await userDatabase.update({ _id, data: { firstName, lastName, email, password } })).eql(true);
    });
});