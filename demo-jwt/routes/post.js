const express = require('express');
const { checkToken } = require('../middlewares/jwt');
const router = express.Router();

router.use(checkToken);

// - `GET /`: Récupère tous les éléments.
router.get('/', async (req, res) => {
    res.json('// TODO');
});

// - `GET /:id`: Récupère un élément spécifique par ID.
router.get('/:id', async (req, res) => {
    res.json('// TODO');
});

// - `POST /`: Crée un nouveau élément.
router.post('/', async (req, res) => {
    res.json('// TODO');
});
// - `PUT /:id`: Met à jour un élémént spécifique par ID.
router.put('/:id', async (req, res) => {
    res.json('// TODO');
});

// - `DELETE /:id`: Supprime un élément spécifique par ID.
router.delete('/:id', async (req, res) => {
    res.json('// TODO');
});

module.exports = router;