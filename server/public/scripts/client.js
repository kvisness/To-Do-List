$(document).ready(function () {
  console.log("jQuery sourced.");
  //sets up clicks
  setUpButtonClicks();
  //load previous tasks
  getTasks();
}); //end document ready

function setUpButtonClicks() {
  $("#addTask").on("click", addTask);
  $("body").on("click", ".deleteTask", deleteHandler);
  $("body").on("click", ".completedTask", updateStatus);
  // end setUpButtonClicks
}
// getTasks will get all tasks from the server
function getTasks() {
  console.log("in getTasks");
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      console.log("getTasks is working", response);
      appendTasks(response);
    })
    .catch(function (error) {
      console.log("error in GET", error);
    }); //end refreshTasks
} //ajax call to the server to get tasks

// Displays an array of tasks to the DOM
function appendTasks(newTask) {
  console.log("in appendTasks", newTask);
  $('#myTasks').empty();
  for (let i = 0; i < newTask.length; i++) {
    let task = newTask[i];
    // For each new task, append a new row to our table
    let $tr = $("<tr></tr>");
    $tr.append(`<td>${task.request}</td>`);
    $tr.append(`<td>${task.status}</td>`);
    $tr.append(`<td>${task.priority}</td>`);
    $tr.append(`<td>${task.due_date}</td>`);
    $tr.append(`<td>${task.notes}</td>`);

    if (task.status != "Complete") {
      $tr.append(`</td><button class='completedTask' data-taskid= '${task.id}'> 
        Click to Complete</button></td>`);
      //need to set this up so the background of the row turns green for completed task
    } else {$tr.append(`</td><button class='completedTask' data-taskid= '${task.id}'> 
        I Completed This</button></td>`).css("background-color", "green");
}
    $tr.append(`<td><button class='deleteTask' data-taskid= '${task.id}'>
        Delete
      </button></td>`);
      $("#myTasks").append($tr);
      
  } // end appendTasks
} // Add code for edit & delete buttons
function addTask() {
  console.log("in addtask");
  $.ajax({
    method: "POST",
    url: "/tasks",
    data: {
      request: $("#requestIn").val(),  
      status: $("#statusIn").val(),
      priority: $("#priorityIn").val(),
      due_date: $("#due_dateIn").val(),
      notes: $("#notesIn").val(),
    },
  })
    .then((response) => {
        console.log('client POST .then is working');
      getTasks();
      $("#requestIn").val("");
      $("#statusIn").val("");
      $("#priorityIn").val("");
      $("#due_dateIn").val("");
      $("#notesIn").val("");
    })
    .catch((err) => {
      console.log("Error in client POST", err);
    });
} //end addTasks

function updateStatus(event) {
  console.log("in updateStatus");
  $.ajax({
    method: "PUT",
    url: `/tasks/${$(event.target).data("taskid")}`,
  }) 
    .then((result) => {
      getTasks();
      $(event.target).hide();
    })
    .catch((err) => {
      console.log("Error in client PUT", err);
    });
}

function deleteHandler(event) {
  console.log("Deleting task (Nice work!)");

  const taskId = $(event.target).data("taskid");

  $.ajax({
    method: "DELETE",
    url: "/tasks/" + taskId,
  }).then((response) => {
    getTasks();
  });
}
