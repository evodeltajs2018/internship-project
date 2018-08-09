const SoundController = require("./routes/SoundController");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ProjectController = require("./routes/ProjectController");
const projectController = new ProjectController(app);
new SoundController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
