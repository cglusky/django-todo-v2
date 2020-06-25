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
        $("#taskList").prepend('<div class="card mb-1" data-id="' + response.task.id + '"><div class="card-body"><button type="button" class="completeTaskBtn btn btn-sm btn-outline-secondary fa fa-square-o" data-id="' + response.task.id + '"></button><span class="ml-1">' + response.task.title + '</span><button type="button" class=" deleteTaskBtn btn btn-outline-danger btn-sm float-right fas fa-trash-alt" data-id="' + response.task.id + '"></button></div></div>')
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
    }
  });
  
  // Handle completed items via click of button
  // Selector for parent required to register onclick after ajax prepend
  $("#taskList").on("click", "button.completeTaskBtn", function () {
     
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
        currentBtn.removeClass('btn-outline-secondary btn-sm fa fa-square-o').addClass('btn-success btn-sm far fa-check-square');
        let currentCard = $('.card[data-id="' + dataID + '"]')
        // currentCard.fadeOut(500, function(){ $(this).detach().appendTo("#taskList");});
        currentCard.fadeOut(500, function(){ 
          $(this).detach().appendTo("#taskList");
        }).fadeIn();
        //setTimeout(1000, function(){currentCard.appendTo("#taskList")});
        //currentCard.appendTo("#taskList");
      }
    });
  });

  // Handle deleting tasks via click of button
  // Selector for parent required to register onclick after ajax prepend
  $("#taskList").on("click", "button.deleteTaskBtn", function () {
     
    let dataID = $(this).data("id");
      
    $.ajax({
      type: "post",
      url: "/tasks/" + dataID + "/delete/",
      data: {
        csrfmiddlewaretoken: csrfToken,
        id: dataID
      },
      success: function () {
        $('.card[data-id="' + dataID + '"]').fadeOut(300, function(){ $(this).remove();});
      }
    });
  });

});