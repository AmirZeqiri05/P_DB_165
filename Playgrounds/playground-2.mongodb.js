// 1
use("db_mflix")
db.movies.find({ "genres": "Action" });

// 2
use("db_mflix")
db.movies.find({ "year": { $gt: 2000 } });

// 3
use("db_mflix")
db.movies.find({ "production_year": { $gt: 2010, $lt: 2020 } });

// 4
use("db_mflix")
db.movies.find({ "release_year": { $gte: 2000, $lt: 2010 }, "style": "1980s" });

// 5
use("db_mflix")
db.movies.find({ "director": "Quentin Tarantino" });

// 6
use("db_mflix")
db.movies.find({ "title": /^Star Wars/ });

// 7
use("db_mflix")
db.movies.find({ "imdb_score": { $gt: 8 } });

// 8
use("db_mflix")
db.movies.find({ "genre": { $nin: ["Horror", "Sci-Fi"] } });

// 9
use("db_mflix")
db.movies.find({ "genre": { $size: 3 } });

// 10
use("db_mflix")
db.movies.find({ "genre.2": "Drama" }) ;

// 11
use("db_mflix")
db.movies.find({ "duration": { $gte: 90, $lte: 120 } });

// 12
use("db_mflix")
db.movies.find({ "comments": { $gt: 100 } });

// 13
use("db_mflix")
db.movies.find({ "rating": { $ne: "R" } });

// 14
use("db_mflix")
db.movies.find({ "title": /^The/ });

// 15
use("db_mflix")
db.movies.find({ "awards": { $gt: [2] } });

// 16
use("db_mflix")
db.movies.find({ $where: "this.director == this.actors[0]" });

// 17
use("db_mflix")
db.movies.find({ "actors": { $all: ["Brad Pitt", "Angelina Jolie"] } });

// 18
use("db_mflix")
db.movies.find({ "actors": "Brad Pitt", "comments": { $gte: 100 } });

// 19
use("db_mflix")
db.movies.find({ "lead_actor_gender": "female" });

// 20
use("db_mflix")
db.movies.find({ "actors": "Tom Hanks", "director": { $ne: "Tom Hanks" } });

// 21
use("db_mflix")
db.movies.find({}, { "title": 1, "release_year": 1, "_id": 0 });

// 22
use("db_mflix")
db.movies.find().skip(20).limit(10);
