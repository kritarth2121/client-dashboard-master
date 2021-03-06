// function csrfSafeMethod(method) {
//     // these HTTP methods do not require CSRF protection
//     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
// }
// $.ajaxSetup({
//     beforeSend: function(xhr, settings) {
//         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         }
//     }
// });


function sortaTable() {

  $( ".big-block" ).sortable({
    connectWith: ".big-block",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all",
    dropOnEmpty: true,
    stop: dropHandler,
  });

  $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
      .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  $( ".portlet-toggle" ).on( "click", function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-plusthick ui-icon-minusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
  });
}


var dropHandler = function(event, ui){
  // console.log(event);
  // console.log(event.originalEvent);
  // console.log(event.originalEvent.target);
  var taskID = event.originalEvent.target.parentNode.id;
  var portletStatus = $(event.originalEvent.target.parentNode)[0].parentNode.id;
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
  var data = { status: portletStatus };


  var settings = {
              beforeSend: function(xhr, settings) { xhr.setRequestHeader("X-CSRFToken", csrftoken); },
              url: "/api/task/" + taskID + '/',
              type: 'PATCH',
              data: data
      }

  $.ajax(settings);
  // var portletID = ($(this).parent().attr('id'));
  // var portletStatus = ($(this).parents('.big-block').attr('id'));  // TODO: make this thing change to the other thing
  // console.log(portletStatus);
};

function portletEdit() {
    $('.portlet-content').dblclick(function(){
    var portletID = ($(this).parent().attr('id'));
    var portletStatus = ($(this).parents('.big-block').attr('id'));
    //window.open("{%url 'post-update' %}" + "/" +portletID);
    //location.href="{% url 'post-update' %}" + "/" +portletID;
    //window.location = 'http://127.0.0.1:8000/post/' + portletID+'/update';
    window.location = window.location.protocol+'/post/' + portletID+'/update';
  });
}


function getTasks() {
  var taskApi = "/api/task/?name={{name}}";
  $.ajax({url: taskApi, success: function(result) {
    var taskLength = result.results.length;

    for(var i = 0; i < taskLength; i++){
      var taskName = result.results[i].title;
      var taskStatus = result.results[i].status;
      var taskDescription = result.results[i].description;
      var taskID = result.results[i].id;
console.log(taskStatus);
      if(taskStatus == "pending"){
        $('div.big-block#pending').append("<div class=portlet id="+ taskID +">" + "<div class=portlet-header>" + taskName + "</div>" + "<div class=portlet-content>" + taskDescription + "</div>" + "</div>");
      }
      else if (taskStatus == "progress") {
        $('div.big-block#progress').append("<div class=portlet id="+ taskID +">" + "<div class=portlet-header>" + taskName + "</div>" + "<div class=portlet-content>" + taskDescription + "</div>" + "</div>");
      }
      else if (taskStatus == "pendingreview") {
        $('div.big-block#pendingreview').append("<div class=portlet id="+ taskID +">" + "<div class=portlet-header>" + taskName + "</div>" + "<div class=portlet-content>" + taskDescription + "</div>" + "</div>");
      }

      else if (taskStatus == "feedback") {
        $('div.big-block#feedback').append("<div class=portlet id="+ taskID +">" + "<div class=portlet-header>" + taskName + "</div>" + "<div class=portlet-content>" + taskDescription + "</div>" + "</div>");
      }
      else if (taskStatus == "completed") {
        $('div.big-block#completed').append("<div class=portlet id="+ taskID +">" + "<div class=portlet-header>" + taskName + "</div>" + "<div class=portlet-content>" + taskDescription + "</div>" + "</div>");
      }
    }
    sortaTable();
    portletEdit();
    }
  });
}

$(getTasks)


$('new_task_form').on('submit', function(event) {
  event.preventDefault();
  //console.log("form submitted!");
  new_task();
});

function new_task() {
  $.ajax({
    url: "/api/task/",
    type: "POST",
    data: { new_task: $("#new_task_wrapper").val() },

    success: function(json) {
      $('#new_task_wrapper').val('');
    }
  });
};

// -------------Popup window for new task--------------

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
