const express=require('express');
require('dotenv').config();
const app=express();
const cors=require('cors');
const connectDB=require('./config/db.js');
const pollRoutes=require('./routes/poll.routes');
const voteRoutes=require('./routes/votes.routes.js');
const userRoutes=require('./routes/user.routes.js');



//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


//routes
app.get('/',(req,res)=>{
    res.send('Hello from server');
});
app.use('/poll',pollRoutes);
app.use('/vote',voteRoutes);
app.use('/user',userRoutes);


app.listen(4000,async()=>{
    await connectDB();
    console.log('Server is running on port 4000');
});