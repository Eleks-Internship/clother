import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import ClothesDatabase from '../../../src/database/clothes/clothes.database';
import Clothes from '../../../src/interface/object/clothes';

describe('Test database clothes', () => {
    let name: string = "test"
    let photoName: string = "test";
    let urlForBuy: string = "test";
    let _id: ObjectID;

    it('create', async () => {
        const clothesDatabase: ClothesDatabase = new ClothesDatabase("clothes-test");
        const clothes: Clothes | null = await clothesDatabase.create({ name, photoName, urlForBuy });
        if (clothes) {
            expect(clothes.name).to.eql(name);
            expect(clothes.photoName).to.eql(photoName);
            expect(clothes.urlForBuy).to.eql(urlForBuy);
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
        } else {
            expect(clothes).to.not.eql(null);
        }
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
        expect(await clothesDatabase.delete(_id)).to.eql(true);
    });
});