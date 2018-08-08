<<<<<<< HEAD
class SoundService {
    constructor() {
        this.sounds = [
            { 
                id: 1,
                name: "Project Title 1",
                type: { id: 1, name: "Rock"},
                bytearray: []
            },
            {
                id: 2,
                name: "Project Title 2",
                type: { id: 2, name: "Manelica"},
                bytearray: []
            },
            {
                id: 3,
                name: "Project Title 3",
                type: { id: 3, name: "Rapp"},
                bytearray: []
            },
            {
                id: 4,
                name: "Project Title 4",
                type: { id: 4, name: "Pop"},
                bytearray: []
            },
            { 
                id: 5,
                name: "Project Title 1",
                type: { id: 1, name: "Rock"},
                bytearray: []
            },
            {
                id: 6,
                name: "Project Title 2",
                type: { id: 2, name: "Manelica"},
                bytearray: []
            },
            {
                id: 7,
                name: "Project Title 3",
                type: { id: 3, name: "Rapp"},
                bytearray: []
            },
            {
                id: 8,
                name: "Project Title 4",
                type: { id: 4, name: "Pop"},
                bytearray: []
            },
            { 
                id: 9,
                name: "Project Title 1",
                type: { id: 1, name: "Rock"},
                bytearray: []
            },
            {
                id: 10,
                name: "Project Title 2",
                type: { id: 2, name: "Manelica"},
                bytearray: []
            },
            {
                id: 11,
                name: "Project Title 3",
                type: { id: 3, name: "Rapp"},
                bytearray: []
            },
            {
                id: 12,
                name: "Project Title 4",
                type: { id: 4, name: "Pop"},
                bytearray: []
            }
        ]
        
        this.types = [
            { 
                id: 1,
                name: 'beep'
            },
            { 
                id: 2,
                name: 'boop'
            },
            { 
                id: 3,
                name: 'poop'
            },
            { 
                id: 4,
                name: 'troczz'
            },
            { 
                id: 5,
                name: 'bass'
            },
            { 
                id: 6,
                name: 'guitar'
            }
        ]
    }

    addSounds(data) {
        this.sounds.push({ 
            id: this.sounds.length + 1,
            name: data.name,
            type: { id: data.type, name: this.getTypesById(data.type)[0].name },
            bytearray: data.value
=======
const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class SoundService {
    addSound(data) {
        return DbConnection.executeQuery(`
            INSERT INTO Sound(Name, SoundTypeId) VALUES
            ('${data.name}', ${data.type})
        `).then((result) => {
            return result.rowsAffected[0] === 1;
>>>>>>> dev
        });
    }

    editSound(data, paramId) {
<<<<<<< HEAD
        const insert = {
                id: parseInt(paramId),
                name: data.name,
                type: { id: data.type, name: this.getTypesById(data.type).name },
                bytearray: data.value
        }
        this.sounds[paramId - 1] = insert;
=======
        return DbConnection.executeQuery(`
            UPDATE Sound SET
            Name = '${data.name}',
            SoundTypeId = ${data.type}
            WHERE Id = ${paramId}
        `).then((result) => {
            return result.rowsAffected[0] === 1;
        });
>>>>>>> dev
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