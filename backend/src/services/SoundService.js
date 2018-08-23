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

    addSound(name, typeId, image, bytearray) {
        return this.addByteArray(bytearray)
        .then(lastId => {
            return DbConnection.executePoolRequest()
                .then(pool => {

                    const img = this.hasImage(image);

                    return pool
                        .input('name', DbConnection.sql.NVarChar(50), name)
                        .input('soundTypeId', DbConnection.sql.Int, typeId)
                        .input('image', DbConnection.sql.NVarChar(DbConnection.sql.MAX), img)
                        .input('byteArrayId', DbConnection.sql.Int, lastId)
                        .query(`INSERT INTO Sound VALUES (@name, @soundtypeId, @image, @byteArrayId)`);
                })
                .then(result => {
                    return result.rowsAffected[0] === 1;
                });
        })
    }

    hasImage(image) {
        if (image !== "undefined") {
            return image;
        } else {
            return 'data:image/jpeg;base64,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';
        }
    }

    editSound(paramId, name, typeId, image, bytearray) {
        return DbConnection.executePoolRequest()
            .then(pool => {

                const img = this.hasImage(image);


                return pool.input('paramId', DbConnection.sql.Int, paramId)
                    .input('name', DbConnection.sql.NVarChar(50), name)
                    .input('soundTypeId', DbConnection.sql.Int, typeId)
                    .input('image',DbConnection.sql.NVarChar(DbConnection.sql.MAX), img)
                    .input('byteArrayId', DbConnection.sql.Int, paramId)
                    .input('value', DbConnection.sql.VarBinary(DbConnection.sql.MAX), bytearray)
                    .query(`UPDATE Sound SET 
                        Name = @name, 
                        TypeId = @soundtypeId,
                        Image = @image
                        WHERE Id = @paramId;
                        UPDATE ByteArray SET Value = @value WHERE Id = @byteArrayId
                        `)
            })
            .then(result => {
                return result.rowsAffected[0] === 1;
            });
    }

    getSoundById(id) {
        return DbConnection.executePoolRequest()
            .then(pool => {
                return pool
                .input('id', DbConnection.sql.Int, id)
                .query(`SELECT S.Id as Id, S.Name, S.TypeId, T.Name AS TypeName, 
                    S.ByteArrayId AS ByteArrayId, 
                    T.IconSrc as IconSrc,
                    T.ColorType as ColorType,
                    S.Image as Image
                    
                    FROM Sound S INNER JOIN Type T ON S.TypeId = T.Id
                    WHERE S.Id = @id`)
            })
            .then((result) => {
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
                return pool.query(`SELECT DISTINCT TOP 8 S.Id, S.Name, S.TypeId
                
                , S.ByteArrayId, T.IconSrc, T.ColorType , T.Name as TypeName
                FROM Sound S 
                INNER JOIN Type T ON S.TypeId = T.Id`);
            })
            .then((result) => {

                return result.recordset.map((type) => {
                    return DbMapper.mapSoundSplicer(type);
                })
            })
    }

    getSoundsByType(typeId){
        return DbConnection.executePoolRequest().then(pool =>{
            return pool.input('typeId',DbConnection.sql.Int,typeId)
            .query(`SELECT S.Id, S.Name, S.TypeId, S.Image, S.ByteArrayId, T.IconSrc, T.ColorType , T.Name as TypeName
            FROM Sound S INNER JOIN Type T ON S.TypeId = T.Id
            WHERE S.TypeId = @typeId ;`)
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
                    .query(`DELETE FROM Sound WHERE Id = @id`, (err, result) => {
                        request
                            .query(`DELETE FROM ByteArray WHERE Id = @id`, (err, result) => {
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
    }
}

module.exports = new SoundService();