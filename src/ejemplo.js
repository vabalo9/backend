const express = require("express");
const ProductManager = require("./2doDesafio.js");
const app = express();
const productManager = new ProductManager('product.json');


const port = 8080;

app.listen(port, (req, res) => {
console.log(`Server running at port: ${port}`);
});

app.get("/", (req, res) => {
res.json({
message:
  "Welcome, to access the products go to the route localhost:8080/products",
});
});

app.get("/products", async (req, res) => {
const { limit } = req.query;
try {
const products = await productManager.getProducts();
if (!limit) {
  res.json(products);
} else {
  const limitedProducts = products.slice(0, limit);
  res.json(limitedProducts);
}
} catch (err) {
res.json(err);
}
});

app.get("/products/:pid", async (req, res) => {
let { pid } = req.params;

try {
const product = await productManager.getProductById(Number(pid));
res.json(product);
} catch (err) {
res.json(err);
}
});