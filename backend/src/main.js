const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const ProjectController = require("./routes/ProjectController");
// require("./routes/ProjectController")(app);
const projectController = new ProjectController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
