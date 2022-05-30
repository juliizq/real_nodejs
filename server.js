const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

require("dotenv").config();


//Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware 
app.use(express.json());


// Import the routes 
const userRoute = require('./routes/user.routes');
const reviewRoute = require('./routes/review.routes')
const authRoute = require('./routes/auth.routes');
const refreshTokenRoute = require('./routes/refresh.routes');
const logoutRoute = require('./routes/logout.routes');
const registerRoute = require('./routes/register.routes')



//Middleware for cookies
app.use(cookieParser());

// Routes middleware 
app.use('/register', registerRoute)
app.use('/api/auth', authRoute);
app.use('/refresh', refreshTokenRoute);
app.use('/logout', logoutRoute);
app.use('/api/reviews', reviewRoute);

app.use(verifyJWT);
app.use('/api/users', userRoute);


require('./models');


app.listen(3000, () => console.log('Server up and running!'))

