const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan =require("morgan");
const shopRouter = require("./routes/routes")
//IMPORTING ROUTERS FILE


const app = express();
app.use(express.static("uploads"));
app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ##########ROUTES############
//MEMBER ROUTES
app.get("/", (req, res) => 
{
  // const MONGODB_URI = getDB();
res.send(
  `<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by ItCo</p><p>Version: 0.1.5</p>
    
  </div>`,
)});

app.use("/",shopRouter);




module.exports = app;
