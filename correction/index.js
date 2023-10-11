require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const asyncErrorHandler = require('./tools/asyncErrorHandler');
const logger = require('./tools/logger');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

require('./models/category');
require('./models/todo');

// Pour avoir un log quand l'application est connecté à la base de donnée
mongoose.connection.on('connected', () => {
    logger.log('info', `Connection to MongoDB Established`);
});

const categoryRouter = require('./routes/category');
const todoRouter = require('./routes/todo');

const app = express();

app.use((req, res, next) => {
    logger.log('info', `${req.method} ${req.path} ${req.ip}`);
    next();
});

app.use(express.json());

app.use('/categories', categoryRouter);
app.use('/todos', todoRouter);


// La dernière etape si pas d'erreur = 404 
app.use((req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
});

// la dernière etape en cas d'erreur = 500
app.use((err, req, res, next) => {
    logger.log('error', err);

    if(process.env.NODE_ENV === 'production')
        res.status(500).json({ message: 'Something broke!' });
    else {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
})

app.listen(PORT, () => {
    logger.log('info', `TodoList API started on ${PORT} in mode ${process.env.NODE_ENV}`);
});