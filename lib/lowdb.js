const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapters = new FileSync('db.json');
const db = low(adapters);
db.defaults( { users: [] } ).write();

module.exports = db;