const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

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



//   START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
