
function route(app) {
  app.get('/', (req, res) => {
    return res.json({
      message: "Đồ án chuyên ngành 2 - BackEnd!"
    });
  });
}

module.exports = route;