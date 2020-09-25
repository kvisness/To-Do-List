const express = require("express");
const router = express.Router();

const pool = require("../modules/pool");

// Get 
router.get("/", (req, res) => {
  let queryText = 
  pool
    .query(queryText)
    .then((result) => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting books", error);
      res.sendStatus(500);
    });
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post("/", (req, res) => {
  let ...= req.body;
  //console.log(`Adding book`, newBook);

  let queryText = ...;
  //pool.query(queryText, [newBook.author, newBook.title])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});

// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status

router.put("/:id", (req, res) => {
  let book = req.body; // Book with updated content
  let id = req.params.id; // id of the book to update
  // TODO - REPLACE BELOW WITH YOUR CODE
  debugger;
  let queryText = `UPDATE "books" SET "status" = 'Read' WHERE "id"=$1;`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send("Sucessful Status Update to Read");
      console.log(`Updating book ${id} with `, book);
    })

    .catch((error) => {
      console.log(`Error didn't update book status`, error);
      res.sendStatus(500);
    });
});
// TODO - DELETE
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
router.delete("/:id", (req, res) => {
  let id = req.params.id; // id of the thing to delete
  console.log("Delete route called with id of", id);

  // TODO - REPLACE BELOW WITH YOUR CODE
  let queryText = 'DELETE FROM "books" WHERE "id"=$1';
  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(`Error didn't delete book`, error);
      res.sendStatus(500);
    });
});

module.exports = router;