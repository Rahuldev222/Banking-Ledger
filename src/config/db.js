// db.js databse js

const mongoose = require("mongoose")
// mongoose aa gya ab agge isi se sab process hoga

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("server is connected to db")
    })
    .catch((err) => {
      console.log("error wile connecting to db: ", err)
      process.exit(1) // bina db se connect hus sirf server run hoota rhega to server bhi band hona jaruri hai wrna woo resourse khata rhega per kooi faydaa nahi hooga
    })
}

module.exports = connectToDB
// export hus function to import huaa serevr.js me
