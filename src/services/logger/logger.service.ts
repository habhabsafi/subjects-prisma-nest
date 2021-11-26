import { LoggerService, LogLevel } from "@nestjs/common";
const fs = require('fs')
import { join } from "path";

export class MyLogger implements LoggerService {
    log(message: any, ...optionalParams: any[]) {

        fs.appendFile(join(process.cwd(), 'logging.txt'),
            "\n" + message, err => {
                if (err) {
                    this.error(err)
                }
            })
    }
    error(message: any, ...optionalParams: any[]) {
        fs.appendFile(join(process.cwd(), 'logging-errors.txt'), message, err => {
        })
    }
    warn(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    debug?(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error("Method not implemented.");
    }

}