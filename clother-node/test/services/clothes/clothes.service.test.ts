import { expect } from 'chai';

import ClothesService from '../../../src/services/clothes/clothes.service';
import Clothes from '../../../src/interface/object/clothes';
import CollectionDatabase from '../../../src/database/collection/collection.database';
import { ObjectID } from 'mongodb';

describe('Test service clothes', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    let name: string = "test"
    let photoName: string = "test";
    let urlForBuy: string = "test";
    let infoOfClothes: { label: string, probability: string }[] = [{ label: "test", probability: "10" }];
    let _id: ObjectID;

    it('create', async () => {
        const clothesService: ClothesService = new ClothesService("clothes-test");
        const clothes: Clothes | null = await clothesService.create({ name, photoName, urlForBuy, infoOfClothes, user });
        if (clothes) {
            expect(clothes.name).to.eql(name);
            expect(clothes.photoName).to.eql(photoName);
            expect(clothes.urlForBuy).to.eql(urlForBuy);
            expect(clothes.infoOfClothes).to.eql(infoOfClothes);
            expect(clothes.user).to.eql(user);
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
            expect(clothes.infoOfClothes).to.eql(infoOfClothes);
            expect(clothes.user).to.eql(user);
        } else {
            expect(clothes).to.not.eql(null);
        }
    });



    it('users get list', async () => {
        const clothesService: ClothesService = new ClothesService("clothes-test");
        const clothesList: Clothes[] = await clothesService.getListOfUser({ user });

        expect(clothesList).to.not.eql(null);
        expect(clothesList.length).to.not.eql(0);
        expect(clothesList[0].name).to.eql(name);
        expect(clothesList[0].photoName).to.eql(photoName);
        expect(clothesList[0].urlForBuy).to.eql(urlForBuy);
        expect(clothesList[0].infoOfClothes).to.eql(infoOfClothes);
        expect(clothesList[0].user).to.eql(user);
    });

    it('update', async () => {
        name = "testUpdate"
        photoName = "testUpdate";
        urlForBuy = "testUpdate";

        const clothesService: ClothesService = new ClothesService("clothes-test");
        expect(await clothesService.update({ _id, data: { name, photoName, urlForBuy } })).eql(true);
    });

    it('delete', async () => {
        const clothesService: ClothesService = new ClothesService("clothes-test");

        CollectionDatabase.deleteClothes();

        expect(await clothesService.delete(_id)).to.eql(true);
    });
});