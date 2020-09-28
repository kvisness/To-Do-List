const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// Get all tasks
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "tasklist" ORDER BY "due_date";`;
  pool.query(queryText)
    .then((result) => {
      // Sends back the results in an object
      console.log('get request is working', result.rows)
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('error getting all tasks', queryText, err);
      res.sendStatus(500);
    });
});

// Adds a new task to the task list
// Request body must be a task object with a all info.
router.post('/', (req, res) => {
  let newTask = req.body;
  console.log(`Adding new task`, newTask);

  let queryText = `INSERT INTO "tasklist" ("request", "status", "priority", "due_date", "notes") VALUES ($1, $2, $3, $4, $5);`;
  pool.query(queryText, [newTask.request, newTask.status, newTask.priority, newTask.due_date, newTask.notes])
    .then((result) => {
      res.status(201).send('New task added!')
    })
    .catch((err) => {
      console.log(`Error adding new task`, queryText, err);
      res.sendStatus(500);
    });
});

// PUT
// this should update a task to show that it has been completed
// Request must include a parameter indicating what task to update - the id
// Request body must include the content to update - the status

router.put('/:id', (req, res) => {
  let task = req.body; // task with updated content
  let id = req.params.id; // id of the task to update
  let queryText = `UPDATE "tasklist" SET "status" = 'Complete' WHERE "id"=$1;`;
  pool.query(queryText, [id])
    .then((result) => {
      res.send('Sucessful Status Update to Complete')
    })
    .catch((err) => {
      console.log(`Error didn't update task status`, queryText, err);
      res.status(400).send('Task not updated...');
    });
});
// DELETE
// Removes a task after it has been completed.
// Request must include a parameter indicating what task to update - the id
router.delete('/:id', (req, res) => {
  console.log(req.params);
  let id = req.params.id; // id of the thing to delete
  let queryText = `DELETE FROM "tasklist" WHERE "id"=$1;`;
  console.log('Delete route called with id of', id);

  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send('Successful deletion of completed task')
    })
    .catch((err) => {
      console.log(`Error didn't delete task`, queryText, err);
      res.sendStatus(500);
    });
});

module.exports = router;
