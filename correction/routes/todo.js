const express = require('express');
const mongoose = require('mongoose');
const asyncErrorHandler = require('../tools/asyncErrorHandler');

const TodoModel = mongoose.model('Todo');
const router = express.Router();


// - `GET /`: Récupère tous les éléments.
router.get('/', asyncErrorHandler(async (req, res) => {
    res.json(await TodoModel.find({}).populate('category'));
}));

// - `GET /:id`: Récupère un élément spécifique par ID.
router.get('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const todo = await TodoModel.findById(id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
}));

// - `POST /`: Crée un nouveau élément.
router.post('/', asyncErrorHandler(async (req, res) => {
    const body = req.body;

    const todo = await TodoModel.create(body);
    //  c'est la même chose que :
    // const todo = new TodoModel(body);
    // await todo.save();


    res.json(todo);

}));
// - `PUT /:id`: Met à jour un élémént spécifique par ID.
router.put('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const todo = await TodoModel.findByIdAndUpdate(id, body);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);

}));

// - `DELETE /:id`: Supprime un élément spécifique par ID.
router.delete('/:id', asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json({
        message: 'Todo deleted successfully',
    });

}));


module.exports = router;