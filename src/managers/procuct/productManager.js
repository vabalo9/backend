const fs = require("fs");

class ProductManager {
  //En caso de utilizar solo la clase directamente la ruta debe ser "../mock/products.json"
  static #path = "./mock/products.json";
  constructor() {
    this.products = [];
    ProductManager.#path;
  }

  _getNextId = () => {
    const count = this.products.length;
    const nextId = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextId;
  };

  addProduct = async (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) => {
    const products = await this.getProducts();

    try {
      const product = {
        id: this._getNextId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status: true,
      };

      if (products.find((product) => product.code === code)) {
        return console.log(
          `The product with code: ${product.code} already exists\n`
        );
      } else {
        products.push(product);
        await fs.promises.writeFile(
          ProductManager.#path,
          JSON.stringify(products, null, "\t")
        );

        return console.log(products);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  getProducts = async () => {
    try {
      const data = await fs.promises.readFile(ProductManager.#path, "utf-8");
      const products = JSON.parse(data);
      this.products = products;
      return products;
    } catch (err) {
      console.log("File not found");
      return [];
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    try {
      const itemId = Object.values(products).find(
        (product) => product.id === id
      );

      if (itemId === undefined) {
        console.log("Product does not exist");
        return "Product does not exist";
      } else {
        console.log(itemId);
        return itemId;
      }
    } catch (err) {
      return console.error(err);
    }
  };

  updateProduct = async (id, propsProduct) => {
    const products = await this.getProducts();
    try {
      const index = await products.findIndex((product) => product.id === id);

      if (index === -1) {
        return console.log(`Product with id: ${id} does not exist`);
      }
      if (
        propsProduct.hasOwnProperty("id") ||
        propsProduct.hasOwnProperty("code")
      ) {
        return console.log("Cannot update 'id' or 'code' property");
      }

      Object.assign(products[index], propsProduct);
      await fs.promises.writeFile(
        ProductManager.#path,
        JSON.stringify(products),
        "utf-8"
      );
      const updatedProduct = products[index];

      console.log(updatedProduct);
      return updatedProduct;
    } catch (err) {
      return console.error(err);
    }
  };

  deleteProduct = async (id) => {
    let products = await this.getProducts();
    try {
      const product = Object.values(products).find((product) => product.id === id);

      if (product) {
        products = products.filter((item) => item.id !== id);
        await fs.promises.writeFile(
          ProductManager.#path,
          JSON.stringify(products),
          "utf-8"
        );

        return console.log("Product removed");
      } else {
        return console.error("Product does not exist");
      }
    } catch (err) {
      return console.error(err);
    }
  };
}

module.exports = ProductManager;