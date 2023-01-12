const multer = require ("multer")


const storage = multer.diskStorage({
    destination:(req,file,next)=>{

    }
})

module.exports = multer({storage})