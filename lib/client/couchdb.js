const NANO = require('nano'),
    _ = require('lodash');

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
            let filtered=  _.flatMap(list.rows, function(obj) {
                return _.omit(obj.doc, '_rev');
            });
            return filtered;
        } catch (e) {
            throw e;
            console.log('e....',e);
        }
    }
}
module.exports = CouchDb;