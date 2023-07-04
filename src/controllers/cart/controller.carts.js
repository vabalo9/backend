const CartManager = require("../../managers/cart/cartManager");
const cartManager = new CartManager();
const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json("A new cart was created");
  } catch (err) {
    res.status(400).json({ error400: "Error creating cart" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;
  try {
    const update = await cartManager.updateCart(
      Number(cid),
      Number(pid),
      quantity
    );
    if (update) {
      res
        .status(200)
        .json(`The product ${pid} in cart ${cid} was successfully updated`);
    } else {
      res.status(404).json({ error404: "Not Found" });
    }
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.get("/:cid", async (req, res) => {
  let { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(Number(cid));
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ error404: "Not Found" });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    await cartManager.deleteCart(Number(cid));
    res.status(200).json(`Cart with id: ${cid} was removed`);
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

module.exports = router;