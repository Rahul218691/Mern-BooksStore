require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const {errorHandler,notFound} = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app);
const {addComment} = require('./helpers/dbfunc');

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(express.static(path.join(__dirname,'public')));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const io = socketio(server,{
    cors:{
        origin:"http://localhost:3000"
    }
});

// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store')
//   next()
// })

app.get('/',(req,res) =>{
   res.send('Api Running successfully')
})

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api',require('./routes/carousalRoutes'));
app.use('/api/genre',require('./routes/genreRoutes'));
app.use('/api/author',require('./routes/authorRoutes'));
app.use('/api/blog',require('./routes/blogRoutes'));
app.use('/api/books',require('./routes/bookRoutes'));
app.use('/api/category',require('./routes/categoryRoutes'));


io.on('connection',socket=>{
	socket.on('sendmessage',async(msg)=>{
		const data = await addComment(msg);
		io.emit('receivemsg',{message:data.message,room:data.slug})
	})
})


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`App listening to port ${PORT}`)
})

