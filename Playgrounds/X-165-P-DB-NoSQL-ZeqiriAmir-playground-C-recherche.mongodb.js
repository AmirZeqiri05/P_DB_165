// Lister tous les films ou séries selon les critères suivants :

// 1. d’action
use("db_mflix")
db.movies.find({ "genres": "Action" });

// 2. sortis après l’an 2000
use("db_mflix")
db.movies.find({ "year": { $gt: 2000 } });

// 3. réalisés après 2010 mais avant 2020
use("db_mflix")
db.movies.find({ year: { $gt: 2010, $lt: 2020 } })

// 4. sortis dans les années 2000 mais ayant un style des années 1980
use("db_mflix")
db.movies.find({ year: { $gte: 2000, $lt: 2010 }, 'style': '1980s' })

// 5. réalisés par « Quentin Tarantino »
use("db_mflix")
db.movies.find({ directors: 'Quentin Tarantino' })

// 6. de la série « Star Wars »
use("db_mflix")
db.movies.find({ title: /Star Wars/ })

// 7. avec un score « IMDb » supérieur à 8
use("db_mflix")
db.movies.find({ 'imdb.rating': { $gt: 8 } })

// 8. qui ne sont pas de genre « Horror » ou « Sci-Fi »
use("db_mflix")
db.movies.find({ genres: { $nin: ['Horror', 'Sci-Fi'] } })

// 9. ayant exactement 3 différents genres
use("db_mflix")
db.movies.find({ genres: { $size: 3 } })

// 10. dont le dernier genre est « Drama »
use("db_mflix")
db.movies.find({ genres: { $last: 'Drama' } })

// 11. qui durent entre 1h30 et 2h
use("db_mflix")
db.movies.find({ runtime: { $gte: 90, $lte: 120 } })

// 12. avec plus de 100 commentaires
use("db_mflix")
db.movies.find({ num_mflix_comments: { $gt: 100 } })

// 13. qui ne sont pas classés « R »
use("db_mflix")
db.movies.find({ rated: { $ne: 'R' } })

// 14. dont le titre commence par « The »
use("db_mflix")
db.movies.find({ title: /^The/ })

// 15. ayant reçu un certain nombre d’awards
use("db_mflix")
db.movies.find({ 'awards.wins': { $gt: 0 } })

// 16. où le réalisateur et le premier acteur sont les mêmes
use("db_mflix")
db.movies.find({ $expr: { $eq: ['$directors.0', '$cast.0'] } })

// 17. dans lesquels « Brad Pitt » et « Angelina Jolie » sont acteurs
use("db_mflix")
db.movies.find({ cast: { $all: ['Brad Pitt', 'Angelina Jolie'] } })

// 18. dans lesquels « Brad Pitt » est acteur et dont le nombre de commentaires est au moins égal à 100
use("db_mflix")
db.movies.find({ cast: 'Brad Pitt', num_mflix_comments: { $gte: 100 } })

// 19. où l’acteur principal est une « femme »
use("db_mflix")
// impossible (selon moi)

// 20. où « Tom Hanks » est acteur, mais pas « réalisateur »
use("db_mflix")
db.movies.find({ cast: 'Tom Hanks', directors: { $exists: false } })

// 21. mais doivent apparaître uniquement le titre et l’année de sortie de chaque film
use("db_mflix")
db.movies.find({}, { title: 1, year: 1, _id: 0 })

// 22. Dans le cadre d’une pagination qui renvoie à chaque fois une liste de 10 films par page, quel est la requête permettant de renvoyer uniquement la liste des films de la 3e page ?
use("db_mflix")
db.movies.find().skip(20).limit(10)

// 23. Rechercher les films qui ont au moins la langue « française » ou la langue « anglaise » disponible,
//     qui sont sortis à partir de « 1980 » inclus, et qui ont une note « Rotten Tomatoe » de plus de 4 ou un score « IMDB » supérieur ou égal à 8.
//     Nous voulons également que « Brad Pitt » joue dans le film. Nous souhaitons n'avoir que les titres pour pouvoir les afficher directement. Enfin,
//     nous ne voulons pas que le « synopsis » du film parle de « nazis ».
use("db_mflix")
db.movies.aggregate([
    {
        $match: {
            $and: [
                { $or: [{ languages: "French" }, { languages: "English" }] },
                { released: { $gte: ISODate("1980-01-01") } },
                { $or: [{ "tomatoes.viewer.rating": { $gt: 4 } }, { "imdb.rating": { $gte: 8 } }] },
                { cast: "Brad Pitt" },
                { fullplot: { $not: /nazis/i } }
            ]
        }
    },
    { $project: { title: 1, _id: 0 } }
])

// 24. Nous voulons maintenant trier notre résultat suivant les « notes » attribués au film. D'abord par la note « Rotten Tomatoe », puis par la note « IMDB ».
use("db_mflix")
db.movies.aggregate([
    {
        $match: {
            $and: [
                { $or: [{ languages: "French" }, { languages: "English" }] },
                { released: { $gte: ISODate("1980-01-01") } },
                { $or: [{ "tomatoes.viewer.rating": { $gt: 4 } }, { "imdb.rating": { $gte: 8 } }] },
                { cast: "Brad Pitt" },
                { fullplot: { $not: /nazis/i } }
            ]
        }
    },
    {
        $project: { title: 1, "tomatoes.viewer.rating": 1, "imdb.rating": 1, _id: 0 }
    },
    {
        $sort: { "tomatoes.viewer.rating": -1, "imdb.rating": -1 }
    }
])
