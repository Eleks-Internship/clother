import { ObjectID } from "mongodb";
import ClothesDatabase from "../../database/clothes/clothes.database";
import PhotoOfClothesDatabase from "../../database/file/photo_of_clothes.database";
import Delete from "../../interface/class/delete";
import Clothes from "../../interface/object/clothes";
import File from "../../interface/object/file";

export default class PhotoOfClothesService implements Delete {
    private photoOfClothesDatabase: PhotoOfClothesDatabase;

    constructor() {
        this.photoOfClothesDatabase = new PhotoOfClothesDatabase();
    }

    public async delete(_id: ObjectID): Promise<boolean> {
        const clothesDatabase: ClothesDatabase = new ClothesDatabase();
        const clothes: Clothes | null = await clothesDatabase.get(_id);

        if (!clothes) {
            return true;
        }

        const clothesFile: File | null = await this.photoOfClothesDatabase.get({ filename: clothes.photoName});

        if (!clothesFile) {
            return false;
        }

        const isDeleteChunk: boolean = await this.photoOfClothesDatabase.deleteChunk(new ObjectID(clothesFile._id));

        if (!isDeleteChunk) {
            return false;
        }

        return await this.photoOfClothesDatabase.deleteFile(new ObjectID(clothesFile._id));
    }
}