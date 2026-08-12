const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://maheswarid29_db_user:5422173@cluster0.no75xcx.mongodb.net/edutrack?appName=Cluster0");
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;