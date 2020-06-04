const fs = require("fs");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config({ path: "./config/config.env" });
connectDb();

const Bootcamp = require("./models/Bootcamp");

// Read JSON data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const saveBootcamps = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Saved bootcamps".green.inverse);

    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const deleteBootcamps = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Deleted bootcamps".red.inverse);

    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

const dataInstruction = process.argv[2];
if (dataInstruction === "-i") {
  saveBootcamps();
} else if (dataInstruction === "-d") {
  deleteBootcamps();
}
