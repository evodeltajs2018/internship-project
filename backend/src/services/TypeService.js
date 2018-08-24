const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class TypeService {
    constructor() {
        this.fromWhere = `
            FROM Type 
            WHERE LOWER(Name) LIKE '%' + LOWER(@name) + '%'
        `;
    }

    getTypeById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.input('id', DbConnection.sql.Int, id)
                    .query(`SELECT Id, Name, IconSrc, ColorType FROM Type WHERE Id = @id`)
            })
            .then((result) => {
                return result.recordset.map((type) => {
                    return DbMapper.mapType(type);
                });
            });
    }

    getAllTypes() {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool.query(`SELECT Id, Name FROM Type ORDER BY Name`)
            })
            .then((result) => {
                return result.recordset.map((record) => {
                    return DbMapper.mapType(record)
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getPageCount(itemsPerPage, filter) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('itemsPerPage', DbConnection.sql.Int, itemsPerPage)
                    .input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .query(`SELECT CEILING(CAST(COUNT(*) AS FLOAT) / @itemsPerPage) AS itemCount
                    ` + this.fromWhere)
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
                return pool
                    .input('name', DbConnection.sql.NVarChar(50), filter.name)
                    .query(`SELECT COUNT(*) AS Count
                    ` + this.fromWhere)
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
                    SELECT Id, Name, IconSrc, ColorType 
                    ` + this.fromWhere + `
                    ORDER BY Name
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
                                    data: result.recordset.map((record) => DbMapper.mapType(record)),
                                    pageCount: pageCount,
                                    currentPage: page < pageCount ? Number.parseInt(page) : Number.parseInt(pageCount),
                                    itemCount: totalItemCount.recordset[0].Count
                                };
                            })

                    });

            });
    }

    addType(data) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('name', DbConnection.sql.NVarChar(50), data.name)
                    .input('iconSrc', DbConnection.sql.NVarChar(DbConnection.sql.MAX), data.src)
                    .input('colorType', DbConnection.sql.NVarChar(DbConnection.sql.MAX), data.color)
                    .query(`INSERT INTO Type VALUES (@name, @iconSrc, @colorType)`);
            })
            .then(result => {
                return result.rowsAffected[0] === 1;
            });
    }

    editType(data, id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                    .input('id', DbConnection.sql.Int, id)
                    .input('name', DbConnection.sql.NVarChar(50), data.name)
                    .input('src', DbConnection.sql.NVarChar(DbConnection.sql.MAX), data.src)
                    .input('color', DbConnection.sql.NVarChar(DbConnection.sql.MAX), data.color)
                    .query(`UPDATE Type SET 
                        Name = @name, 
                        IconSrc = @src,
                        ColorType = @color
                        WHERE Id = @id;
                        `)
            })
            .then(result => {
                return result.rowsAffected[0] === 1;
            });
    }

    delete(id) {
        const transaction = new DbConnection.sql.Transaction()
        const request = new DbConnection.sql.Request(transaction);

        return new Promise((resolve) => {

            return transaction.begin(err => {
                if (err) {
                    console.log('Transaction Begin ', err);
                }
                let rolledBack = false;

                transaction.on('rollback', aborted => {
                    rolledBack = true;
                })

                request
                    .input('id', DbConnection.sql.Int, id)
                    .query(`DELETE FROM Sound WHERE TypeId = @id`, (err, result) => {
                        request
                            .query(`DELETE FROM ByteArray WHERE Id = @id`, (err, result) => {
                                request
                                    .query(`DELETE FROM Type WHERE Id = @id`, (err, result) => {
                                        if (err) {
                                            console.log('Throw ', err);
                                            if (!rolledBack) {
                                                transaction.rollback(err => {
                                                    console.log('Rollback err ', err);
                                                })
                                            }
                                        } else {
                                            transaction.commit(err => {
                                                if (err) {
                                                    throw new Error(err);
                                                }
                                                resolve(result.rowsAffected[0] === 1);
                                            })
                                        }
                                    })
                            })
                    })
            })
        })
    }
}

module.exports = new TypeService();