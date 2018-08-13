const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class SoundService {
    addSound(data) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('name', DbConnection.sql.NVarChar(50), data.name)
                    .input('type', DbConnection.sql.Int, data.type)
                    .query(`INSERT INTO Sound(Name, SoundTypeId) VALUES (@name,@type)`)
            })
            .then((result) => {
                return result.rowsAffected[0] === 1;
            });
    }

    editSound(data, paramId) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('name', DbConnection.sql.NVarChar(50), data.name)
                    .input('type', DbConnection.sql.Int, data.type)
                    .input('paramId', DbConnection.sql.Int, paramId)
                    .query(`UPDATE Sound SET Name = @name, TypeId = @type WHERE Id = @paramId`)
            })
            .then((result) => {
                return result.rowsAffected[0] === 1;
            });
    }

    getSoundById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`SELECT S.Id, S.Name, S.TypeId, T.Name AS TypeName
            FROM Sound S INNER JOIN Type T ON S.TypeId = T.Id
            WHERE S.Id = @id`)
            })
            .then((result) => {
                return DbMapper.mapSound(result.recordset[0]);
            })
    }

    getTypesById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`SELECT Id, Name FROM Type WHERE Id = @id`)
            })
            .then((result) => {
                return result.recordset.map((type) => {
                    return DbMapper.mapType(type);
                });
            });
    }

    getTypes() {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.query(`SELECT Id, Name FROM Type`)
            })
            .then((result) => {
                return result.recordset.map((type) => {
                    return DbMapper.mapType(type);
                });
            });

    }

    getIconSrcById(typeId) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                console.log(typeId);
                return pool.input('typeId', DbConnection.sql.Int, typeId)
                    .query(`SELECT IconSrc FROM Type WHERE Id = @typeId`);
            })
            .then((result) => {
                return result.recordset.map((type) => {
                    return DbMapper.mapType(type);
                });
            })
    }

    getSplicerSounds() {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.query(`SELECT TOP 8 S.Id, S.Name, T.IconSrc FROM Sound S
                INNER JOIN Type T ON S.TypeId = T.Id`);
            })
            .then((result) => {

                return result.recordset.map((type) => {
                    return DbMapper.mapSoundSplicer(type);
                })
            })
    }

    getPageCount(itemsPerPage, filter) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('itemsPerPage', DbConnection.sql.Int, itemsPerPage)
                    .input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .input('type', DbConnection.sql.NVarChar(50), filter.type)
                    .query(`SELECT CEILING(CAST(COUNT(*) AS FLOAT) / @itemsPerPage) AS itemCount
                    FROM Sound S INNER JOIN Type T On S.TypeId = T.Id
                    WHERE LOWER(S.Name) LIKE LOWER(@name) + '%' AND T.Name LIKE LOWER(@type) + '%'`)
            })
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                return null;
            });
    }

    getCount(filter) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .input('type', DbConnection.sql.NVarChar(50), filter.type)
                    .query(`SELECT COUNT(*) AS Count 
            FROM Sound S INNER JOIN Type T ON S.TypeId = T.Id
            WHERE LOWER(S.Name) LIKE LOWER(@name) + '%' AND T.Name LIKE LOWER(@type) + '%'`)
            })
            .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
                return null;
            });
    }

    getAll(page, itemsPerPage, filter) {
        if (page === 0) {
            page = 1;
        }
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('page', DbConnection.sql.Int, page)
                    .input('itemsPerPage', DbConnection.sql.Int, itemsPerPage)
                    .input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .input('type', DbConnection.sql.NVarChar(50), filter.type)
                    .query(`
                    SELECT S.Id, S.Name, S.TypeId, T.Name AS TypeName
                    FROM Sound S INNER JOIN Type T ON S.TypeId = T.Id
                    WHERE LOWER(S.Name) LIKE LOWER(@name) + '%' AND T.Name LIKE LOWER(@type) + '%'
                    ORDER BY S.Name
                    OFFSET ((@page-1) * @itemsPerPage) ROWS
                    FETCH NEXT @itemsPerPage ROWS ONLY
                    `)
            })
            .then((result) => {
                return this.getPageCount(itemsPerPage, filter)
                    .then((itemCount) => {
                        return this.getCount(filter)
                            .then((totalItemCount) => {
                                const pageCount = itemCount.recordset[0].itemCount;
                                return {
                                    data: result.recordset.map((record) => DbMapper.mapSound(record)),
                                    pageCount: pageCount,
                                    currentPage: page < pageCount ? Number.parseInt(page) : Number.parseInt(pageCount),
                                    itemCount: totalItemCount.recordset[0].Count
                                };
                            })

                    });

            });
    }

    delete(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query('DELETE FROM Sound WHERE Id = @id')
            })
            .then((result) => {
                return result.rowsAffected[0] === 1;
            });

    }

}

module.exports = new SoundService();