    const express = require("express");
    const ProductManager = require("./2doDesafio.js");
    const app = express();
    const productManager = new ProductManager('product.json');

    
    app.get("/products", async (req,res)=>{
        try{
            const products = await productManager.getProducts();
            const cantidad= req.query.limit
            if (cantidad) {
                let elementosBuscados = await products.slice(0,cantidad)
                res.send(elementosBuscados)
            }else{res.send(products)}
            
        }catch (err) {
            res.json(err);
            }
    })

    app.get("/products/:pid", async (req,res)=>{
        try{
        let id= Number(req.params.pid)
        const elementoBuscado = await productManager.getProductById(id)
        res.send(elementoBuscado)
    }catch (err) {
        res.json(err);
        }
    })
    

    app.listen(8080,()=>{
        console.log("Corriendo en el puerto 8080")
    })