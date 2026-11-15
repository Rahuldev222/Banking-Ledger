// import app from "./src/app" now it was converted into es module

require("dotenv").config()

const app = require("./src/app") // app.js se aya
const connectToDB = require("./src/config/db") // db.js se aaya config se

connectToDB() // function call hua yaha pe import hone ke bad
// connect krega agr error aya to stop our err mssg dega
app.listen(3000, () => {
  console.log("server is started on port 3000")
})
