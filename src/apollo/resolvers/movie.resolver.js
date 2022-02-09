const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovies: () => {
            return Movie.find();
        },
        getMovie(parent, args, context) {
            return Movie.findById(args.id);
        }
    },
    Mutation: {
        createMovie(parent, args) {
            const newMovie = new Movie(
                {
                    title: args.title,
                    description: args.description,
                    duration: args.duration,
                    img: args.img,
                    categories: args.categories
                }
            )
            return newMovie.save();
        },
        updateMovie(parent, {id, title, description, duration, img, categories}) {
            return Movie.findByIdAndUpdate(id, { title: title, description: description, duration: duration, img: img, categories: categories });
        }
    }

}