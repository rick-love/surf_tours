const fs = require('fs');
const express = require('express');
const port = 3000;
const app = express();

// Include Middleware to process Request from Client
app.use(express.json());

// Send JSON File to Server
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET - All Tours
app.get('/api/v1/tours', (req, res) => {
  // Send All Tours
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// GET - Tour by Id
app.get('/api/v1/tours/:id', (req, res) => {
  // Convert Id to number
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //   if(id > tours.length){
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// POST - New Tour
app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);

  //   Create Tour Id
  const newId = tours[tours.length - 1].id + 1;

  //   Create New Tour with Id
  const newTour = Object.assign({ id: newId }, req.body);

  //   Push to Array and Write to File
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Update Tour
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update Tour Data',
    },
  });
});

// Delete Tour
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});



app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
