const multer = require("multer")
const uuid4 = require("uuid4")

const DIR = "./uploads/community"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    // 파일 이름 설정
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid4() + '-' + fileName)
    }
});

const uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" 
           || file.mimetype == "image/jpg" 
           || file.mimetype == "image/jpeg"){
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = uploadImage