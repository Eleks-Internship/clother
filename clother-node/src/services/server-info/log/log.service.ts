import winston from 'winston';

export default abstract class LogService {
    protected readonly logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'log/combined.log' }),
            ],
        });
    }

    public abstract logError(info: { message: object }): boolean;
}