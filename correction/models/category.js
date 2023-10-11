const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema); // J'exporte et j'enregistre le schema au près de mongoose