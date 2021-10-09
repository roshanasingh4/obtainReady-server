const uploadModel = require("../models/uploadModel");
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCtrl = {
  newUpload: async (req, res) => {
    const { name, edition, category, date, description } = req.body;
    const userId = req.user.id;
    // extract the file path from the request
    const url = [];
    const file = req.files;
    const path = file.file.tempFilePath;
    console.log(path);
    cloudinary.v2.uploader.upload(
      path,
      {
        folder: "uploads",
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        const srcLink = result.secure_url;
        url.push(srcLink);
        // make sure all images are uploaded
        //create new campaign
        const newUpload = new uploadModel({
          name,
          edition,
          category,
          date,
          description,
          userid: userId,
          file: url,
        });
        //save the campaign
        newUpload.save((err, upload) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({
            message: "upload successful",
          });
        });

        removeTmp(path);
      }
    );
  },
  //get all uploads by user
  getUploads: async (req, res) => {
    const userId = req.user.id;
    uploadModel.find({ userid: userId }, (err, uploads) => {
      if (err) {
        console.log(err);
      }
      //send only the file url
      const uploadsUrl = uploads.map((upload) => {
        return upload.file;
      });
      res.status(200).json({
        uploads: uploadsUrl,
      });
    });
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadCtrl;
