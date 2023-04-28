const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Authen API
 *   description: Thêm sửa xoá Train
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     loginRequest:
 *       type: object
 *       required:
 *         - email
 *         - passowrd
 *       properties:
 *         email:
 *           type: string
 *         passowrd:
 *           type: string
 *       example:
 *         email: admin@gmail.com
 *         password: admin
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Admin register
 *     tags: [Authen API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin register successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Internal server error
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Authen API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginRequest'
 *     security: 
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin login successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/loginRequest'
 *       500:
 *         description: Internal server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/list:
 *   get:
 *     summary: Get all admin
 *     tags: [Authen API]
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
 *                 $ref: '#/components/schemas/Admin'
 */
router.get("/list", authMiddleware.verifyToken, authController.getAllAdmin);

module.exports = router;
