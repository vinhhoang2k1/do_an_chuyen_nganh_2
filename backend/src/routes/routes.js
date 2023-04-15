const trainRoutes = require("./train.routes");

function route(app) {
  app.use("/api/train", trainRoutes); // train routes

}

module.exports = route;