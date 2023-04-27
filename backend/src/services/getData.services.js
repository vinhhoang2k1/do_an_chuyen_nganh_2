const dbConfig = require("../configs/db.config");
const checker = require("../utils/checker");

const getData = (table, condition, limit) => {
  let sql = "";

  // get data without condition
  if (!condition || checker.isObjectEmpty(condition)) { 
    sql = `SELECT * FROM ${table}`;
  }

  // get data by condition
  else { 
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

  // result limit
  if(limit && typeof limit === "number") {
    sql += ` LIMIT ${limit}`;
  }
  
  // return a Promise
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
  getData
};

