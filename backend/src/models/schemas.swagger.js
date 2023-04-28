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
 *         trainNumber: NOR1
 *         seatsNumber: 200
 *         status: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 *     Admin:
 *       type: object
 *       required:
 *         - fullName
 *         - cccdNumber
 *         - email
 *         - password
 *         - phoneNumber
 *         - department
 *         - address
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: Number
 *           description: The id of Admin - Auto increment
 *         fullName:
 *           type: string
 *         cccdNumber:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         department:
 *           type: string
 *         address:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *       example:
 *         id: 1
 *         fullName: Pham Anh Tuan
 *         cccdNumber: 123456789
 *         email: admin@gmail.com
 *         password: $2b$10$UV6v2dSsMoVIgfD4dXKKu.jXyCauzMeLQX1WvvWKReCwGWXW0NdAC
 *         phoneNumber: 01239548
 *         department: makerting
 *         address: HN
 *         createdAt: 2023-04-17T02:37:03.000Z
 *         updatedAt: 2023-04-17T02:37:03.000Z
 *     Trainstation:
 *       type: object
 *       required:
 *         - stationName
 *         - stationPlace
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: Number
 *           description: The id of Admin - Auto increment
 *         stationName:
 *           type: string
 *         stationPlace:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *       example:
 *         id: 1
 *         stationName: Ha noi - Hai Phong
 *         stationPlace: Nam Tu Liem Ha Noi
 *         createdAt: 2023-04-17T02:37:03.000Z
 *         updatedAt: 2023-04-17T02:37:03.000Z
 *     Schedules:
 *       type: object
 *       required:
 *         - trainId
 *         - startStationId
 *         - endStationId
 *         - timeStart
 *         - timeRunning
 *         - timeBreak
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: Number
 *           description: The id of Admin - Auto increment
 *         trainId:
 *           type: string
 *         startStationId:
 *           type: string
 *         endStationId:
 *           type: string
 *         timeStart:
 *           type: string
 *         timeRunning:
 *           type: string
 *         timeBreak:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *           format: date
 *       example:
 *         id: 1
 *         trainId: 1
 *         startStationId: 1
 *         endStationId: 2
 *         timeStart: 2023-04-17T02:37:03.000Z
 *         timeRunning: 1.5
 *         timeBreak: 0.5
 *         createdAt: 2023-04-17T02:37:03.000Z
 *         updatedAt: 2023-04-17T02:37:03.000Z
 */