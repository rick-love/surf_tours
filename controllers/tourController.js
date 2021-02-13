const fs = require('fs');

// Send JSON File to Server
const tours = JSON.parse(
  // fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Tour ID : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id',
    });
  }
  next();
};

// Checks Body for Name nad Price
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failed',
      message: 'No Name or Price',
    });
  }
  next();
};

// GET - All Tours
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  // Send All Tours
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// GET - Tour by Id
exports.getTourById = (req, res) => {
  // Convert Id to number
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// POST - New Tour
exports.createTour = (req, res) => {
  //   console.log(req.body);

  //   Create Tour Id
  const newId = tours[tours.length - 1].id + 1;

  //   Create Tour with Id
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
};

// Update Tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update Tour Data',
    },
  });
};

// Delete Tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
