const Movie = require('../models/Movie');
const {errorHandler} = require('../auth');

// Any User
module.exports.getMovies = (req, res) => {
    return Movie.find()
    .then(result => {
        if (result.length > 0) {
            return res.status(200).send({movies: result})
        } else {
            return res.status(200).send({message: 'No Movies'})
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.getMovie = (req, res) => {
    return Movie.findById(req.params.movieId)
    .then(result => {
        if (result) {
            return res.status(200).send(result)
        } else {
            return res.status(200).send({message: 'Movie does not exist'})
        }
    }).catch(error => errorHandler(error, req, res));
}


// Authenticated User
module.exports.addComment = (req, res) => {
    if (req.user.isAdmin) return res.status(403).send({message: 'Admin is Forbidden'});

    let comment = {
        userId: req.user.id,
        comment: req.body.comment
    }

    return Movie.findOneAndUpdate({_id: req.params.movieId}, {$push: {comments: comment}}, { returnDocument: 'after' })
    .then(result => {
        if (result) {
            return res.status(200).send({message: 'comment added successfully', updatedMovie: result});
        } else {
            return res.status(404).send({message: 'Movie not found'})
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.getComments = (req, res) => {
    return Movie.findById(req.params.movieId)
    .then(result => {
        if (result) {
            console.log(result)
            return res.status(200).send({comments: result.comments})
        } else {
            return res.status(404).send({message: 'Movie not found'})
        }
    }).catch(error => errorHandler(error, req, res));   
}

// Admin
module.exports.addMovie = (req, res) => {
    let newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    });

    return Movie.findOne({title: req.body.title})
    .then(existingMovie => {
        if (existingMovie) {
            return res.status(409).send({message: 'Movie already exists'})
        } else {
            return newMovie.save()
            .then(result => res.status(201).send(result))
            .catch(error => errorHandler(error, req, res));
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.deleteMovie = (req, res) => {
    return Movie.findByIdAndDelete(req.params.movieId)
    .then(result => {
        if(result) return res.status(200).send({message:'Movie deleted successfully'});
        else return res.status(404).send({message: 'Movie not found'});
    }).catch(error => errorHandler(error, req, res));
}

module.exports.updateMovie = (req, res) => {
    let updatedMovie = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    }
    return Movie.findOneAndUpdate({_id: req.params.movieId}, updatedMovie, { returnDocument: 'after' })
    .then(result => {
        if (result) {
            res.status(200).send({message: 'Movie updated successfully', updatedMovie: result});
        } else {
            res.status(404).send({message: 'Movie not found'})
        }
    }).catch(error => errorHandler(error, req, res));
}
