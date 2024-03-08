// 1. Administrateur
// 1.1. Peux créer ou supprimer des collections
// 1.2. Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des collections
// 1.3. Gérer les indexes pour toutes les collections
// 1.4. Gérer les rôles (et donc les utilisateurs) et leurs privilèges de cette base de données
use("db_mflix")
db.createRole({
  role: "RoleAdministrateur",
  privileges: [
    { resource: { db: "db_mflix", collection: "" }, actions: ["createCollection", "dropCollection"] },
    { resource: { db: "db_mflix", collection: "" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: "db_mflix", collection: "" }, actions: ["createIndex", "dropIndex"] },
    { resource: { db: "db_mflix", collection: "system.roles" }, actions: ["find", "update"] },
    { resource: { db: "db_mflix", collection: "system.users" }, actions: ["find", "update"] }
  ],
  roles: []
});

// 2. Utilisateur
// 2.1. Lire les informations sur les films et les commentaires
// 2.2. Ajouter ou supprimer un ou des commentaires
use("db_mflix")
db.createRole({
  role: "RoleUtilisateur",
  privileges: [
    { resource: { db: "db_mflix", collection: "movies" }, actions: ["find"] },
    { resource: { db: "db_mflix", collection: "comments" }, actions: ["insert", "remove"] }
  ],
  roles: []
});

// 3. Gestionnaire
// 3.1. Lire les informations sur tous les utilisateurs (pour savoir qui a fait un commentaire)
// 3.2. Mettre à jour, lire et supprimer des films ou des commentaires
// 3.3. Lire tous les commentaires
use("db_mflix")
db.createRole({
  role: "RoleGestionnaire",
  privileges: [
    { resource: { db: "db_mflix", collection: "users" }, actions: ["find"] },
    { resource: { db: "db_mflix", collection: "movies" }, actions: ["find", "update", "remove"] },
    { resource: { db: "db_mflix", collection: "comments" }, actions: ["find", "update", "remove"] }
  ],
  roles: []
});

// Création de l'utilisateur Administrateur et attribution de son rôle
use("db_mflix")
db.createUser({
  user: "UserAdminstrateur",
  pwd: "admin",
  roles: [{ role: "RoleAdministrateur", db: "db_mflix" }]
});

// Création de l'utilisateur Utilisateur et attribution de son rôle
use("db_mflix")
db.createUser({
  user: "UserUtilisateur",
  pwd: "admin",
  roles: [{ role: "RoleUtilisateur", db: "db_mflix" }]
});

// Création de l'utilisateur Gestionnaire et attribution de son rôle
use("db_mflix")
db.createUser({
  user: "UserGestionnaire",
  pwd: "admin",
  roles: [{ role: "RoleGestionnaire", db: "db_mflix" }]
});
