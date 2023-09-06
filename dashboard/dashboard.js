document.addEventListener('DOMContentLoaded', function() {
    var totalPatients = 1200;
    var admittedPatients = 800;
    var dischargedPatients = 400;
    var appointmentList = ['John Doe - Cardiology', 'Jane Smith - Dermatology', 'Mark Johnson - Pediatrics'];
    var emergencyQueue = 10;
    var availableBeds = 5;

    // Update the dashboard widgets with the data
    document.getElementById('totalPatients').textContent = totalPatients;
    document.getElementById('admittedPatients').textContent = admittedPatients;
    document.getElementById('dischargedPatients').textContent = dischargedPatients;

    var appointmentListElement = document.getElementById('appointmentList');
    appointmentList.forEach(function(appointment) {
        var listItem = document.createElement('li');
        listItem.textContent = appointment;
        appointmentListElement.appendChild(listItem);
    });

    document.getElementById('emergencyQueue').textContent = emergencyQueue;
    document.getElementById('availableBeds').textContent = availableBeds;
});
