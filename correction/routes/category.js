const express = require('express');
const mongoose = require('mongoose');
const asyncErrorHandler = require('../tools/asyncErrorHandler');
const logger = require('../tools/logger');

const CategoryModel = mongoose.model('Category');
const router = express.Router();


// - `GET /`: Récupère tous les éléments.
router.get('/', asyncErrorHandler(async (req, res, next) => {
    res.json(await CategoryModel.find({}));
}));

// - `GET /:id`: Récupère un élément spécifique par ID.
router.get('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
        logger.warn(`404 - Category ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'Category not found' });
    } 

    res.json(category);

}));

// - `POST /`: Crée un nouveau élément.
router.post('/', asyncErrorHandler(async (req, res) => {
    const body = req.body;

    const category = await CategoryModel.create(body);
    //  c'est la même chose que :
    // const category = new CategoryModel(body);
    // await category.save();


    res.json(category);

}));
// - `PUT /:id`: Met à jour un élémént spécifique par ID.
router.put('/:id', asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const category = await CategoryModel.findByIdAndUpdate(id, body);

    if (!category) { 
        logger.warn(`404 - Category ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'Category not found' });
    };

    res.json(category);
}));

// - `DELETE /:id`: Supprime un élément spécifique par ID.
router.delete('/:id', asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
        logger.warn(`404 - Category ${id} not found by ${req.ip}`);
        return res.status(404).json({ message: 'Category not found' })
    }

    res.json({
        message: 'Category deleted successfully',
    });
}));

module.exports = router;