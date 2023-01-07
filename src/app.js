const express = require ('express');
const  ProductManager = require ("./ProductManagerdesafio2");
const server = express();
server.use(express.urlencoded({extended:true}))

const pm = new ProductManager('./src/products.json');
server.get('/products', async (req,res)=>{
    let productos = await pm.getProducts();
    const limite = req.query.limit
    // if (limite<productos.length){
    //     productos=productos.slice(0,limite)
    // }
    res.send({'products':productos})
})

server.get('/products/:pid', async (req,res)=>{

    const id = req.params.pid 
  
    let producto = await pm.getProductsById(id);
    if (producto == null){
        res.send("El producto no existe")
    }
    res.send(producto)
})

server.listen(8080,()=>{
    console.log("Servidor Escuchando en el puerto 8080")
})