/**
 * @swagger
 * components:
 *   schemas:
 *     Train:
 *       type: object
 *       required:
 *         - trainNumber
 *         - seatsNumber
 *         - status
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: Number
 *           description: The id of train - Auto increment
 *         trainNumber:
 *           type: string
 *           description: The train number of train
 *         seatsNumber:
 *           type: string
 *           description: The seats number of train
 *         status:
 *           type: string
 *           description: The status of train
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Whether you create the train
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Whether you update the train
 *       example:
 *         id: 1
 *         trainNumber: The New Turing Omnibus
 *         seatsNumber: Alexander K. Dewdney
 *         status: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 *     Admin:
 *       type: object
 *       required:
 *         - trainNumber
 *         - seatsNumber
 *         - status
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: Number
 *           description: The id of train - Auto increment
 *         trainNumber:
 *           type: string
 *           description: The train number of train
 *         seatsNumber:
 *           type: string
 *           description: The seats number of train
 *         status:
 *           type: string
 *           description: The status of train
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Whether you create the train
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Whether you update the train
 *       example:
 *         id: 1
 *         trainNumber: The New Turing Omnibus
 *         seatsNumber: Alexander K. Dewdney
 *         status: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */