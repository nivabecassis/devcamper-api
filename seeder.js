const fs = require("fs");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config({ path: "./config/config.env" });
connectDb();

const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

// Read JSON data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Course.create(courses);
    console.log("Imported data".green.inverse);

    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("Deleted data".red.inverse);

    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const dataInstruction = process.argv[2];
if (dataInstruction === "-i") {
  importData();
} else if (dataInstruction === "-d") {
  deleteData();
}
