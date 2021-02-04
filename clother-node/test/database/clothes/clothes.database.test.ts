import { expect } from 'chai';
import { ObjectID } from 'mongodb';

import ClothesDatabase from '../../../src/database/clothes/clothes.database';
import Clothes from '../../../src/interface/object/clothes';

describe('Test database clothes', () => {
    const name: string = "test"
    const photoName: string = "test";
    const urlForBuy: string = "test";
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
});