import { ObjectID } from "mongodb";
import ClothesDatabase from "../../database/clothes/clothes.database";
import Create from "../../interface/class/create";
import Get from "../../interface/class/get";
import Clothes from "../../interface/object/clothes";

export default class ClothesService implements Create<Clothes>, Get<Clothes> {
    private readonly clothesDatabase: ClothesDatabase;

    constructor(collection: string = "clothes") {
        this.clothesDatabase = new ClothesDatabase(collection);
    }

    public async create(info: { name: string, photoName: string, urlForBuy: string }): Promise<Clothes | null> {
        return this.clothesDatabase.create(info);
    }

    public async get(_id: ObjectID): Promise<Clothes | null> {
        return this.clothesDatabase.get(_id);
    }
}