import { ObjectId } from "mongodb";
import Get from "../../interface/class/get";
import Image from "../../interface/object/image";
import DatabaseObject from "../database_object";

export default class ImageDatabase extends DatabaseObject<Image> implements Get<Image> {

    constructor() {
        super({ database: "images", collection: 'urlsave'});
    }
    
    public get(_id: ObjectId): Promise<Image | null> {
        return super.get(_id);
    }

}