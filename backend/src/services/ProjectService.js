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
        return this.projects;
    }

    getProjectById(id) {
        return this.projects.filter(project => project.id == id);
    }

    addProject(data) {
        const genre = {
            id: data.genreId,
            name: "new gen"
        };

        const newProject = {
            id: Math.floor(Math.random() * 20),
            name: data.name,
            description: data.description,
            genre: genre
        }
        this.projects.push(newProject);
        return true;
    }

    editProject(data, id) {
        const editGenre = {
            id: data.genre.id,
            name: data.genre.name
        };

        const editProject = {
            id: parseInt(id),
            name: data.name,
            description: data.description,
            genre: editGenre
        }

        this.deleteProject(id);
        this.projects.push(editProject);

        return editProject;
    }

    deleteProject(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id == id) {
                this.projects.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

module.exports = new ProjectService();