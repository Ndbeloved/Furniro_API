import express from "express"
const router = express.Router()
import multer from "multer"
import { uploadImage } from "../Service/uploadImage.js"
import ItemModel from "../models/itemModel.js"

const storage = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

//setting multer for image upload
const upload = multer({storage: storage})

router.post('/upload', upload.array('images'), async(req, res)=>{
    try{
        const urls = []
        const files = req.files
        const {title, subtitle, descr, price, discount} = req.body
        const uploadedFiles = files.map(async(file)=>{
            const imageUrl = await uploadImage(file.path)
            console.log(imageUrl)
            urls.push(imageUrl)
        })

        await Promise.all(uploadedFiles)

        //saving item to db
        const item = new ItemModel({
            title,
            subtitle,
            descr,
            price,
            discount,
            images: urls
        })
        await item.save()
        res.status(200).json({item: item})
    }
    catch(err){
        console.log('error trying to upload: ', err)
        res.status(500).json({"message": "error trying to upload"})
    }
})

export default router