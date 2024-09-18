const express = require('express') //for creating server and defining routes
const mongoose = require('mongoose') // to connect with MongoDB
const dotenv= require('dotenv')

dotenv.config(); //start
const app =express();
const studentroute = require('./routes/student');
app.use('/api/students',studentroute);
app.use (express.json());


mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

.then(()=> console.log('connected to mongodb'))
.catch((err)=> console.error('mongo error is:',err));

app.get('/',(req,res)=>{
    res.send('Server is running,Get request accpeted');

});

const port= process.env.port || 8080;
app.listen(port,() =>{
    console.log('server running in port  ', port);

})