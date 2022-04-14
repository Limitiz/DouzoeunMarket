import cors from 'cors';
import express from 'express';
import mysql from 'mysql';
import fs from 'fs';
import mybatisMapper from 'mybatis-mapper';
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

//db 접속
const conn = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
}, function(err, conn){

    if(err){
        console.log('접속실패 : ', err);
        return;
    }
    console.log('connect success');
});
conn.connect();


//홈화면에 user가 출력되는지 확인
app.get("/", (req, res)=>{
    conn.query(
         "select * from user",
         (err, rows, fields) => {
             res.send(rows);
         }
    );
 });

app.listen(port, ()=>console.log(`server is running on ${port}`));