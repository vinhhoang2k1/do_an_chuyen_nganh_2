const getdataService = require("../services/getData.services");
const insertDataService = require("../services/insertData.services");
const updateDataService = require("../services/updateData.services");
const deleteDataService = require("../services/deleteDataServices");

const createSingleTrain = async (req, res, next) => {
  const { trainNumber, seatsNumber, status, createdAt, updatedAt } = req.body;
  if (!trainNumber || !seatsNumber || !createdAt || !updatedAt 
    || typeof status === "undefined" || typeof status === "null") {
    return res
      .status(400)
      .json({
        success: false,
        message: "Properties of train is not enough",
      })
  }
  try {
    const train = req.body;
    await insertDataService.createSingleRow('Trains', train);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Create single train successfully',
      })

  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error: ' + error,
      })
  }

}

const getAllTrain = async (req, res, next) => {
  try {
    const trains = await getdataService.getData("Trains");
    return res
      .status(200)
      .json({
        success: true,
        message: 'Get all train successfully',
        results: trains.length,
        trains
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error: ' + error,
      })
  }
}

const getTrainById = async (req, res, next) => {
  try {
    const trainId = req.params.id;
    const train = await getdataService.getData("Trains", {"id": trainId});
    return res
      .status(200)
      .json({
        success: true,
        message: 'Get train by id successfully',
        train
      })
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error: ' + error,
      })
  }
}

const updateSingleTrain = async (req, res, next) => {
  try {
    const dataUpdated = req.body;
    const id = req.params.id;
    await updateDataService.updateMultipleRow('Trains', dataUpdated, id);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Train is updated',
      })

  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error: ' + error,
      })
  }

}

const deleteSingleTrain = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDataService.deleteSingleRow('Trains', id);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Train is removed',
      })

  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error: ' + error,
      })
  }

}

module.exports = {
  createSingleTrain,
  getAllTrain,
  getTrainById,
  updateSingleTrain,
  deleteSingleTrain
}
