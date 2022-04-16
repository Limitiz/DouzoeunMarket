import mysql from "mysql";
import fs from "fs";

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const pool = mysql.createPool(
  {
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,

    database: conf.database,
  },
  function (err, conn) {
    if (err) {
      console.log("접속실패 : ", err);
      return;
    }
    console.log("connect success");
  }
);
//conn.connect();

export default pool;
