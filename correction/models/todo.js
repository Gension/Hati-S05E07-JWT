const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'pending'},
    category: { type: Schema.ObjectId, ref: 'Category' }, // je lui dit que category fera réference au schema enregistré category
    // team_members: [{ type: String }] // contains the list of users that work on task
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);