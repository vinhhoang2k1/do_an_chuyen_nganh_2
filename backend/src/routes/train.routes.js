const express = require("express");
const router = express.Router();
const trainController = require("../controllers/train.controller");
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @swagger
 * tags:
 *   name: Train API
 *   description: Thêm sửa xoá Train
 */

/**
 * @swagger
 * /api/train:
 *   post:
 *     summary: Create single train
 *     tags: [Train API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create single train successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Train'
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware.verifyToken, trainController.createSingleTrain);

/**
 * @swagger
 * /api/train:
 *   get:
 *     summary: Get all train
 *     tags: [Train API]
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 */
router.get("/", authMiddleware.verifyToken, trainController.getAllTrain);

/**
 * @swagger
 * /api/train/{id}:
 *   get:
 *     summary: Get train by id
 *     tags: [Train API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train id
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 */
router.get("/:id", authMiddleware.verifyToken, trainController.getTrainById);

/**
 * @swagger
 * /api/train/{id}:
 *   put:
 *     summary: Update train by id
 *     tags: [Train API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update train successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Train'
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware.verifyToken, trainController.updateSingleTrain);

/**
 * @swagger
 * /api/train/{id}:
 *   delete:
 *     summary: Remove train by id
 *     tags: [Train API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train id
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Train'
 */
router.delete("/:id", authMiddleware.verifyToken, trainController.deleteSingleTrain);

module.exports = router;