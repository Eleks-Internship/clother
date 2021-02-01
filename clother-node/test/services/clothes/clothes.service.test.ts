import { expect } from 'chai';

import ClothesService from '../../../src/services/clothes/clothes.service';
import Clothes from '../../../src/interface/object/clothes';
import { ObjectID } from 'mongodb';

describe('Test service clothes', () => {
    const name: string = "test"
    const photoName: string = "test";
    const urlForBuy: string = "test";
    let _id: ObjectID;

    it('create', async () => {
        const clothesService: ClothesService = new ClothesService("clothes-test");
        const clothes: Clothes | null = await clothesService.create({ name, photoName, urlForBuy });
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
        const clothesService: ClothesService = new ClothesService("clothes-test");
        const clothes: Clothes | null = await clothesService.get(_id);
        if (clothes) {
            expect(clothes.name).to.eql(name);
            expect(clothes.photoName).to.eql(photoName);
            expect(clothes.urlForBuy).to.eql(urlForBuy);
        } else {
            expect(clothes).to.not.eql(null);
        }
    });
});