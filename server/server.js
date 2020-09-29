const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;//looks for heroku's port value, if undefined it uses 5000 as default
const taskRouter = require("./routes/taskRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

// ROUTES
app.use("/tasks", taskRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
