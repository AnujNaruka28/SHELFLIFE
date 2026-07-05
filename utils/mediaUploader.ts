import { v2 as cloudinary, type UploadApiOptions } from "cloudinary";
import { unlinkSync } from "node:fs";


async function uploadToCloudinary({
    filePath,
    folderName,
    width,
    height
} : {
    filePath: string,
    folderName: string,
    width: number,
    height: number
}) : Promise<{
    secure_url: string,
    public_id: string
}> {

    try {
        
        const options: UploadApiOptions = {
            resource_type: "image",
            folder: folderName
        }

        if(width && height) {
            options.width = width;
            options.height = height;
        }
    
        const result = await cloudinary.uploader.upload(filePath, options);
                                      
        unlinkSync(filePath);
                                
        return { secure_url: result.secure_url, public_id: result.public_id};

    } catch (err) {
        unlinkSync(filePath);
        throw new Error(`Failed to upload media: ${err}`);
    }
  
}

async function deleteFromCloudinary(publicId: string) {
    
    if(!publicId) throw new Error("No file found");

    return cloudinary.uploader.destroy(publicId);

}

export {
    uploadToCloudinary,
    deleteFromCloudinary
}