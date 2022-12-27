const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
require('dotenv').config()
const { MONGO_URL } = process.env

// ----------------  Connecting to testing server ---------------- //

mongoose.connect(MONGO_URL, (err) => {
    if (err) {
        console.log("error while connecting db", err)
    }
    else {
        console.log("connected with database")
    }
})