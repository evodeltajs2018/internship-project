const SoundController = require("./routes/SoundController");
const GenreController = require("./routes/GenreController");
const ProjectController = require("./routes/ProjectController");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

new SoundController(app);
new GenreController(app);
new ProjectController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
