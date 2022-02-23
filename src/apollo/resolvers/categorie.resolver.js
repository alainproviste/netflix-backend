const Categorie = require('../../models/categorie.model');

module.exports = {
    Query: {
        getCategories: () => {
            return Categorie.find()
                .populate('movies')
                .catch((err) => console.log(err));
        },
        getCategorie(parent, args, context) {
            return Categorie.findById(args.id)
                .populate('movies')
                .catch((err) => console.log(err));;
        }
    },
    Mutation: {
        createCategorie(parent, args) {
            const newCategorie = new Categorie(
                {
                    name: args.name,
                    movies: args.movies
                }
            )
            return newCategorie.save();
        },
        updateCategorie(parent, {id, name, movies}) {
            return Categorie.findByIdAndUpdate(id, { name: name , movies: movies});
        }
    }

}