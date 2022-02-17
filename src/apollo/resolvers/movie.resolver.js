const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovies: () => {
            return Movie.find()
                .populate("categories")
                .clone()
                .catch((err) => console.log(err));;
        },
        getMovie(parent, args, context) {
            return Movie.findById(args.id)
                .populate("categories")
                .clone()
                .catch((err) => console.log(err));
        }
    },
    Mutation: {
        createMovie(parent, args) {
            const newMovie = new Movie(
                {
                    title: args.title,
                    description: args.description,
                    producer: args.producer,
                    actors: args.actors,
                    duration: args.duration,
                    img: args.img,
                    iframe: args.iframe,
                    categories: args.categories
                }
            )
            return newMovie.save();
        },
        updateMovie(parent, {id, title, description, producer, actors, duration, img, iframe, categories}) {
            return Movie.findByIdAndUpdate(id, { title: title, description: description, producer: producer, actors: actors, duration: duration, img: img, iframe: iframe, categories: categories });
        },
        deleteMovie(parents, { id }) {
            return Movie.findByIdAndRemove(id);
        },
    }

}