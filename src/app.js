const express = require ('express');
const  ProductManager = require ("./ProductManagerdesafio2");
const server = express();
server.use(express.urlencoded({extended:true}))

const pm = new ProductManager('./src/products.json');
server.get('/products', async (req,res)=>{
    
    const limite = req.query.limit
    if (limite == undefined){
        let productos = await pm.getProducts();
        res.send(productos)
    }else{
        let productos = await pm.getProducts(limite);
        res.send(productos)
    }
})

server.get('/products/:pid', async (req,res)=>{

    const id = req.params.pid 
    let producto = await pm.getProductsById(id);
    if (producto == null){
        res.send("El producto no existe")
    }else{
        res.send(producto)
    }
})

server.listen(8080,()=>{
    console.log("Servidor Escuchando en el puerto 8080")
})