const router = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middleware/auth");

router.post("/newupload", auth, uploadCtrl.newUpload);
router.get("/getuploads", auth, uploadCtrl.getUploads);



module.exports = router;
