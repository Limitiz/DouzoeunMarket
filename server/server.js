const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;


app.use(cors({ origin: ['http://localhost:3000', '*'] }));

app.get("/", (req, res)=>{
     res.send({name:"jiyoung"});
 });

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})