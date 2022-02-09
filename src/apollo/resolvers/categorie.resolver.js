const Categorie = require('../../models/categorie.model');

module.exports = {
    Query: {
        getCategories: () => {
            return Categorie.find();
        },
        getCategorie(parent, args, context) {
            return Categorie.findById(args.id);
        }
    },
    Mutation: {
        createCategorie(parent, args) {
            const newCategorie = new Categorie(
                {
                    name: args.name
                }
            )
            return newCategorie.save();
        },
        updateCategorie(parent, {id, name}) {
            return Categorie.findByIdAndUpdate(id, { name: name });
        }
    }

}