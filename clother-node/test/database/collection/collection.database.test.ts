import { expect } from 'chai';

import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test database collection', () => {
    it('delete user', async () => {
        expect(await CollectionDatabase.deleteUser()).to.eql(true);
    });

    it('delete error', async () => {
        expect(await CollectionDatabase.deleteError()).to.eql(true);
    });

    it('delete clothes', async () => {
        expect(await CollectionDatabase.deleteClothes()).to.eql(true);
    });

    it('delete look', async () => {
        expect(await CollectionDatabase.deleteLook()).to.eql(true);
    });
});