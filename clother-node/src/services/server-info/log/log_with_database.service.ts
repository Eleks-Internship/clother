import winston from 'winston';

import ErrorService from '../error.service';
import LogService from './log.service';

export default class LogWithDatabaseService extends LogService {
    constructor() {
        super();
    }

    public logError(info: { message: object }): boolean {
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));

            this.logger.log('error', 'error', { message: info.message.toString() });

            const errorService: ErrorService = new ErrorService();
            errorService.create({ info: info.message.toString() });

            return true;
        }
        return false;
    }
}