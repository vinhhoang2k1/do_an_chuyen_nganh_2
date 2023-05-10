const getdataService = require("../services/getData.services");
const insertDataService = require("../services/insertData.services");
const updateDataService = require("../services/updateData.services");
const deleteDataService = require("../services/deleteDataServices");

const createSingleSchedule= async (req, res, next) => {
  const {trainId, startStationId, endStationId, timeStart, timeRunning, timeBreak, createdAt, updatedAt} = req.body;
  if (!trainId || !startStationId || !endStationId || !timeStart || !timeRunning || !timeBreak || !createdAt || !updatedAt){       
    return res
      .status(400)
      .json({
        success: false,
        message: "Properties of schedule is not enough",
      })
  }
  try {
    const schedule = req.body;
    await insertDataService.createSingleRow('Schedules', schedule);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Create single schedule successfully',
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

const getAllSchedule = async (req, res, next) => {
  try {
    const schedules = await getdataService.getData("Schedules");
    return res
      .status(200)
      .json({
        success: true,
        message: 'Get all schedule successfully',
        results: schedules.length,
        schedules
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

const getAllScheduleAfterJoinTables = async (req, res, next) => {
  try {
    const schedules = await getdataService.getDataBySqlString(
      `select Schedules.id, Trains.trainNumber, startStation.stationName as "startStation", endStation.stationName as "endStation", Schedules.timeStart, Schedules.timeRunning, Schedules.timeBreak
      from Schedules 
      inner join Trains on Schedules.trainId = Trains.id
      inner join Trainstations as startStation on startStation.id = Schedules.startStationId
      inner join Trainstations as endStation on endStation.id  = Schedules.endStationId `
    )
    return res
      .status(200)
      .json({
        success: true,
        message: 'Get all schedule successfully',
        results: schedules.length,
        schedules
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

const getScheduleById = async (req, res, next) => {
  try {
    const scheduleid = req.params.id;
    const schedule = await getdataService.getData("Schedules", {"id": scheduleid});
    return res
      .status(200)
      .json({
        success: true,
        message: 'Get schedule by id successfully',
        schedule
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

const updateSingleSchedule = async (req, res, next) => {
  try {
    const dataUpdated = req.body;
    const id = req.params.id;
    await updateDataService.updateMultipleRow('Schedules', dataUpdated, id);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Schedule is updated',
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

const deleteSingleSchedule = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDataService.deleteSingleRow('Schedules', id);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Schedule is removed',
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
  createSingleSchedule,
  getAllSchedule,
  getAllScheduleAfterJoinTables,
  getScheduleById,
  updateSingleSchedule,
  deleteSingleSchedule
}
