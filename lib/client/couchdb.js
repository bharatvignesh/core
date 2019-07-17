const NANO = require('nano');

class CouchDb {
    constructor(config) {
        if (!this.nano) {
            this.nano = NANO(`http://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}`);
        }
    }

    selectDb(objType) {
        return this.nano.db.use(objType);
    }

    async listAllObjects(db) {
        try {
            let list = await db.list({include_docs: true});
            return list.rows;
        } catch (e) {
            throw e;
            console.log('e....',e);
        }
    }
}
module.exports = CouchDb;