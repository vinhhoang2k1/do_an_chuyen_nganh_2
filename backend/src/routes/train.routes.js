const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller");

router.post("/", trainController.createSingleTrain);
router.get("/", trainController.getAllTrain);
router.put("/:id", trainController.updateSingleTrain);
router.delete("/:id", trainController.deleteSingleTrain);

module.exports = router;