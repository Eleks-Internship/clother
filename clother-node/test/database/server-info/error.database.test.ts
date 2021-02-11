import { expect } from 'chai';

import ErrorDatabase from '../../../src/database/server-info/error.database';
import Error from '../../../src/interface/object/error';
import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test database error', () => {
    let info: string = "test"

    it('create', async () => {
        const errorDatabase: ErrorDatabase = new ErrorDatabase("error-test");
        const error: Error | null = await errorDatabase.create({ info });

        CollectionDatabase.deleteError();
        
        if (error) {
            expect(error.info).to.eql(info);
        } else {
            expect(error).to.not.eql(null);
        }
    });
});