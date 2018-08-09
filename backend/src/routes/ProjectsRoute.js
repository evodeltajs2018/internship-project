function projectsRoute(app) {
	app.get("/projects", (req, res) => {
		res.json({
			projects: [{
				id:1,title:"Project Title 1",genre:"Rock",description:"First example project card cause we need something to see but nothing it's ok"
			},{
				id:2,title:"Project Title 2",genre:"Pop",description:"Second example project card cause we need something to ses but nothing it's ok"
			},{
				id:3,title:"Project Title 2",genre:"Hip-Hop",description:"Third example project card cause we need something to see but nothing it's ok"
			},{
				id:4,title:"Project Title 4",genre:"R&B",description:"Forth example project card cause we need something to see but nothing it's ok"
			}]
		});
	});
}

module.exports = projectsRoute;