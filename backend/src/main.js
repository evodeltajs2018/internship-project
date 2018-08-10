const SoundController = require("./routes/SoundController");
const GenreController = require("./routes/GenreController");
const ProjectController = require("./routes/ProjectController");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

new SoundController(app);
new GenreController(app);
new ProjectController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
