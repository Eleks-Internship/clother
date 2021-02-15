import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import LikeForLook from "../../interface/object/like_for_look";
import { dbLook } from '../database_info';
import DatabaseObject from "../database_object";

export default class LikeForLookDatabase extends DatabaseObject<LikeForLook> implements Create<LikeForLook> {

    constructor(collection: string = 'like-for-look') {
        super({ database: dbLook, collection });
    }

    public create(info: { look: { _id: ObjectID }, user: { _id: ObjectID }}): Promise<LikeForLook | null> {
        return super.create(info);
    }
}