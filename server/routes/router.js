const express = require("express");
const router = new express.Router();
const multer = require("multer");
const moment = require("moment");
const connection = require("../db/connection");

//image configuration
var imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

//image filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only image files are allowed"));
  }
};

var upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

//get image data
router.post("/upload", upload.single("photo"), (req, res) => {
  const photo = req.file;
  const { title } = req.body;
  // console.log(photo);

  if (!title || !photo) {
    res.status(422).json({ message: "Please fill all the feild" });
  }

  try {
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    connection.query(
      "INSERT INTO photo SET ?",
      { title: title, image: photo.filename, date: date },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(result);
          res.status(201).json({ message: "data added", data: req.body });
        }
      }
    );
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

// get image data
router.get("/getdata", (req, res) => {
  try {
    connection.query("SELECT * FROM photo", (err, result) => {
      if (err) {
        console.log("error");
      } else {
        // console.log(result);
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

// delete image
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  try {
    connection.query(`DELETE FROM photo WHERE id ='${id}'`, (err, result) => {
      if (err) {
        console.log("error");
      } else {
        console.log("data delete");
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ status: 422, error });
  }
});

module.exports = router;
