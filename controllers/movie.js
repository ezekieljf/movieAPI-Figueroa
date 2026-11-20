const Movie = require('../models/Movie');
const {errorHandler} = require('../auth');

module.exports.addMovie = (req, res) => {
    let newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    });

    return Movie.findOne({name: req.body.name})
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

// module.exports.deleteWorkout = (req, res) => {
//     return Workout.deleteOne({userId: req.user.id, _id: req.params.workoutId})
//     .then(result => {
//         console.log(result)
//         if(result.deletedCount > 0) return res.status(200).send({message:'Workout deleted successfully'});
//         else return res.status(404).send({message: 'Workout not found'});
//     }).catch(error => errorHandler(error, req, res));
// }

// module.exports.updateWorkout = (req, res) => {
//     let updatedWorkout = {
//         name: req.body.name,
//         duration: req.body.duration
//     }
//     return Workout.findOneAndUpdate({userId: req.user.id, _id: req.params.workoutId}, updatedWorkout, { returnDocument: 'after' })
//     .then(result => {
//         if (result) {
//             res.status(200).send({message: 'Workout updated successfully', updatedWorkout: result});
//         } else {
//             res.status(404).send({message: 'Workout not found'})
//         }
//     }).catch(error => errorHandler(error, req, res));
// }

// module.exports.completeWorkout = (req, res) => {
//     return Workout.findOneAndUpdate({userId: req.user.id, _id: req.params.workoutId}, {status: 'complete'}, { returnDocument: 'after' })
//     .then(result => {
//         if (result) {
//             res.status(200).send({message: 'Workout status updated successfully', updatedWorkout: result});
//         } else {
//             res.status(404).send({message: 'Workout not found'})
//         }
//     }).catch(error => errorHandler(error, req, res));
// }