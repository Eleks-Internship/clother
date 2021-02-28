import { ObjectID } from "mongodb";
import ClothesDatabase from "../../database/clothes/clothes.database";
import Create from "../../interface/class/create";
import Delete from "../../interface/class/delete";
import Get from "../../interface/class/get";
import GetListofUser from "../../interface/class/get_list_of_user";
import Update from "../../interface/class/update";
import Clothes from "../../interface/object/clothes";
import PhotoOfClothesService from "../file/photo_of_clothes.service";

export default class ClothesService implements Create<Clothes>, Get<Clothes>, GetListofUser<Clothes>, Update, Delete {
    private readonly clothesDatabase: ClothesDatabase;

    constructor(collection: string = "clothes") {
        this.clothesDatabase = new ClothesDatabase(collection);
    }

    public async create(info: { name: string, photoName: string, urlForBuy?: string, infoOfClothes?: { label: string, probability: string }[], user: { _id: ObjectID } }): Promise<Clothes | null> {
        return this.clothesDatabase.create(info);
    }

    public async get(_id: ObjectID): Promise<Clothes | null> {
        return this.clothesDatabase.get(_id);
    }

    public getListOfUser(info: { user: { _id: ObjectID } }): Promise<Clothes[]> {
        return this.clothesDatabase.getListOfUser(info);
    }

    public async update(info: { _id: ObjectID, data: { name: string, photoName: string, urlForBuy?: string } }): Promise<boolean> {
        return this.clothesDatabase.update(info);
    }

    public async delete(_id: ObjectID): Promise<boolean> {
        const photoOfClothesService: PhotoOfClothesService = new PhotoOfClothesService();
        const isDeleteFile = await photoOfClothesService.delete(_id);

        if (!isDeleteFile) {
            return false;
        }

        return this.clothesDatabase.delete(_id);
    }
}