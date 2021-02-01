import Create from "../../interface/class/create";
import Clothes from "../../interface/object/clothes";
import Database from "../database";
import { dbClothes } from "../database_info";

export default class ClothesDatabase extends Database<Clothes> implements Create<Clothes> {
    private static collection: string;

    constructor(collection: string = "clothes") {
        super({ database: dbClothes, collection });

        ClothesDatabase.collection = collection;
    }

    public create(info: { name: string, photoName: string, urlForBuy: string }): Promise<Clothes | null> {
        return super.create(info);
    }
}