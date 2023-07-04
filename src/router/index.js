const productsController = require("../controllers/product/controller.products");
const cartsController = require("../controllers/cart/controller.carts");

const router = (app) => {
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);
};

module.exports = router;