const express = require("express");
const router = express.Router();
const controller = require('../control/UserController');
const multer = require("multer");
const verifyToken = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/get", verifyToken, controller.getUser);
router.get("/get/:id", verifyToken, controller.getUserById);
router.post("/add", controller.createUser);
router.delete("/delete/:id", verifyToken, controller.deleteUser);
router.put("/update/:id", verifyToken, controller.updateUser);
router.get("/joinarray", verifyToken, controller.joinArrayElementUser);
router.post("/login", controller.loginUser);
router.post("/readdata", verifyToken, controller.readdata);
router.post("/writedata", verifyToken, controller.writedata);
router.post('/getxlsxdata', verifyToken, upload.single('file'), controller.getxlsxdata);
router.post("/downloadexcel", verifyToken, upload.single('file'), controller.downloadexcel);
router.post("/sendMail", verifyToken, controller.sendMail);
module.exports = router;