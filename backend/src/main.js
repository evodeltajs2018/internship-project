const SoundController = require("./routes/SoundController");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

require("./routes/ProjectsRoute")(app);
new SoundController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
