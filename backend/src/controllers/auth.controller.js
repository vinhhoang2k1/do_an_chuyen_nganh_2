const getDataService = require("../services/getData.services");

const register = async (req, res, next) => {
  const {usename, password} = req.body;
  const useExisted = await getDataService('User')
}