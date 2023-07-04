const ProductManager = require("../../managers/product/productManager");
const productManager = new ProductManager();
const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const thumbnail = req.body.thumbnail || [];

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error400: "All fields are required" });
  }

  try {
    const products = await productManager.getProducts();
    if (products.find((product) => product.code === code)) {
      res
        .status(409)
        .json({ error409: `The product with code: ${code} already exists` });
    } else {
      await productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
      );
      res.status(201).json("Product created successfully");
    }
  } catch (err) {
    res.status(500).json({ error500: "Error creating product" });
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (!limit || limit < 1) {
      res.status(200).json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.status(206).json(limitedProducts);
    }
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.get("/:pid", async (req, res) => {
  let { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ error404: "Not Found" });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const props = req.body;
  try {
    const updatedProduct = await productManager.updateProduct(
      Number(pid),
      props
    );
    if (!updatedProduct) {
      res.status(404).json({ error404: `Product with id: ${pid} not found.` });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(Number(pid));
    res.status(200).json(`Product with id: ${pid} was removed`);
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

module.exports = router;