import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import ClothesDatabase from '../../../src/database/clothes/clothes.database';
import Clothes from '../../../src/interface/object/clothes';
import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test database clothes', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    let name: string = "test"
    let photoName: string = "test";
    let urlForBuy: string = "test";
    let _id: ObjectID;

    it('create', async () => {
        const clothesDatabase: ClothesDatabase = new ClothesDatabase("clothes-test");
        const clothes: Clothes | null = await clothesDatabase.create({ name, photoName, urlForBuy, user });
        if (clothes) {
            expect(clothes.name).to.eql(name);
            expect(clothes.photoName).to.eql(photoName);
            expect(clothes.urlForBuy).to.eql(urlForBuy);
            expect(clothes.user).to.eql(user);
            _id = clothes._id;
        } else {
            expect(clothes).to.not.eql(null);
        }
    });

    it('get', async () => {
        const clothesDatabase: ClothesDatabase = new ClothesDatabase("clothes-test");
        const clothes: Clothes | null = await clothesDatabase.get(_id);
        if (clothes) {
            expect(clothes.name).to.eql(name);
            expect(clothes.photoName).to.eql(photoName);
            expect(clothes.urlForBuy).to.eql(urlForBuy);
            expect(clothes.user).to.eql(user);
        } else {
            expect(clothes).to.not.eql(null);
        }
    });

    it('users get list', async () => {
        const clothesDatabase: ClothesDatabase = new ClothesDatabase("clothes-test");
        const clothesList: Clothes[] = await clothesDatabase.getListOfUser({ user });

        expect(clothesList).to.not.eql(null);
        expect(clothesList.length).to.not.eql(0);
        expect(clothesList[0].name).to.eql(name);
        expect(clothesList[0].photoName).to.eql(photoName);
        expect(clothesList[0].urlForBuy).to.eql(urlForBuy);
        expect(clothesList[0].user).to.eql(user);
    });

    it('update', async () => {
        name = "testUpdate"
        photoName = "testUpdate";
        urlForBuy = "testUpdate";

        const clothesDatabase: ClothesDatabase = new ClothesDatabase("clothes-test");
        expect(await clothesDatabase.update({ _id, data: { name, photoName, urlForBuy } })).eql(true);
    });

    it('delete', async () => {
        const clothesDatabase: ClothesDatabase = new ClothesDatabase("clothes-test");

        CollectionDatabase.deleteClothes();
        
        expect(await clothesDatabase.delete(_id)).to.eql(true);
    });
});