const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class SoundService {
    addSound(data) {
        return DbConnection.executeQuery(`
            INSERT INTO Sound(Name, SoundTypeId) VALUES
            ('${data.name}', ${data.type})
        `).then((result) => {
            return result.rowsAffected[0] === 1;
        });
    }

    editSound(data, paramId) {
        return DbConnection.executeQuery(`
            UPDATE Sound SET
            Name = '${data.name}',
            SoundTypeId = ${data.type}
            WHERE Id = ${paramId}
        `).then((result) => {
            return result.rowsAffected[0] === 1;
        });
    }

    getSoundById(id) {
        return DbConnection.executeQuery(`
            SELECT S.Id, S.Name, S.SoundTypeId, ST.Name AS TypeName
            FROM Sound S INNER JOIN SoundType ST ON S.SoundTypeId = ST.Id
            WHERE S.Id = ${id}
        `).then((result) => {
            return DbMapper.mapSound(result.recordset[0]);
        })
    }

    getTypesById(id) {
        return DbConnection.executeQuery(`
            SELECT Id, Name 
            FROM SoundType
            WHERE Id = ${id}
        `).then((result) => {
            return result.recordset.map((type) => { return DbMapper.mapType(type); });
        });
    }

    getTypes() {
        return DbConnection.executeQuery(`
            SELECT Id, Name 
            FROM SoundType
        `).then((result) => {
            return result.recordset.map((type) => { return DbMapper.mapType(type); });
        });

    }

    getPageCount(itemsPerPage) {
        return DbConnection.executeQuery(`
            SELECT CEILING(CAST(COUNT(*) AS FLOAT) / ${itemsPerPage}) AS itemCount FROM Sound
            `).then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                return null;
            });
    }

    getCount() {
        return DbConnection.executeQuery(`
            SELECT COUNT(*) AS Count FROM Sound
        `).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }

    getAll(page, itemsPerPage) {
        return DbConnection.executeQuery(`
            SELECT S.Id, S.Name, S.SoundTypeId, ST.Name AS TypeName
            FROM Sound S INNER JOIN SoundType ST ON S.SoundTypeId = ST.Id
            ORDER BY S.Name
            OFFSET ${(page - 1) * itemsPerPage} ROWS
            FETCH NEXT ${itemsPerPage} ROWS ONLY
            `)
            .then((result) => {
                return this.getPageCount(itemsPerPage).then((itemCount) => {
                    return this.getCount().then((totalItemCount) => {
                        return {
                            data: result.recordset.map((record) => DbMapper.mapSound(record)),
                            pageCount: itemCount.recordset[0].itemCount,
                            currentPage: page,
                            itemCount: totalItemCount.recordset[0].Count
                        };
                    })
                    
                });

            });
    }

    delete(id) {
        return DbConnection.executeQuery(`
            DELETE FROM Sound WHERE Id = ${id}
        `).then((result) => {
            return result.rowsAffected[0] === 1;
        });

    }

}

module.exports = new SoundService();