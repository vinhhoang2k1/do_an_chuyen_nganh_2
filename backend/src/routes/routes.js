const trainRoutes = require("./train.routes");
const trainStationRoutes = require("./trainStation.routes");
const scheduleRoutes = require("./schedule.routes");
const authRoutes = require("./auth.routes");
const swaggerDocs = require("../utils/swagger");

function route(app) {
  app.use("/api/train", trainRoutes); // train routes

  app.use("/api/train-station", trainStationRoutes); // train station routes
  
  app.use("/api/schedule", scheduleRoutes); // schedule routes

  app.use("/api/auth", authRoutes); // auth routes

  swaggerDocs(app); // api docs

}

module.exports = route;