// 1. Compter le nombre de films par genre
db.movies.aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres", count: { $sum: 1 } } }
])

// 2. Compter le nombre de films par classification (rated)
db.movies.aggregate([
    { $group: { _id: "$rated", count: { $sum: 1 } } }
])

// 3. Calculer la durée moyenne des films par genre
db.movies.aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres", avgRuntime: { $avg: "$runtime" } } }
])

// 4. Calculer la durée moyenne des films par décennie
db.movies.aggregate([
    { $project: { decade: { $subtract: [ { $floor: { $divide: ["$year", 10] } }, 0 ] }, runtime: 1 } },
    { $group: { _id: "$decade", avgRuntime: { $avg: "$runtime" } } }
])

// 5. Calculer la durée moyenne des films par acteur
db.movies.aggregate([
    { $unwind: "$cast" },
    { $group: { _id: "$cast", avgRuntime: { $avg: "$runtime" } } }
])

// 6. Lister les 5 réalisateurs les plus fréquents
db.movies.aggregate([
    { $unwind: "$directors" },
    { $group: { _id: "$directors", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
])

// 7. Lister les 5 acteurs les plus fréquents dans les films « PG-13 »
db.movies.aggregate([
    { $match: { rated: "PG-13" } },
    { $unwind: "$cast" },
    { $group: { _id: "$cast", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
])

// 8. Quel est le nombre moyen de commentaires par film
db.movies.aggregate([
    { $group: { _id: null, avgComments: { $avg: "$num_mflix_comments" } } }
])

// 9. Le genre le plus populaire par année
db.movies.aggregate([
    { $unwind: "$genres" },
    { $group: { _id: { year: "$year", genre: "$genres" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $group: { _id: "$_id.year", mostPopularGenre: { $first: "$_id.genre" } } }
])

// 10. Lister les genres distincts des films
db.movies.distinct("genres")

// 11. Lister les films par décennie avec le nombre total de films par décennie
db.movies.aggregate([
    { $project: { decade: { $subtract: [ { $floor: { $divide: ["$year", 10] } }, 0 ] } } },
    { $group: { _id: "$decade", count: { $sum: 1 } } }
])

// 12. Trouver le genre le plus courant dans chaque pays
db.movies.aggregate([
    { $unwind: "$countries" },
    { $unwind: "$genres" },
    { $group: { _id: { country: "$countries", genre: "$genres" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $group: { _id: "$_id.country", mostCommonGenre: { $first: "$_id.genre" } } }
])

// 13. Trouver le nombre de films par classification et par décennie
db.movies.aggregate([
    { $project: { decade: { $subtract: [ { $floor: { $divide: ["$year", 10] } }, 0 ] }, rated: 1 } },
    { $group: { _id: { decade: "$decade", rated: "$rated" }, count: { $sum: 1 } } }
])

// 14. Calculer le nombre total de films et la durée moyenne des films par réalisateur
db.movies.aggregate([
    { $unwind: "$directors" },
    { $group: { _id: "$directors", totalMovies: { $sum: 1 }, avgRuntime: { $avg: "$runtime" } } }
])

// 15. Notre objectif est de créer des groupes par pays. Pour chaque pays, nous voulons créer des groupes de chaque genre et obtenir le nombre de films, la note moyenne des films et la part de marché (nombre de films d'un genre pour un pays / total de films du pays)
db.movies.aggregate([
    { $unwind: "$countries" },
    { $unwind: "$genres" },
    { $group: { _id: { country: "$countries", genre: "$genres" }, count: { $sum: 1 }, avgRating: { $avg: "$imdb.rating" } } },
    { $group: { _id: "$_id.country", genres: { $push: { genre: "$_id.genre", count: "$count", avgRating: "$avgRating" } } } }
])
