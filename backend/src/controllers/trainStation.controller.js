const getdataService = require("../services/getData.services");
const insertDataService = require("../services/insertData.services");
const updateDataService = require("../services/updateData.services");
const deleteDataService = require("../services/deleteDataServices");

const createSingleTrainStation = async (req, res, next) => {
  const { stationName, stationPlace, createdAt, updatedAt } = req.body;
  if (!stationName || !stationPlace || !createdAt || !updatedAt) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Properties of train station is not enough",
      })
  }
  try {
    const trainStation = req.body;
    await insertDataService.createSingleRow('Trainstations', trainStation);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Create single train station successfully',
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

const getAllTrainStation = async (req, res, next) => {
  try {
    const trains = await getdataService.getData("Trainstations");
    return res
      .status(200)
      .json({
        success: true,
        message: 'Get all train station successfully',
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

const updateSingleTrainStation = async (req, res, next) => {
  try {
    const dataUpdated = req.body;
    const id = req.params.id;
    await updateDataService.updateMultipleRow('Trainstations', dataUpdated, id);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Train station is updated',
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

const deleteSingleTrainStation = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDataService.deleteSingleRow('Trainstations', id);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Train station is removed',
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
  createSingleTrainStation,
  getAllTrainStation,
  updateSingleTrainStation,
  deleteSingleTrainStation
}
