import { expect } from 'chai';

import ClothesService from '../../../src/services/clothes/clothes.service';
import Clothes from '../../../src/interface/object/clothes';
import { ObjectID } from 'mongodb';

describe('Test service clothes', () => {
    let name: string = "test"
    let photoName: string = "test";
    let urlForBuy: string = "test";
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

    it('update', async () => {
        name = "testUpdate"
        photoName = "testUpdate";
        urlForBuy = "testUpdate";

        const clothesService: ClothesService = new ClothesService("clothes-test");
        expect(await clothesService.update({ _id, data: { name, photoName, urlForBuy } })).eql(true);
    });
});