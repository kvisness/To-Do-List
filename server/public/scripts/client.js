$(document).ready(function () {
  console.log('jQuery sourced.');
//sets up clicks
  setUpButtonClicks();
  //load previous tasks

});//end document ready

function setUpButtonClicks() {
  $('#addTask').on('click', addtask);
  $('body').on('click', '.deleteTask', deleteHandler);
  $('body').on('click', '.completedTask', updateStatus);
  // end setUpButtonClicks

  // refreshTasks will get all tasks from the server and refresh page
  function refreshTasks() {
    console.log('in refreshTasks');
    $.ajax({
      method: 'GET',
      url: '/tasks',
    })
      .then(function (response) {
        console.log(response);
        appendTasks(response);
      })
      .catch(function (error) {
        console.log('error in GET', error);
      }); //end refreshTasks
  } //ajax call to the server to get tasks

  // Displays an array of tasks to the DOM
  function appendTasks(newTask) {
    console.log('in appendTasks', newTask);
    $('#myTasks').empty();

    for (let i = 0; i < newTask.length; i++) {
      let task = newTask[i];
      // For each new task, append a new row to our table
      let $tr = $('<tr></tr>');
      $tr.append(`<td>${task.request}</td>`);
      $tr.append(`<td>${task.status}</td>`);
      $tr.append(`<td>${task.priority}</td>`);
      $tr.append(`<td>${task.due_date}</td>`);
      $tr.append(`<td>${task.notes}</td>`);
      $tr.append(
        `<td><button class='deleteTask' data-taskid= '${task.id}'>
        Delete
      </button></td>
    `);
      $tr.append(`
      </td><button class='completedTask' data-taskid= '${task.id}'> 
        I Completed This
      </button></td>
    `);
      $('#myTask').append($tr);
    }
  } // end appendTasks

  // Add code for edit & delete buttons
}
function addtask() {
  console.log('in addtask');
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: {
      request: $('#requestIn').val(),
      status: $('#statusIn').val(),
      priority: $('#priorityIn').val(),
      due_date: $('#due_dateIn').val(),
      notes: $('#notesIn').val(),
    }
  })
    .then((response) => {
      
      $('#requestIn').val('');
      $('#statusIn').val('');
      $('#priorityIn').val('');
      $('#due_dateIn').val('');
      $('#notesIn').val('');
    })
    .catch((err) => {
      console.log('Error in client POST', err);
    });
}

function updateStatus(event) {
  console.log('in updateStatus');
  $.ajax({
    method: 'PUT',
    url: `/tasks/${$(event.target).data('id')}`
  })
    .then((result) => {
      res.send(200);
      $(event.target).hide()
    })
    .catch((err) => {
      console.log('Error in client PUT', err);
    });
}

function deleteHandler(event) {
  console.log('Deleting task (Nice work!)');

  const taskId = $(event.target).data('id');

  $.ajax({
    method: 'DELETE',
    url: '/tasks/' + taskId,
  }).then((response) => {
    res.send(200);
  });
}