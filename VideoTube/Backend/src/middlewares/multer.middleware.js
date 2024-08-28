// setting up a file upload configuration using the multer middleware in node.js application

import multer from "multer"; // multer is a popular middleware for handling file uploads in node.js application

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
// This middleware (upload) can now be used to handle file uploads in routes or controllers
export const upload = multer({ 
    storage, 
}) // middleware instance