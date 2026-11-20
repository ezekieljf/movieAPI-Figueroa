const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    director: {
        type: String,
        required: [true, 'Director is Required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    comments: [
        {
            userId: {
                type: String,
                required: [true, 'userID is required']
            },
            comment: {
                type: String,
                required: [true, 'comment is required']
            }
        }
    ]
});

module.exports = mongoose.model('Movie', MovieSchema);