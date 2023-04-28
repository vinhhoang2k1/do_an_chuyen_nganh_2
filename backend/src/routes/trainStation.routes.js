const express = require("express");
const router = express.Router();
const trainStationController = require("../controllers/trainStation.controller");
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @swagger
 * tags:
 *   name: Train station API
 *   description: Thêm sửa xoá Train station
 */

/**
 * @swagger
 * /api/train-station:
 *   post:
 *     summary: Create single train station
 *     tags: [Train station API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trainstation'
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
router.post("/", authMiddleware.verifyToken, trainStationController.createSingleTrainStation);

/**
 * @swagger
 * /api/train-station:
 *   get:
 *     summary: Get all train station
 *     tags: [Train station API]
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
 *                 $ref: '#/components/schemas/Trainstation'
 */
router.get("/", authMiddleware.verifyToken, trainStationController.getAllTrainStation);

/**
 * @swagger
 * /api/train-station/{id}:
 *   get:
 *     summary: Get train station by id
 *     tags: [Train station API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train station id
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
 *                 $ref: '#/components/schemas/Trainstation'
 */
router.get("/:id", authMiddleware.verifyToken, trainStationController.getTrainStationById);

/**
 * @swagger
 * /api/train-station/{id}:
 *   put:
 *     summary: Update train station by id
 *     tags: [Train station API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train station id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trainstation'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update train station successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Trainstation'
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware.verifyToken, trainStationController.updateSingleTrainStation);

/**
 * @swagger
 * /api/train-station/{id}:
 *   delete:
 *     summary: Remove train station by id
 *     tags: [Train station API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Train station id
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Trainstation'
 */
router.delete("/:id", authMiddleware.verifyToken, trainStationController.deleteSingleTrainStation);

module.exports = router;