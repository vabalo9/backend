class ProductManager {
    constructor(){
        this.products=[]
    }
  
    getProducts=()=>{
        return this.products
    }
    getProductByID =(IdBuscado)=>{  
    let productoBuscado=this.products.find(el=>el.id===IdBuscado)
    if (productoBuscado != undefined) {
       return productoBuscado
    } else { return "Not Found"}
    }
    addProduct=(title,description,price,thumbnail,code,stock)=>{
        let ID
        this.products.length==0 ? ID=1 : ID=this.products.length+1
        
        const product= {title, id:ID, description,price,thumbnail,code,stock }
         let CodeDetector= this.products.find(el=>el.code===code)
         let PropiedadVacia=true
         
             for (let propiedad in product) {
               if (product.hasOwnProperty(propiedad)) {
                 if (product[propiedad] === null || product[propiedad] === undefined || product[propiedad] === '') {
                     console.log(`El producto ${product.title} no tiene todos los campos completos, por favor ingresalo correctamente para añadirlo a la lista`)
                   
                   return PropiedadVacia=false
                 } 
               }
             }
             
             if (CodeDetector != undefined ) {
                console.log("Error!! el codigo ya se encuentra presente en otro producto")
             }
           
            
         if (CodeDetector === undefined || PropiedadVacia===false ) {
             this.products.push(product)
            }

            
        }
  }
  
  const Manager= new ProductManager
  

  Manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
  Manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)

  console.log(Manager.getProducts())


  
  
  
  
 
  
  