const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());


const SoundsController = require("./routes/SoundsController.js");
let soundsController = new SoundsController(app);
const ProjectController = require("./routes/ProjectController");
const projectController = new ProjectController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
