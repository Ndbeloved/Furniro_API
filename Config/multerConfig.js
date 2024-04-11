import multer from "multer"

const multerConf = function(){
    //setting multer for image upload
    const storage = multer.diskStorage({
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    })

    const upload = multer({storage: storage})
}

export {multerConf}