// 1
// Avec index
use("db_mflix");
db.movies.createIndex({ "title": 1 })
// Sans index
use("db_mflix");
db.movies.find({ "title": "Swayamvaram" })

// 2
// Avec index
use("db_mflix");
db.movies.createIndex({ "released": 1 })
// Sans index
use("db_mflix");
db.movies.find({ "released": { $gt: new Date("1980-01-01") } })

// 3
// Avec index
use("db_mflix");
db.movies.createIndex({ "directors": 1 })
// Sans index
use("db_mflix");
db.movies.find({ "directors": "Adoor Gopalakrishnan" })
