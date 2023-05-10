const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const authMiddleware = require("../middlewares/auth.middleware")

/**
 * @swagger
 * tags:
 *   name: Schedule API
 *   description: Thêm sửa xoá Schedule
 */

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Create single Schedule
 *     tags: [Schedule API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedules'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create single Schedule successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Schedules'
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware.verifyToken, scheduleController.createSingleSchedule);

/**
 * @swagger
 * /api/schedule:
 *   get:
 *     summary: Get all Schedule
 *     tags: [Schedule API]
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
 *                 $ref: '#/components/schemas/Schedules'
 */
router.get("/", authMiddleware.verifyToken, scheduleController.getAllScheduleAfterJoinTables);

/**
 * @swagger
 * /api/schedule/{id}:
 *   get:
 *     summary: Get Schedule by id
 *     tags: [Schedule API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Schedule id
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
 *                 $ref: '#/components/schemas/Schedules'
 */
router.get("/:id", authMiddleware.verifyToken, scheduleController.getScheduleById);

/**
 * @swagger
 * /api/schedule/{id}:
 *   put:
 *     summary: Update Schedule by id
 *     tags: [Schedule API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Schedule id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedules'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update train successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Schedules'
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware.verifyToken, scheduleController.updateSingleSchedule);

/**
 * @swagger
 * /api/schedule/{id}:
 *   delete:
 *     summary: Remove Schedule by id
 *     tags: [Schedule API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Schedule id
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Schedules'
 */
router.delete("/:id", authMiddleware.verifyToken, scheduleController.deleteSingleSchedule);

module.exports = router;