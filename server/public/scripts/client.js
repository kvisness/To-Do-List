// $(document).ready(function () {
//   console.log("jQuery sourced.");
//   refreshBooks();
//   addClickHandlers();
// });

// function addClickHandlers() {
//   $("#submitBtn").on("click", handleSubmit);
//   $("body").on("click", ".button", deleteHandler);
//   $("body").on("click", ".readThis", readThis);

//   // TODO - Add code for edit & delete buttons
// }
// function deleteHandler(event) {
//   // handle delete button
//   console.log("deleting a book");

//   // the bookid lives on the data attribute of the SPECIFIC button
//   // that was clicked! see the getMusicData() function for how
//   // this happens.
//   const bookId = $(event.target).data("bookid"); //this 'bookid' shoud be lower case as well
//   //alert(`going to delete book with id ${bookId}`);
//   $.ajax({
//     method: "DELETE",
//     url: "/books/" + bookId,
//   }).then((response) => {
//     refreshBooks();
//   });
// }
// function handleSubmit() {
//   console.log("Submit button clicked.");
//   let book = {};
//   book.author = $("#author").val();
//   book.title = $("#title").val();
//   addBook(book);
// }
// function readThis(event) {
//   console.log("Read This button clicked.");
//   let book = {};
//   book.author = $("#author").val();
//   book.title = $("#title").val();
//   const bookId = $(event.target).data("bookid"); //this 'bookid' shoud be lower case as well
//   $.ajax({
//     method: "PUT",
//     url: "/books/" + bookId,
//   }).then((response) => {
//     refreshBooks();
//   });
// }

// // adds a book to the database
// function addBook(bookToAdd) {
//   $.ajax({
//     type: "POST",
//     url: "/books",
//     data: bookToAdd,
//   })
//     .then(function (response) {
//       console.log("Response from server.", response);
//       refreshBooks();
//     })
//     .catch(function (error) {
//       console.log("Error in POST", error);
//       alert("Unable to add book at this time. Please try again later.");
//     });
// }

// // refreshBooks will get all books from the server and render to page
// function refreshBooks() {
//   $.ajax({
//     type: "GET",
//     url: "/books",
//   })
//     .then(function (response) {
//       console.log(response);
//       renderBooks(response);
//     })
//     .catch(function (error) {
//       console.log("error in GET", error);
//     });
// }

// // Displays an array of books to the DOM
// function renderBooks(books) {
//   $("#bookShelf").empty();

//   for (let i = 0; i < books.length; i += 1) {
//     let book = books[i];
//     // For each book, append a new row to our table
//     let $tr = $("<tr></tr>");
//     $tr.data("book", book);
//     $tr.append(`<td>${book.title}</td>`);
//     $tr.append(`<td>${book.author}</td>`);
//     $tr.append(`<td>${book.status}</td>`);
//     $tr.append(
//       `<td><button class="button" data-bookid= "${book.id}">
//         Delete
//       </button></td>
//     `
//     );
//     $tr.append(`
//       </td><button class="readThis" data-bookid= "${book.id}">
//         I Read This
//       </button></td>
//     `);
//     $("#bookShelf").append($tr);
//   }
// }
