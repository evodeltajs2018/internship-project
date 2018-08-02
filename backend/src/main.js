const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

require("./routes/ProjectsRoute")(app);
const SoundsController = require("./routes/SoundsController.js");
let soundsController = new SoundsController(app);

app.listen(5000, () => console.log("Listening on port 5000..."));
