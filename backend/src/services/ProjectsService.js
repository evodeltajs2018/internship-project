class ProjectsService{
    constructor(){
        this.projects = [{
            id:1,title:"Project Title 1",genre:"Rock",description:"First example project card cause we need something to see but nothing it's ok"
        },{
            id:2,title:"Project Title 2",genre:"Pop",description:"Second example project card cause we need something to ses but nothing it's ok"
        },{
            id:3,title:"Project Title 3",genre:"Hip-Hop",description:"Third example project card cause we need something to see but nothing it's ok"
        },{
            id:4,title:"Project Title 4",genre:"R&B",description:"Forth example project card cause we need something to see but nothing it's ok"
        },{
            id:5,title:"Project Title 5",genre:"R&B",description:"Fifth example project card cause we need something to see but nothing it's ok"
        },{
            id:6,title:"Project Title 6",genre:"R&B",description:"Sixth example project card cause we need something to see but nothing it's ok"
        },{
            id:7,title:"Project Title 7",genre:"R&B",description:"Seventh example project card cause we need something to see but nothing it's ok"
        }];
    }

    getAll(){
        return this.projects;
    }

    deleteById(id){
        for(let i=0; i<this.projects.length; i++){
            if(this.projects[i].id == id){
                this.projects.splice(i,1);
            }
        }
    }
    
}

module.exports = ProjectsService;