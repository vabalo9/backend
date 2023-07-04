const fs = require("fs");

const path = "./mock/carts.json";

class CartManager {
  //En caso de utilizar solo la clase directamente la ruta debe ser "../mock/carts.json"
  static #path = "./mock/carts.json";
  constructor() {
    this.carts = [];
    CartManager.#path;
  }

  _getNextId = () => {
    const count = this.carts.length;
    const nextId = count > 0 ? this.carts[count - 1].id + 1 : 1;

    return nextId;
  };

  createCart = async () => {
    const carts = await this.getCarts();

    try {
      const cart = {
        id: this._getNextId(),
        products: [],
      };

      carts.push(cart);
      await fs.promises.writeFile(
        CartManager.#path,
        JSON.stringify(carts, null, "\t")
      );
      return carts;
    } catch (err) {
      return console.log(err);
    }
  };

  getCarts = async () => {
    try {
      const data = await fs.promises.readFile(CartManager.#path, "utf-8");
      const carts = JSON.parse(data);
      this.carts = carts;
      return carts;
    } catch {
      console.log("File not found");
      return [];
    }
  };

  getCartById = async (idCart) => {
    const carts = await this.getCarts();
    try {
      const cartId = Object.values(carts).find((cart) => cart.id === idCart);

      if (cartId === undefined) {
        console.error("Cart does not exist");
        return "Cart does not exist";
      } else {
        console.log(cartId);
        return cartId;
      }
    } catch (err) {
      return console.error(err);
    }
  };

  updateCart = async (idCart, idProduct, quantity = 1) => {
    const carts = await this.getCarts();
    try {
      const cart = await carts.find((cart) => cart.id === idCart);
      if (cart === undefined) {
        return console.log(`Cart with id: ${idCart} does not exist`);
      }

      if (!cart.products) {
        cart.products = [];
        return console.log(`The cart does not have products`);
      }

      const productExist = cart.products.find(
        (product) => product.id === idProduct
      );
      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cart.products.push({
          id: idProduct,
          quantity,
        });
      }

      await fs.promises.writeFile(
        CartManager.#path,
        JSON.stringify(carts, null, "\t")
      );
      return cart;
    } catch (err) {
      return console.error(err);
    }
  };

  deleteCart = async (idCart) => {
    let carts = await this.getCarts();
    try {
      const cart = Object.values(carts).find((cart) => cart.id === idCart);
      if (cart) {
        carts = carts.filter((item) => item.id !== idCart);
        await fs.promises.writeFile(path, JSON.stringify(carts), "utf-8");

        return console.log("Cart removed");
      } else {
        return console.error("Cart does not exist");
      }
    } catch (err) {
      return console.error(err);
    }
  };
}

module.exports = CartManager;