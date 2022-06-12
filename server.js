const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const morgan = require('morgan');

require("dotenv").config();


//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware 
app.use(express.json());

app.use(morgan('tiny'));


// Import the routes 
const userRoute = require('./routes/user.routes');
const reviewRoute = require('./routes/review.routes');
const categorywRoute = require('./routes/category.routes');
const productRoute = require('./routes/products.routes');
const authRoute = require('./routes/auth.routes');



//Middleware for cookies
app.use(cookieParser());

const prefix = '/api'
// Routes middleware 
app.use( prefix + '/auth', authRoute);
app.use( prefix + '/reviews', reviewRoute);
app.use( prefix + '/categories', categorywRoute);
app.use( prefix + '/products', productRoute);

app.use(verifyJWT);
app.use( prefix + '/users', userRoute);


require('./models');


app.listen(3000, () => console.log('Server up and running!'))

