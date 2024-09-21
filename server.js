const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('Mongo URI:', process.env.MONGO_URI);
console.log('JWT Secret:', process.env.JWT_SECRET);

const app = express();
app.use(express.json());

const studentRoute = require('./routes/student');
app.use('/api/students', studentRoute);
const assignmentRoute = require('./routes/assignment');
app.use('/api/assignments', assignmentRoute);
const authRoute = require('./routes/auth');
app.use('/api', authRoute);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Mongo error:', err));

app.get('/', (req, res) => {
    res.send('Server is running, GET request accepted');
});

module.exports = app;
