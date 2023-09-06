$(document).ready(function() {
  var calendarEl = document.getElementById('calendarContainer');
  var addAppointmentBtn = $('#addAppointmentBtn');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    // Customize your calendar options here
  });

  addAppointmentBtn.on('click', function() {
    // Code to add an appointment goes here
    var appointment = {
      title: 'New Appointment',
      start: new Date(),
      end: new Date(),
      color: 'red'
    };

    calendar.addEvent(appointment);
  });

  calendar.render();
});
