Creating API for fake Surf Tour Company. This project will be a fullstack application to showcase for clients. 

Final goal is deployment to AWS, Lambda functionality, Payments, Authorization.


(13.02.2021)
Simple Routes
Get - All Tours - app.get('/api/v1/tours'
    Using 'v1' for API versioning which will enable new API versions to be deployed and identify which version is being used.

GET - Tour by Id
    Get Tour by Id by accessing req.params;

POST - New Tour
    Using app.use = express.json() to parse JSON data
    Important to remember is res.send can only be sent once; 'headers error' will indicate this mistake

    simple way to create a new Id 
    const newId = tours[tours.length -1].id + 1;

Patch and Delete Added but not functional till DB is added.

Creating Middleware : (req,res,next)
    Call Next() at the end of all Middleware is crucial to be able to move to next function in the stack and to send response.

    Middleware needs to be called before Route Handler to ensure Middleware is part of the Stack.

Adding Morgan Middleware to see request data in the console

Seperating Routes and Controllers

Router - Folder and router.js files for Tours and Users
routes/toursRouter.js
routes/usersRouter.js

    From App.js -> transfer all get/put/delete functions, to appropriate folders. Updating both files:
    const router = express.router();
    router.route('/').get(getAllTours).post(createTour);
    router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

    Export Router and then mount routers in app.js

Controller - move get/put/delete functions from router JS file to controller JS files and export each function seperately using exports.getAllUsers for example.
    Import Controller.js in Route.js and append to each function controller.functionName

Created new middleware to check body for name or Price values in json req.body. Added the middleware to the controller and router to keep things seperated.

Server JS / Config.env
Created the config file for storing variables and passwords

Added GitIgnore File and created a new git repository to track Changes


MongoDB - mongoose

In Mongo UI - Create Project, Database, and Collection. 
Add and Test DB connection string in server.js, then delete Collection in Mongo UI.

Using the MVC Pattern will need to create a models folder, add tourModel.js
In tourModel.js:
    Create a Schema for Tour data to be inserted into database

tourController.js:
    Require tourModel
    Refactor Creat Tour to use Async / Await
    Use a try / catch to create a new Tour
    Get All Tours
    .find()

    Get Tour By Id
    .findById(req.params.id)

Tour Model - 


Created Dev Data import script using the Command Line process.argv arguements:
node dev-data/data/import-dev-data.js --import
    if(process.argv[2] === '--import')
        importData();
node dev-data/data/import-dev-data.js --delete
    if(process-argv[2] === '--delete')
        deleteAllData();
