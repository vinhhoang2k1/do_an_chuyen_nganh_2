const dbConfig = require("../configs/db.config");

const getMultipleRows = (table) => {
  const sql = `SELECT * FROM ${table}`;
  return new Promise((resolve, reject) => {
    dbConfig.query(sql, (err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  })
}

module.exports = {
  getMultipleRows
}
