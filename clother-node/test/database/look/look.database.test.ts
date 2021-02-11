import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import LookDatabase from '../../../src/database/look/look.database';
import Look from '../../../src/interface/object/look';
import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test database look', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    const name: string = "test"
    const clothes: { _id: ObjectID }[] = [{ _id: new ObjectID('6015a18c923e0e3b6442751c') }];

    it('create', async () => {
        const lookDatabase: LookDatabase = new LookDatabase("look-test");
        const look: Look | null = await lookDatabase.create({ name, clothes, user });

        CollectionDatabase.deleteUser();

        if (look) {
            expect(look.name).to.eql(name);
            expect(look.clothes).to.eql(clothes);
            expect(look.user).to.eql(user);
        } else {
            expect(clothes).to.not.eql(null);
        }
    });
});