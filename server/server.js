const express = require("express");
const bodyParser = require("body-parser");
const taskListRouter = require("./routes/task.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", taskListRouter);//THIS NEEDS TO BE UPDATED TO NEW DATABASE info

// Serve back static files by default
app.use(express.static("server/public"));

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
