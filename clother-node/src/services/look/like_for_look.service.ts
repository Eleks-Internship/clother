import { ObjectID } from "mongodb";
import LikeForLookDatabase from "../../database/look/like_for_look.database";
import LikeForLook from "../../interface/object/like_for_look";

export default class LikeForLookService {
    private readonly likeForLookDatabase: LikeForLookDatabase;

    constructor(collection: string = 'like-for-look') {
        this.likeForLookDatabase  = new LikeForLookDatabase(collection);
    }

    public create(info: { look: { _id: ObjectID; }, user: { _id: ObjectID; }}): Promise<LikeForLook | null> {
        return this.likeForLookDatabase.create(info);
    }

    public getListByLook(info: { look: { _id: ObjectID; } }): Promise<LikeForLook[]> {
        return this.likeForLookDatabase.getListByKeys(info);
    }
}