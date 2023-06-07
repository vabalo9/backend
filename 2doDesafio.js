const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.format = 'utf-8';
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, this.format);
      const dataObj = JSON.parse(data);
      console.log(dataObj)
      return dataObj;
    } catch (error) {
      console.log('No se encontraron productos');
      return [];
    }
  }

 

  async getProductById(IdBuscado) {
    const products = await this.getProducts();
    const productoBuscado = products.find((el) => el.id === IdBuscado);
    if (productoBuscado !== undefined) {
      return productoBuscado;
    } else {
      return "Not Found";
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const list = await this.getProducts();
    let ID;
    list.length === 0 ? ID = 1 : ID = list[list.length-1].id + 1;

    const product = { title, id: ID, description, price, thumbnail, code, stock };
    let codeDetector = list.find((el) => el.code === code);
    let propiedadVacia = true;

    for (let propiedad in product) {
      if (product.hasOwnProperty(propiedad)) {
        if (product[propiedad] === null || product[propiedad] === undefined || product[propiedad] === '') {
          console.log(`El producto ${product.title} no tiene todos los campos completos. Por favor, ingresa todos los campos correctamente para añadirlo a la lista.`);
          return (propiedadVacia = false);
        }
      }
    }

    if (codeDetector !== undefined) {
      console.log('¡Error! El código ya se encuentra presente en otro producto.');
    }

    if (codeDetector === undefined || propiedadVacia === false) {
      list.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(list));
    }
  }

  async updapteProduct(productoAEditar, NuevoPrecio, NuevoStock) {
     let productos = await this.getProducts();
    let prueba= await productos.findIndex(el=>el.id==productoAEditar)
    if (prueba==-1) {
      console.log(`No se encontro ningún producto con el id ${productoAEditar}`)
    } else {
    productos[prueba]={
      title: productos[prueba].title, id: productos[prueba].id, descipcion: productos[prueba].description, price:NuevoPrecio, thumbnail:productos[prueba].thumbnail, code:productos[prueba].code , stock:NuevoStock}
      await fs.promises.writeFile(this.path, JSON.stringify(productos));
    }
  }

  async deleteProduct(procuctoAEliminar){
    let productos = await this.getProducts();
    let evaluacion = productos.length
    let prueba= await productos.filter(el=>el.id != procuctoAEliminar )
    await fs.promises.writeFile(this.path, JSON.stringify(prueba));
    if (prueba.length < evaluacion) {
      console.log("Producto eliminado correctamente")
    }else{
      console.log("Por algun motivo no se pudo mencionar el producto solicitado")
    }
  }
}

const Manager = new ProductManager('product.json');



(async () => {
  


// await Manager.getProducts()
// await Manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
// await Manager.addProduct("producto 1", "Este es un producto prueba", 300, "Sin imagen", "abc2", 25);
// await Manager.addProduct("producto 2", "Este es un producto prueba", 400, "Sin imagen", "abc3", 25);
// await Manager.addProduct("producto 3", "Este es un producto prueba", 400, "Sin imagen", "abc4", 25);
// await Manager.getProducts()

// await Manager.getProductById(1)

// await Manager.updapteProduct(2,5000,27)
// await Manager.getProducts()

// await Manager.deleteProduct(1)

// await Manager.getProducts()

  
})();
