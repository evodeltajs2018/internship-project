class ProjectService {
    constructor() {
        this.projects = [
            {
                id: 1,
                name: "Project Title 1",
                genre: 1,
                description: "First example project card cause we need something to see but nothing it's ok"
            },
            {
                id: 2,
                name: "Project Title 2",
                genre: 3,
                description: "Second example project card cause we need something to see but nothing it's ok"
            },
            {
                id: 3,
                name: "Project Title 3",
                genre: 5,
                description: "Third example project card cause we need something to see but nothing it's ok"
            },
        ]
    }

    getAllProjects() {
        return this.projects;
    }

    getProjectById(id) {
         for (let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id == id) {
                return this.projects[i];
            }
         }
        return null;
    }
}

module.exports = ProjectService;