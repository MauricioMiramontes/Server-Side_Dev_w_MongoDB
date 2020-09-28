//Assigment 3: Task 2
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default:false      
    },
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leader', leadersSchema);

module.exports = Leaders;