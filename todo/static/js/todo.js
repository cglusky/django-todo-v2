$(document).ready(function () {

  // Django requirement
  let csrfToken = $("input[name=csrfmiddlewaretoken]").val();
  
  // Submit task input on click and append new task to list
  $("#createTaskBtn").click(function () {
    let serializedData = $("#createTaskForm").serialize();

    $.ajax({
      type: "post",
      url: $("#createTaskForm").data("url"),
      data: serializedData,
      success: function (response) {
        $("#taskList").append('<div class="card mb-1" data-id="' + response.task.id + '"><div class="card-body"><button type="button" id="completeTaskBtn" class="btn btn-outline-secondary far fa-check-square"></button><span class="ml-1">' + response.task.title + '</span><button type="button" id="deleteTaskBtn" class="btn btn-outline-danger btn-sm float-right fas fa-trash-alt"></button></div></div>')
    }
    });
    // Clear input field after submission
    $("#createTaskFld").val("");
   
  });

  // Handle implicit submit of task from enter key
  $("#createTaskFld").keypress(function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      $("#createTaskBtn").click();
    };
  });
  
  // Handle completed items via click of check box
  $("button.completeTaskBtn").click(function () {
     let dataID = $(this).data("id");
      $.ajax({
        type: "post",
        url: "/tasks/" + dataID + "/completed/",
        data: {
          csrfmiddlewaretoken: csrfToken,
          id: dataID
        },
        success: function () {
          let currentBtn = $('button.completeTaskBtn[data-id="' + dataID + '"]');
          currentBtn.removeClass('btn-outline-secondary').addClass('btn-success');
        }
      })
    })
})