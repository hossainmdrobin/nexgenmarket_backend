const connectDatabase = require("./DataBase/ConnectDatabase");
const app = require("./app")
require("dotenv").config();

connectDatabase();

 app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port:${process.env.PORT}`);
});
