import multer from "multer";

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'resources/')
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
    }
})

const upload = multer({ storage: storage });

export default upload;