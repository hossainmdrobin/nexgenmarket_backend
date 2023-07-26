const multer = require("multer");
// const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const upload = (folder) => {    
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folder,
            allowedFormats: ["jpg", "png", "jpeg","mp4"],
            resource_type: "auto",
            quality: 60,
            
        },
    });
    return multer({ storage: storage });
};


module.exports = upload;

// router.post(
//     "/file",
//     upload("photos").fields([{ name: "image", maxCount: 3,quality:60}]),
//     uploadSingleFileController
//   )
