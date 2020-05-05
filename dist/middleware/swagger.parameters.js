'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class SwaggerParameters {
    checkParameters() {
        return (req, res, next) => {
            if (!req.openapi || !req.openapi.schema || !req.openapi.schema.parameters) {
                next();
                return;
            }
            const swaggerParameters = Array();
            swaggerParameters.push(req);
            swaggerParameters.push(res);
            swaggerParameters.push(next);
            if (!lodash_1.isEmpty(req.body)) {
                swaggerParameters.push(req.body);
            }
            const parameters = req.openapi.schema.parameters;
            for (let i = 0; i < parameters.length; i++) {
                const parameter = parameters[i];
                if (parameter.in === 'query') {
                    swaggerParameters.push(req.query[parameter.name]);
                }
                else if (parameter.in === 'cookie') {
                    swaggerParameters.push(req.cookies[parameter.name]);
                }
                else if (parameter.in === 'header') {
                    swaggerParameters.push(req.headers[parameter.name]);
                }
            }
            req.openapi.swaggerParameters = swaggerParameters;
            next();
        };
    }
}
exports.SwaggerParameters = SwaggerParameters;
//# sourceMappingURL=swagger.parameters.js.map