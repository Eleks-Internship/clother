import winston from 'winston';

import LogService from './log.service';

export default class LogWithDatabaseService extends LogService {
    constructor() {
        super();
    }

    public logInfo(info: { message: string }): boolean {
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));

            this.logger.log({
                level: 'info',
                message: info.message
            });

            return true;
        }
        return false;
    }

    public logError(info: { message: object }): boolean {
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));

            this.logger.log('error', 'error', { message: info.message });

            return true;
        }
        return false;
    }
}