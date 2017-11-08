const Database = require('./database')

class UsersController {
    constructor(Database) {
        this.Database = Database;
    }

    getAll() {
        return this.Database.findAll('users');
    }
}

module.exports = UsersController