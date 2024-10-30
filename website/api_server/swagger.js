const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const swaggerDocument = yaml.load(fs.readFileSync('./tmforum_product_catalog.yaml', 'utf8'));

module.exports = { swaggerDocument, swaggerUi };
