const formData = require("express-form-data");
const express = require('express');
const os = require("os");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cors = require('cors')
require('dotenv/config');
 

app.use(cors());
app.options('*', cors())

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('tiny'));
// app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
// Response to the backend calls
// app.use('/', express.static(__dirname + '/public/app'))

/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
 const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());


// Routes for different api endpoints
const transactionsRouter = require('./routers/transactions');
const facturesRouter = require('./routers/factures');
const usersRouter = require('./routers/users');


const api = process.env.API_URL;

// routers 
app.use(`${api}/transactions`, transactionsRouter);
app.use(`${api}/factures`, facturesRouter);
app.use(`${api}/users`, usersRouter);


// connecting to the mangoDB server
/**
 * {
 * useNewUrlParser: true,
 * useUnifiedTopology: true,
 * dbName: 'eshop-database'
 * })
 * this added piece of code I don't understand 
 * so I removed it since it doesn't effect the script
 *
 * CONNECTION_STRING
 */

mongoose.connect(process.env.CONN)
.then( () => {
    console.log('connection is ready!');    
})
.catch((err) => {
    console.log(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});