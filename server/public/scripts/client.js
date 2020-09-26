$(document).ready(function () {
  console.log('jQuery sourced.');
  refreshTasks();//load previous tasks
  setUpButtonClicks();
});

function setUpButtonClicks() {
  $('#submitBtn').on('click', handleSubmit);
  $('body').on('click', '.button', deleteHandler);
  $('body').on('click', '.readThis', readThis);

  // TODO - Add code for edit & delete buttons
}
function deleteHandler(event) {
  // handler for delete button
  console.log('deleting a task');

  // the taskid lives on the data attribute of the SPECIFIC button
  // that was clicked! see the getMusicData() function for how
  // this happens.
  const taskId = $(event.target).data('taskid'); //this 'taskid' shoud be lower case as well
  //alert(`going to delete task with id ${taskId}`);
  $.ajax({
    method: 'DELETE',
    url: '/tasks/' + taskId,
  }).then((response) => {
    refreshTasks();
  });
}
function handleSubmit() {
  console.log('Submit button clicked.');
  let task = {};
  task.author = $('#author').val();
  task.title = $('#title').val();
  addtask(task);
}
function readThis(event) {
  console.log('Read This button clicked.');
  let task = {};
  task.author = $('#author').val();
  task.title = $('#title').val();
  const taskId = $(event.target).data('taskid'); //this 'taskid' shoud be lower case as well
  $.ajax({
    method: 'PUT',
    url: '/tasks/' + taskId,
  }).then((response) => {
    refreshTasks();
  });
}

// adds a task to the database
function addtask(taskToAdd) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskToAdd,
  })
    .then(function (response) {
      console.log('Response from server.', response);
      refreshTasks();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert('Unable to add task at this time. Please try again later.');
    });
}

// refreshTasks will get all tasks from the server and render to page
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      console.log(response);
      rendertasks(response);
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
}

// Displays an array of tasks to the DOM
function rendertasks(tasks) {
  $("#myTasks").empty();

  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
    // For each task, append a new row to our table
    let $tr = $('<tr></tr>');
    $tr.data('task', task);
    $tr.append(`<td>${task.request}</td>`);
    $tr.append(`<td>${task.status}</td>`);
    $tr.append(`<td>${task.priority}</td>`);
    $tr.append(`<td>${task.due-date}</td>`);
    $tr.append(`<td>${task.notes}</td>`);
    $tr.append(
      `<td><button class='button' data-taskid= '${task.id}'>
        Delete
      </button></td>
    `
    );
    $tr.append(`
      </td><button class='newTask' data-taskid= '${task.id}'>
        I Completed This
      </button></td>
    `);
    $('#myTask').append($tr);
  }
}
