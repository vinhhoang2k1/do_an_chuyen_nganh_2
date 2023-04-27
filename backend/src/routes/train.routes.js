const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller");
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @swagger
 * /api/train:
 *   post:
 *     summary: Create a new Train
 *     tags: [Trains API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: The list of the Trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.post("/", authMiddleware.verifyToken, trainController.createSingleTrain);

/**
 * @swagger
 * /api/train:
 *   get:
 *     summary: Lists all the Trains
 *     tags: [Trains API]
 *     responses:
 *       200:
 *         description: The list of the Trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get("/", authMiddleware.verifyToken, trainController.getAllTrain);

/**
 * @swagger
 * /api/train:
 *   put:
 *     summary: Update single Train
 *     tags: [Trains API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: The list of the Trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.put("/:id", authMiddleware.verifyToken, trainController.updateSingleTrain);

/**
 * @swagger
 * /api/train:
 *   delete:
 *     summary: Remove single Train
 *     tags: [Trains API]
 *     responses:
 *       200:
 *         description: The list of the Trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.delete("/:id", authMiddleware.verifyToken, trainController.deleteSingleTrain);

module.exports = router;