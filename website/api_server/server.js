const express = require('express');
const { swaggerDocument, swaggerUi } = require('./swagger');
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json()); // Middleware to parse JSON bodies

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// In-memory data store
let productCatalogs = [];

// CRUD operations for Product Catalog
app.get('/productCatalog', (req, res) => {
  res.status(200).json(productCatalogs);
});

app.post('/productCatalog', (req, res) => {
  const productCatalog = req.body;
  productCatalogs.push(productCatalog);
  res.status(201).json(productCatalog);
});

app.get('/productCatalog/:id', (req, res) => {
  const productCatalogId = req.params.id;
  const productCatalog = productCatalogs.find(pc => pc.id === productCatalogId);
  if (productCatalog) {
    res.status(200).json(productCatalog);
  } else {
    res.status(404).json({ message: 'Product catalog not found' });
  }
});

app.put('/productCatalog/:id', (req, res) => {
  const productCatalogId = req.params.id;
  const productCatalogIndex = productCatalogs.findIndex(pc => pc.id === productCatalogId);
  if (productCatalogIndex !== -1) {
    productCatalogs[productCatalogIndex] = req.body;
    res.status(200).json(productCatalogs[productCatalogIndex]);
  } else {
    res.status(404).json({ message: 'Product catalog not found' });
  }
});

app.delete('/productCatalog/:id', (req, res) => {
  const productCatalogId = req.params.id;
  const productCatalogIndex = productCatalogs.findIndex(pc => pc.id === productCatalogId);
  if (productCatalogIndex !== -1) {
    productCatalogs.splice(productCatalogIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product catalog not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
