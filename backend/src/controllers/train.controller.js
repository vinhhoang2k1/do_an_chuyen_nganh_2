const getDataService = require("../services/getData.services");
const insertDataService = require("../services/insertData.services");

const createSingleTrain = async (req, res, next) => {
  const { trainNumber, seatsNumber, status, trainLineId, createdAt, updatedAt } = req.body;
  if (!trainNumber || !seatsNumber || !status || !trainLineId || !createdAt || !updatedAt) {
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
    const trains = await getDataService.getMultipleRows("Trains");
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


module.exports = {
  createSingleTrain,
  getAllTrain,
}
