import * as express from 'express';
export declare class ExpressAppConfig {
    private app;
    private definitionPath;
    private routingOptions;
    constructor(definitionPath: string, appOptions: any);
    addValidator(): void;
    configureLogger(loggerOptions: any): any;
    getApp(): express.Application;
}
