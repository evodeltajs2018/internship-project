class ProjectsService {
    constructor() {
        this.projects = [{
            id: 1, title: "Scream Inside", genre: "Rock", description: "First example project card cause we need something to see but nothing it's ok"
        }, {
            id: 2, title: "Cherry Pop Pop", genre: "Pop", description: "Second example project card cause we need something to ses but nothing it's ok"
        }, {
            id: 3, title: "In Da Hood", genre: "Hip-Hop", description: "Third example project card cause we need something to see but nothing it's ok"
        }, {
            id: 4, title: "Self", genre: "R&B", description: "Forth example project card cause we need something to see but nothing it's ok"
        }, {
            id: 5, title: "Save Yourself", genre: "R&B", description: "Fifth example project card cause we need something to see but nothing it's ok"
        }, {
            id: 6, title: "Life Is Easy", genre: "R&B", description: "Sixth example project card cause we need something to see but nothing it's ok"
        }, {
            id: 7, title: "Never Too Much", genre: "R&B", description: "Seventh example project card cause we need something to see but nothing it's ok"
        },{
            id: 8, title: "Jesus Is Life", genre: "Rap", description: "Eighth example project card cause we need something to see but nothing it's ok"
        }];
    }

    getAll() {
        return this.projects;
    }

    deleteById(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id == id) {
                this.projects.splice(i, 1);
            }
        }
    }

}

module.exports = ProjectsService;