const dbConfig = require("../configs/db.config");

// format string sql
Array.prototype.toStringCustom = function () {
  let result = "";
  this.forEach((item, index) => {
    if(typeof this[index] === "string") {
      result += (`"${this[index]}"` + ",");
    }
    else {
      result += (this[index] + ",");
    }
  })
  result = result.slice(0, -1);
  return result;
}

const createSingleRow = (table, dataRow) => {
  let fields = Object.keys(dataRow); // keys of data object
  let values = Object.values(dataRow) // values of data object
  let fieldsToString = fields.toString(", ");
  let valuesToString = values.toStringCustom();

  const sql = `INSERT INTO ${table}(${fieldsToString}) VALUES (${valuesToString})`;
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
  createSingleRow
}
