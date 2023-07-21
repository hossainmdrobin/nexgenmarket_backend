const mongoose = require("mongoose");
const { getDB } = require("../config/config");

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const connectDatabase = () => {
  const DB = getDB();
  mongoose
    .connect(DB,config)
    .then(() => console.log(`Mongodb is connected:${DB}`))
    .catch((e) => console.log(e.message));
};

module.exports = connectDatabase;
