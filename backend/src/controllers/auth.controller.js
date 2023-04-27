const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const getDataService = require("../services/getData.services");
const insertDataService = require("../services/insertData.services");

const register = async (req, res, next) => {
  const { fullName, cccdNumber, email, password, phoneNumber, department, address, createdAt, updatedAt } = req.body;
  if (!fullName || !cccdNumber || !email || !password || !phoneNumber || !department || !address || !createdAt || !updatedAt) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Properties of admin is not enough",
      })
  }
  try {
    const isExisted = await getDataService.getMultipleRows("Admins", { "email": email })
    if (isExisted[0]) { // if email is existed 
      return res
        .status(400)
        .json({
          success: false,
          message: "Email is existed",
        })
    }

    // hash password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHashed = bcrypt.hashSync(password, salt);

    // data request
    const admin = {
      fullName,
      cccdNumber,
      email,
      password: passwordHashed,
      phoneNumber,
      department,
      address,
      createdAt,
      updatedAt
    }

    await insertDataService.createSingleRow('Admins', admin); // insert data into database
    
    const accessToken = jwt.sign( // generate access token
      {userId: adminExisted.id},
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: 'Register successfully',
        accessToken
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email and password required",
      })
  }

  try {
    const adminExisted = await getDataService.getMultipleRows("Admins", { "email": email });
    console.log('adminExisted', adminExisted);
    if (!adminExisted[0]) { // if email is not correct   
      return res
        .status(400)
        .json({
          success: false,
          message: "Email or password is not correct",
        })
    }
    const isPasswordValid = bcrypt.compareSync(password, adminExisted[0].password);
    if (!isPasswordValid) { // if password is not correct
      return res
        .status(400)
        .json({
          success: false,
          message: "Email or password is not correct",
        })
    }

    const accessToken = jwt.sign( // generate access token
      {userId: adminExisted.id},
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "Login successfully",
        accessToken
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
  register,
  login
}
