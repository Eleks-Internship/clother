import { expect } from 'chai';

import ErrorService from '../../../src/services/server-info/error.service';
import Error from '../../../src/interface/object/error';
import CollectionDatabase from '../../../src/database/collection/collection.database';

describe('Test database error', () => {
    let info: string = "test"

    it('create', async () => {
        const errorService: ErrorService = new ErrorService("error-test");
        const error: Error | null = await errorService.create({ info });

        CollectionDatabase.deleteError();
        
        if (error) {
            expect(error.info).to.eql(info);
        } else {
            expect(error).to.not.eql(null);
        }
    });
});