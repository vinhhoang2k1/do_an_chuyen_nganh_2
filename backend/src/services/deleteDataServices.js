const dbConfig = require("../configs/db.config");

const deleteSingleRow = (table, id) => {
  const sql = `DELETE FROM ${table} WHERE id=${id}`;
  console.log('sql delete: ', sql);
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
  deleteSingleRow
}