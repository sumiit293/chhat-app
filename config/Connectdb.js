const mongoose = require("mongoose");


const connectDB = async (db) => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("Mongo db connected sucessfully");
    } catch (error) {
        console.log(error);
        process.exit(1);

    }

}
module.exports = connectDB