var day = (moment().format("DDDDYYYY"));
var dayInc = 0;
var hour = moment().hours();

function renderDay(){
  $(document).ready(function() {
//setup Page header
    var dayPageFormatted = (moment().add(dayInc, 'd')).format("dddd, MMMM Do YYYY");
    $("#currentDay").text(dayPageFormatted);
    var dayTaskFormatted = (moment().add(dayInc, 'd')).format("DDDDYYYY");
    var tasksArray = JSON.parse(localStorage.getItem(dayTaskFormatted));
    if (tasksArray){
      array1 = tasksArray;
     }else{
      var array1 = [];
    };    
    $('body').append(
      $('<div>').prop({
          id: "container",
          // innerHTML: 'Hi there!',
          className: "container"
      })
    );
//setup container 
    var hoursEl = document.getElementById("container");
//remove any existing tasks
    while (hoursEl.hasChildNodes()) {  
      hoursEl.removeChild(hoursEl.firstChild);
    };
//setup time-blocks hour info
    for (let i = 0; i < 9; i++) {
      intId = (i + 9);
      strId = ('#' + intId);
      timeId = (i + 9);
      if (timeId > 12){
        timeId = (timeId - 12) + "pm";
      }else if (timeId == 12){
        timeId = timeId + "pm"
      }else{  
        timeId = timeId + "am";
      };
      var timeBlock =  $("<div>")
        .addClass("row time-block")
        .attr("id", intId);
//color logic
        if(dayInc < 0){
        timeBlock.addClass("past")
      }else if (dayInc == 0){
        if (hour < intId){
          timeBlock.addClass("future")
        }else if (hour == intId){
          timeBlock.addClass("present")
        }else if (hour > intId){
          timeBlock.addClass("past")
        }
      }else if(dayInc > 0){
        timeBlock.addClass("future")
      }
// back to the time-block (hour-task-savebtn)
      $('#container').append(timeBlock);
      var taskHour =  $("<div>")
        .addClass("col-1 hour")
        .text(timeId);
      var taskArea = $("<textarea>")
        .addClass("col-10 task")
        .attr("id", i);
      var taskSave = $("<button>")
        .addClass("col-1 saveBtn")
        .text('Save');
//append to DOM 
      $(strId).append(taskHour, taskArea, taskSave);
    };
//save action for the button    
    $(".saveBtn").click(function () {
      var time = $(this).parent().attr("id");
      var task = $(this).siblings(".task").val();
      array1[time - 9] = task;
//save data as key,value: dayyear, array of tasks per hour
      localStorage.setItem(dayTaskFormatted , JSON.stringify(array1));
    });
//layout any existing tasks    
  loadTasks();
  });
};
// Render the day  
renderDay();

//subtract a day
$("#subDay").click(function () {
  dayInc = dayInc - 1;
//render new day  
  renderDay();
});

//add a day
$("#addDay").click(function () {
  dayInc = dayInc + 1;
//render a new day
  renderDay();
});

function loadTasks(){
  var dayTaskFormatted = (moment().add(dayInc, 'd')).format("DDDDYYYY");
  var tasksArray = JSON.parse(localStorage.getItem(dayTaskFormatted));
//parse out the tasks for the day
  if (tasksArray){
    for (let i = 0; i < tasksArray.length; i++) {
      var taskId = ('#' + i);
      var taskText = tasksArray[i];
      $(taskId).text(taskText);
    };
  };    
};


