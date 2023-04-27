const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/", authMiddleware.verifyToken, trainController.createSingleTrain);
router.get("/",authMiddleware.verifyToken, trainController.getAllTrain);
router.put("/:id",authMiddleware.verifyToken, trainController.updateSingleTrain);
router.delete("/:id",authMiddleware.verifyToken, trainController.deleteSingleTrain);

module.exports = router;