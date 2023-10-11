require('dotenv').config();
const express= require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI);

const app = express();

require('./models/user');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const topicRouter = require('./routes/topic');


app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/topic', topicRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});