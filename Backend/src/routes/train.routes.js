const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller");

router.post("/", trainController.createSingleTrain);
router.get("/", trainController.getAllTrain);

module.exports = router;