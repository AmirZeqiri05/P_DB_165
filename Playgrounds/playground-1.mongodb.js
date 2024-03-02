db.createRole({
  role: "admin_mflix",
  privileges: [
    { resource: { db: "db_mflix", collection: "" }, actions: ["createCollection", "dropCollection"] },
    { resource: { db: "db_mflix", collection: "" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: "db_mflix", collection: "" }, actions: ["createIndex", "dropIndex"] },
    { resource: { db: "db_mflix", collection: "system.roles" }, actions: ["find", "update"] },
    { resource: { db: "db_mflix", collection: "system.users" }, actions: ["find", "update"] }
  ],
  roles: []
});


db.createRole({
  role: "user_mflix",
  privileges: [
    { resource: { db: "db_mflix", collection: "films" }, actions: ["find"] },
    { resource: { db: "db_mflix", collection: "comments" }, actions: ["insert", "remove"] }
  ],
  roles: []
});


db.createRole({
  role: "manager_mflix",
  privileges: [
    { resource: { db: "db_mflix", collection: "users" }, actions: ["find"] },
    { resource: { db: "db_mflix", collection: "films" }, actions: ["find", "update", "remove"] },
    { resource: { db: "db_mflix", collection: "comments" }, actions: ["find", "update", "remove"] }
  ],
  roles: []
});


db.createUser({
  user: "admin_user",
  pwd: "admin_password",
  roles: [{ role: "admin_mflix", db: "db_mflix" }]
});


db.createUser({
  user: "normal_user",
  pwd: "normal_password",
  roles: [{ role: "user_mflix", db: "db_mflix" }]
});


db.createUser({
  user: "manager_user",
  pwd: "manager_password",
  roles: [{ role: "manager_mflix", db: "db_mflix" }]
});
