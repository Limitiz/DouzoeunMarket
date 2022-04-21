import pool from "../db.js";

export default function DBConnect(sql, res) {
  try {
    pool.getConnection((err, connection) => {
      console.log("connection_pool GET");
      if (err) throw err;
      connection.query(sql, (err, result, fields) => {
        if (err) {
          console.error("connection_pool error");
          res.status(500).send("message : Internal Server Error");
        } else {
          if (result.length === 0) {
            res.status(400).send({
              success: false,
              message: "DB response Not Found",
            });
          } else {
            res.json(result);
            console.log(result);
          }
        }
      });
      connection.release(); // Connection Pool 반환
    });
  } catch (error) {
    console.error("connection_pool GET Error / " + err);
    res.status(500).send("message : Internal Server Error");
  }
}
