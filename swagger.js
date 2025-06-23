const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Node Js REST API With Postgressql",
        version: "1.0.0",
        description: "This Is A REST API Application Made With Node Js And PostgreSql.."
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};
const option = {
    swaggerDefinition,
    apis: ["./src/api-docs/*.yaml"]
};

const swaggerSpec = swaggerjsdoc(option);

module.exports = swaggerSpec;