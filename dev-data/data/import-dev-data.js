const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config/.env' });

const DB = process.env.MONGO_URL.replace('<PASSWORD>', process.env.MONGO_PWD);

// Connect TO Databse
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to DB'));

//   READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data was successfully loaded');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted DB Data');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}
