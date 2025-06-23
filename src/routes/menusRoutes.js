const express = require("express");
const router = express.Router();
const controller = require('../control/menucontroller');

router.get("/get", controller.GetUser);
router.get("/get/:id", controller.GetUserById);
router.post("/add", controller.CreateUser);
router.delete("/delete/:id", controller.DeleteUser);
router.put("/update/:id", controller.UpdateUser);

module.exports = router;