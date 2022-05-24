const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');

require("dotenv").config();


//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Import the routes 
const userRoute = require('./routes/user.routes');
const reviewRoute = require('./routes/review.routes')
const authRoute = require('./routes/auth.routes');
const refreshTokenRoute = require('./routes/refresh.routes')

// Middleware 
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

// Routes middleware 
app.use('/api/users', userRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/auth', authRoute);
app.use('/refresh', refreshTokenRoute)

require("./models");


app.listen(3000, () => console.log('Server up and running!'))

