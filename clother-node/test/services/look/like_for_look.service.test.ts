import { expect } from 'chai';
import { ObjectID } from "mongodb";
import LikeForLookService from '../../../src/services/look/like_for_look.service';
import LikeForLook from "../../../src/interface/object/like_for_look";

describe('Test service like for look', () => {
    const user: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };
    const look: { _id: ObjectID } = { _id: new ObjectID('6015a18c923e0e3b6442751c') };

    it('create', async () => {
        const likeForLookService: LikeForLookService = new LikeForLookService("like-for-look-test");
        const likeForLook: LikeForLook | null = await likeForLookService.create({ user, look });

        if (likeForLook) {
            expect(likeForLook.user).to.eql(user);
            expect(likeForLook.look).to.eql(look);
        } else {
            expect(likeForLook).to.not.eql(null);
        }
    });
});