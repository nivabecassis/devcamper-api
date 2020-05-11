const mongoose = require("mongoose");

const connectDB = async () => {
  const result = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`Mongo DB connected: ${result.connection.host}`.blue.bold);
};

module.exports = connectDB;
