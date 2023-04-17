const dbConfig = require("../configs/db.config");

const updateMultipleRow = (table, dataRow, id) => {
  let fields = Object.keys(dataRow); // keys of data object
  let values = Object.values(dataRow) // values of data object
  const countField = fields.length;
  let setDataStr = "";
  for(let i=0; i<countField; i++) {
    if(typeof values[i] === "string"){
      setDataStr += (`${fields[i]}="${values[i]}"` + ",");
    }
    else {
      setDataStr += (`${fields[i]}=${values[i]}` + ",");
    }
  } 
  setDataStr = setDataStr.slice(0, -1); // cut ',' in last string
  const sql = `UPDATE ${table} SET ${setDataStr} WHERE id=${id}`;
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
  updateMultipleRow
}