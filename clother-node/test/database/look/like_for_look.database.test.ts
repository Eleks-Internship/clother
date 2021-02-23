import { expect } from 'chai';
import { ObjectID } from "mongodb";
import CollectionDatabase from '../../../src/database/collection/collection.database';
import LikeForLookDatabase from '../../../src/database/look/like_for_look.database';
import LikeForLook from "../../../src/interface/object/like_for_look";

describe('Test database like for look', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    const look: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };

    it('create', async () => {
        const likeForLookDatabase: LikeForLookDatabase = new LikeForLookDatabase("like-for-look-test");
        const likeForLook: LikeForLook | null = await likeForLookDatabase.create({ user, look });

        CollectionDatabase.deleteLook();

        if (likeForLook) {
            expect(likeForLook.user).to.eql(user);
            expect(likeForLook.look).to.eql(look);
        } else {
            expect(likeForLook).to.not.eql(null);
        }
    });
});