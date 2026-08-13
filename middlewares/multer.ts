import multer, { diskStorage, type FileFilterCallback } from "multer";
import path from "node:path";
import fs from "node:fs";
import type { Request } from "express";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const tempDirectory = path.join(process.cwd(), 'tmp');

if(!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory, {
        recursive: true
    });
}

const storageConfiguration = diskStorage({

    destination: (_req: Request, _file: any, cb: (error: Error | null, destination: string) => void) => cb(null, tempDirectory),

    filename: (_req: Request, file: any, cb: (error: Error | null, filename: string) => void) => {
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
    fileFilter(_req: Request, file: any, cb: typeof FileFilterCallback) {
        const allowed = ["image/jpeg", "image/png"];

        if(!allowed.includes(file.mimetype)) return cb(new Error("Only JPG, JPEG and PNG images are allowed."));

        cb(null, true);
    },
});

export default upload;
