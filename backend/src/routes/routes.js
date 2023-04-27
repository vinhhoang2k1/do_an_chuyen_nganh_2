const trainRoutes = require("./train.routes");
const authRoutes = require("./auth.routes");

function route(app) {
  app.use("/api/train", trainRoutes); // train routes

  app.use("/api/auth", authRoutes); // auth routes

}

module.exports = route;