import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import Delete from "../../interface/class/delete";
import GetListByKeys from "../../interface/class/get_list_by_key";
import LikeForLook from "../../interface/object/like_for_look";
import { dbLook } from '../database_info';
import DatabaseObject from "../database_object";

export default class LikeForLookDatabase extends DatabaseObject<LikeForLook> implements Create<LikeForLook>, GetListByKeys<LikeForLook>, Delete {

    constructor(collection: string = 'like-for-look') {
        super({ database: dbLook, collection });
    }

    public create(info: { look: { _id: ObjectID }, user: { _id: ObjectID }}): Promise<LikeForLook | null> {
        return super.create(info);
    }

    public getListByKeys(info: object): Promise<LikeForLook[]> {
        return super.getListByKeys(info);
    }

    public delete(_id: ObjectID): Promise<boolean> {
        return super.delete(_id);
    }
}