const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class SoundService {
    addByteArray(bytearray) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('value', DbConnection.sql.VarBinary(DbConnection.sql.MAX), bytearray)
                    .query(`
                        INSERT INTO ByteArray VALUES (@value);
                        SELECT SCOPE_IDENTITY() AS id;`);
            })
            .then((result) => {
                return result.recordset[0].id;
            });
    }

    addSound(name, typeId, bytearray) {
        return this.addByteArray(bytearray)
        .then(lastId => {
            return DbConnection.executePoolRequest()
                .then(pool => {
                    return pool
                        .input('name', DbConnection.sql.NVarChar(50), name)
                        .input('soundTypeId', DbConnection.sql.Int, typeId)
                        .input('byteArrayId', DbConnection.sql.Int, lastId)
                        .query(`INSERT INTO Sound VALUES (@name, @soundtypeId, @byteArrayId)`);
                })
                .then(result => {
                    return result.rowsAffected[0] === 1;
                });
        })
    }

    editSound(paramId, name, typeId, bytearray) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('paramId', DbConnection.sql.Int, paramId)
                    .input('name', DbConnection.sql.NVarChar(50), name)
                    .input('soundTypeId', DbConnection.sql.Int, typeId)
                    .input('byteArrayId', DbConnection.sql.Int, paramId)
                    .input('value', DbConnection.sql.VarBinary(DbConnection.sql.MAX), bytearray)
                    .query(`UPDATE Sound SET 
                        Name = @name, 
                        SoundTypeId = @soundtypeId
                        WHERE Id = @paramId;
                        UPDATE ByteArray SET Value = @value WHERE Id = @byteArrayId
                        `
                    )
            })
            .then(result => {
                return result.rowsAffected[0] === 1;
            });
    }

    getSoundById(id) {
        return DbConnection.executeQuery(`
            SELECT S.Id, S.Name, S.SoundTypeId, S.ByteArrayId AS ByteArrayId, ST.Name AS TypeName
            FROM Sound S INNER JOIN SoundType ST ON S.SoundTypeId = ST.Id
            WHERE S.Id = ${id}
        `).then((result) => {
            return DbMapper.mapSound(result.recordset[0]);
        })
    }

    getSoundDataById(id) {
        return DbConnection.executeQuery(`
            SELECT Value FROM ByteArray WHERE Id = ${id}`)
        .then((result) => {
            return result.recordset[0].Value;
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
            DELETE FROM Sound WHERE Id = ${id};
            DELETE FROM ByteArray WHERE Id = ${id};
        `).then((result) => {
            return result.rowsAffected[0] === 1;
        });

    }

}

module.exports = new SoundService();