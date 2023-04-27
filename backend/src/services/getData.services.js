const dbConfig = require("../configs/db.config");

const getMultipleRows = (table, condition) => {
  let sql = "";
  if (!condition) { // get data without condition
    sql = `SELECT * FROM ${table}`;
  }
  else { // get data with condition
    const fields = Object.keys(condition);
    const values = Object.values(condition);
    let conditionStr = "";
    for (let i = 0; i < fields.length; i++) {
      if (typeof values[i] === "string") {
        conditionStr += (`${fields[i]}="${values[i]}"` + ',');
      }
      else {
        conditionStr += (`${fields[i]}=${values[i]}` + ',');
      }
    }
    sql = `SELECT * FROM ${table} WHERE ${conditionStr}`;
    sql = sql.slice(0, -1);
  }
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
  getMultipleRows,
}
