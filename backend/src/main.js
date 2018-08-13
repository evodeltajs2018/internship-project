const GenreRoute = require("./routes/GenreRoute");
const ProjectRoute = require("./routes/ProjectRoute");
const SoundRoute = require("./routes/SoundRoute");

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

new GenreRoute(app);
new ProjectRoute(app);
new SoundRoute(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
