// import fs, { readFile } from 'fs';
const fs = require ("fs")

const readFile = async(path)=>{
    const productsDocument = await fs.promises.readFile(path);
    const productsJSON = JSON.parse(productsDocument);
    return productsJSON;
}
class ProductManager {
  constructor(path) {
    this.id = 0;

    this.path = path;
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    if (title && description && price && thumbnail && code && stock != undefined) {
      if (productsJSON.products.find((product) => product.code === code)) {
        return console.log('Error al agregar el producto, el producto ya esta en el arreglo');
      } else {
        this.id = productsJSON.products.length;
        const product = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: this.id,
        };
        productsJSON.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productsJSON));
        console.log('El producto se agrego al arreglo correctamente');
      }
    } else {
      return console.log('Error al agregar el producto, hubo parametros sin completar');
    }
  }
  async getProducts() {
    const data = await readFile(this.path)
    return data
  }
  getProductsById = async(id)=>{
    const {productsDocument} = await readFile (this.path);
    console.log (productsDocument)
    const productId = productsDocument.find((product)=>product.id === id)
    // if (productId){
    //     return productId
    // }else{
    //     return null
    // }
    // this.productsDocument = productsDocument;
    // let product = this.productsDocument.find((element)=>element.id===id);
    // if (product){
    //   return product;
    // }else{
    //   console.log("No se encuentra el producto con ese id")
    //   return null;
    // }

  }
//   getProductById = async(id) => { 
//     if (fs.existsSync(`./products.json`)) {
//         const objects = await JSON.parse(fs.readFileSync(this.path));
        
//         let idToSearch = (element) => element.id === id;
//         let position = await objects.products.findIndex(idToSearch);
//         if (position == -1) {
//           return "No se encuentra ningún producto con ese ID"
//         } else {
//           return objects[position];
//         }
//     } else {
//         console.log("No se encontró el archivo");
//         }
//     }
  // async getProductById(id) {
    // const productsDocument = await fs.promises.readFile(this.path);
    // const productsJSON = JSON.parse(productsDocument);
    // let position = await productsJSON.findIndex((Element)=>Element.id===id)
    // return productsJSON[position];
    // productsJSON.product.find((product) => product.id === id)
    //   ? console.log(
    //       `Este es el producto con el ID ${id}`,
    //       productsJSON.products.filter((product) => product.id === id)
    //     )
    //   : console.log('Error Not Found');
  // }
  async updateProducts(id, object) {
    if (id || object != undefined) {
      const productsDocument = await readFile(this.path);
      if (productsJSON.products.find((product) => product.id === id)) {
        let productIndex = productsJSON.products.findIndex((product) => product.id === id);
        let productFilter = productsJSON.products.filter((product) => product.id === id);
        productFilter = { ...productFilter[0], ...object };
        productsJSON.product.splice(productIndex, 1, productFilter);
        await fs.promises.writeFile(this.path, JSON.stringify(productsJSON));
        console.log('El producto fue actualizado correctamente');
      } else {
        return console.log('No se encontro el producto con el id ingresado');
      }
    } else {
      return console.log('Error al actualizar producto, hubo parametros sin completar');
    }
  }

  async deleteProduct(id) {
    if (id != undefined) {
      const productsDocument = await readFile(this.path);
      if (productsDocument.products.find((product) => product.id === id)) {
        const productIndex = productsJSON.products.findIndex((product) => product.id === id);
        productsDocument.products.splice(productIndex, 1);
        productsDocument.products.forEach((product) => product.id--);
        await fs.promises.writeFile(this.path, JSON.stringify(productsJSON));
        console.log('Producto Eliminado Exitosamente');
      }
    } else {
      return console.log('Error,hubo parametros sin completar');
    }
  }
}
module.exports = ProductManager;
// (async function Main() {
//   const pm = new ProductManager();
//   await fs.promises.writeFile('./products.json', JSON.stringify({ 'product': [] }));
//   // await pm.getProducts();
//   await pm.addProduct('producto prueba', 'este es un producto prueba', 200, 'Sin Imagen', 'abc365', 25);
//   await pm.getProducts();
//   await pm.getProductById(0);
//   await pm.updateProducts(0, {
//     price: 2000,
//     description: 'Este es un producto de prueba',
//   });
//   await pm.getProducts();
//   // await pm.deleteProduct(0);
//   await pm.getProducts();
// })();
