const DbConnection = require("../dbConnection/Connection");
const DbMapper = require("../utils/DbMapper");

class ProjectService {
    constructor() {
        this.projects = [{
                id: 1,
                name: "Project Title 1",
                genre: {
                    id: 1,
                    name: "Rock"
                },
                description: "First example project card cause we need something to see but nothing it's ok"
            },
            {
                id: 2,
                name: "Project Title 2",
                genre: {
                    id: 3,
                    name: "Electronic"
                },
                description: "Second example project card cause we need something to see but nothing it's ok"
            },
            {
                id: 3,
                name: "Project Title 3",
                genre: {
                    id: 5,
                    name: "Clasic"
                },
                description: "Third example project card cause we need something to see but nothing it's ok"
            },
        ]
    }

    getAllProjects() {
        return DbConnection.executeQuery(`
            SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName
            FROM Project P INNER JOIN Genre G ON P.GenreId = G.Id
            ORDER BY P.Name
            `)
            .then((result) => {
                return result.recordset.map((record) => DbMapper.mapProject(record));
            });
    }

    getProjectById(id) {
        return DbConnection.executeQuery(`
            SELECT P.Id, P.Name, P.Description, P.GenreId, G.Name AS GenreName
            FROM Project P INNER JOIN Genre G ON P.GenreId = G.Id
            WHERE P.Id LIKE '${id}'
        `)
            .then((result) => {
                return result.recordset.map((record) => DbMapper.mapProject(record));
            });
    }

    addProject(project) {
        return DbConnection.executeQuery(`
            INSERT INTO Project
                (Name
                ,GenreId
                ,Description)
            VALUES 
                ('${project.name}', 
                  ${project.genre.id}, 
                 '${project.description}')
        `)
        .then((result) => {
            return result.rowsAffected[0] === 1;
        });
    }

    editProject(project) {
        return DbConnection.executeQuery(`
            UPDATE Project
            SET 
                Name = '${project.name}',
                GenreId = ${project.genre.id},
                Description = '${project.description}'
            WHERE Id = ${project.id};  
        `)
        .then((result) => {
            return result.rowsAffected[0] === 1;
        });
    }

    deleteProject(id) {
        return DbConnection.executeQuery(`
        DELETE FROM Project
        WHERE Id = ${id};  
    `)
    .then((result) => {
        return result.rowsAffected[0] === 1;
    });
    }
}

module.exports = new ProjectService();