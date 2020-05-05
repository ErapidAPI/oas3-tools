'use strict';

import {isEmpty} from 'lodash';

export class SwaggerParameters {
    checkParameters() {
        return (req, res, next) => {
            if (!req.openapi || !req.openapi.schema || !req.openapi.schema.parameters) {
                next();
                return;
            }
            const swaggerParameters = Array<any>();

            swaggerParameters.push(req);
            swaggerParameters.push(res);
            swaggerParameters.push(next);

            if (!isEmpty(req.body)) {
                swaggerParameters.push(req.body);
            }

            const parameters = req.openapi.schema.parameters;
            for (let i = 0; i < parameters.length; i++) {
                const parameter = parameters[i];
                if (parameter.in === 'query') {
                  swaggerParameters.push(req.query[parameter.name]);
                } else if (parameter.in === 'cookie') {
                  swaggerParameters.push(req.cookies[parameter.name]);
                } else if (parameter.in === 'header') {
                  swaggerParameters.push(req.headers[parameter.name]);
                }
            }

            req.openapi.swaggerParameters = swaggerParameters;

            next();
        }
    }
}
