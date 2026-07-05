import multer, { diskStorage } from "multer";
import path from "node:path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storageConfiguration = diskStorage({

    destination: (_req, _file, cb) => cb(null, 'tmp/'),

    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
    }
});

const upload = multer({
    storage: storageConfiguration,
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter(_req, file, cb) {
        const allowed = ["image/jpeg", "image/png"];

        if(!allowed.includes(file.mimetype)) return cb(new Error("Only JPG, JPEG and PNG images are allowed."));

        cb(null, true);
    },
});

export default upload;
