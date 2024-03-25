
import multer from "multer";
import path from "path"
//FILE STORAGE
const storage = multer.diskStorage({
    destination:function(request,file,cb){
        cb(null, "public/assets");
    },
    filename:function(request,file,cb){
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({storage});

export default upload;