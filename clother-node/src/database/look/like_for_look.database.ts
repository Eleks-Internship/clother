import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import GetListByKeys from "../../interface/class/get_list_by_key";
import LikeForLook from "../../interface/object/like_for_look";
import { dbLook } from '../database_info';
import DatabaseObject from "../database_object";

export default class LikeForLookDatabase extends DatabaseObject<LikeForLook> implements Create<LikeForLook>, GetListByKeys<LikeForLook> {

    constructor(collection: string = 'like-for-look') {
        super({ database: dbLook, collection });
    }

    public create(info: { look: { _id: ObjectID }, user: { _id: ObjectID }}): Promise<LikeForLook | null> {
        return super.create(info);
    }

    public getListByKeys(info: object): Promise<LikeForLook[]> {
        return super.getListByKeys(info);
    }
}