import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import LookService from '../../../src/services/look/look.service';
import Look from '../../../src/interface/object/look';
import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test service look', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    const name: string = "test"
    const clothes: { _id: ObjectID }[] = [{ _id: new ObjectID('6015a18c923e0e3b6442751c') }];

    it('create', async () => {
        const lookService: LookService = new LookService("look-test");
        const look: Look | null = await lookService.create({ name, clothes, user });

        CollectionDatabase.deleteUser();
        
        if (look) {
            expect(look.name).to.eql(name);
            expect(look.clothes).to.eql(clothes);
            expect(look.user).to.eql(user);
        } else {
            expect(clothes).to.not.eql(null);
        }
    });

    it('get list', async () => {
        const lookService: LookService = new LookService("look-test");
        const lookList: Look[] = await lookService.getList();

        CollectionDatabase.deleteUser();

        expect(lookList).to.not.eql(null);
        expect(lookList.length).to.not.eql(0);
        expect(lookList[0].name).to.eql(name);
        expect(lookList[0].clothes).to.eql(clothes);
        expect(lookList[0].user).to.eql(user);
    });
});