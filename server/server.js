const express = require('express');
require('./db/connection');
const cors = require('cors');
const router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads",express.static("./uploads"));
app.use(router);

app.get('/',(req,res)=>{
    res.send('<h2>Hello</h2>');
});

app.listen(5000,()=>{
    console.log("Server Started");
});