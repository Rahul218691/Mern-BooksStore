require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const {errorHandler,notFound} = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');
const app = express();


connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(express.static(path.join(__dirname,'public')));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.get('/',(req,res) =>{
   res.send('Api Running successfully')
})

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api',require('./routes/carousalRoutes'));
app.use('/api/genre',require('./routes/genreRoutes'));
app.use('/api/author',require('./routes/authorRoutes'));
app.use('/api/blog',require('./routes/blogRoutes'));
app.use('/api/books',require('./routes/bookRoutes'));

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`App listening to port ${PORT}`)
})

