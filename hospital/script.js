var notifToggle = "enabled";
var logToggle = "enabled";
function Alert(text, state) {
    var notification = $(`
    <div class="alert"></div>
    `)

    var alert = notification;
    
    if (state === 'success') {
        alert.removeClass("info error warning");
        alert.addClass('success');
        alert.html('<i class="ion-android-checkbox-outline"></i> ' + text);
    } else if (state === 'error') {
        alert.removeClass("info success warning");
        alert.addClass('error');
        alert.html('<i class="ion-close-circled"></i> ' + text);
    } else if (state === 'warning') {
        alert.removeClass("info error success");
        alert.addClass('warning');
        alert.html('<i class="ion-android-warning"></i> ' + text);
    } else if (state === 'info') {
        alert.removeClass("success error warning");
        alert.addClass('info');
        alert.html('<i class="ion-information-circled"></i> ' + text);
    }
    
    if (notifToggle === "enabled") {
        $('.notificationContainer').append(alert);
        setTimeout(function() {
            alert.slideUp("slow")
            alert.remove();
        }, 2000);
    }else{
        console.log("notification blocked")
    }
}
function newPatientText(name){
    var container = $(".patient-list")
    let newPatientText = $(`
        <li class="patientAlarm dark">${name}</li>
    `)
    container.append(newPatientText);
    Alert("Patient Added To Patient List", "success")
    logUpdate("Patient Added To Patient List", name)
}
function newStaffText(name){
    var ClassContent = ["available", "unavailable"] 
    var Class = ClassContent[Math.floor(Math.random() * ClassContent.length)];
    var text;
    if(Class === "available"){
        text = "Available"
    }else{
        text = "Unavailable"
    }
    var container = $(".staffAvailability")
    let newStaff = $(`
        <strong>${name} : </strong> <span class="${Class}">${text}</span>
    `)
    container.append(newStaff)
    Alert("Staff Added To Staff List", "success")
    logUpdate("Staff Added To Staff List", name)
}
function logUpdate(text, name) {
    if (logToggle === "enabled") {
        let currentDateTime = getCurrentDateTime();
        let newLog = $(`
            <div id="log">
                <strong>${text}</strong> ${name} - ${currentDateTime}
            </div>
        `);
        $(".logs").append(newLog);
        Alert("log updated", "info");
    }else{
        Alert("Logs Disabled", "error")
    }
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}
function appendAppointmentToCalendar(date) {
      // Get the current date and time

      // Create a new event for the calendar
      var event = {
        title: 'New Appointment',
        start: date,
        end: date,
        allDay: false
      };
      $('.mainCalendar').fullCalendar('renderEvent', event, true);
    }
function addAppointment(name, condition, date, picture) {
    
    let appointment = $(`
    <div class="appointmentElement">
                    <div class="imageContainer">
                        <img src="${picture}" alt="">
                    </div>
                    <div class="contentContainer">
                        <h3>${name}</h3>
                        <p><strong>Condition:</strong> ${condition}</p>
                        <p><strong>Date:</strong><span id="appointmentDate">${date}</span> </p>
                    </div>
                    <button class="deleteAppointment">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
    `)
    Alert("Patient Appointment added", "info");
    var logMessage = `Patient Appointment added, for ${name}, at `
    logUpdate(logMessage,date)
    $(".appointments").append(appointment)
    appendAppointmentToCalendar(date);
    logUpdate("added appointment to calendar for", date)
    setTimeout(() => {
        newPatientText(name)
    }, 200);
}
class StaffElement {
    constructor(name, role, department, phone, email, qualifications, experience, specializations, availability, picture) {
        this.name = name;
        this.role = role;
        this.department = department;
        this.phone = phone;
        this.email = email;
        this.qualifications = qualifications;
        this.experience = experience;
        this.specializations = specializations;
        this.availability = availability;
        this.picture = picture;
    }
    
    createElement() {
        try {
            
            let newStaff = $(`
                <div class="card dark staff-card">
                    <div class="info dark staff-info">
                        <button id="removeStaff">Remove</button>
                        <h3 class="name dark staff-name">${this.name}</h3>
                        <p class="role dark staff-role">${this.role}</p>
                        <p class="department dark staff-department">${this.department}</p>
                        <ul class="contacts dark staff-contacts">
                            <li><span class="contact-label">Phone:</span> ${this.phone}</li>
                            <li><span class="contact-label">Email:</span> ${this.email}</li>
                        </ul>
                        <p class="qualifications dark staff-qualifications">${this.qualifications}</p>
                        <p class="experience dark staff-experience">${this.experience}</p>
                        <p class="specializations dark staff-specializations">Specializations: ${this.specializations}</p>
                        <p class="availability dark staff-availability">Availability: ${this.availability}</p>
                    </div>
                    <img src="${this.picture}" alt="Staff Photo" class="photo staff-photo">
                </div>
            `);
            
            return newStaff;
        } catch (error) {
            Alert(error.message, 'error');
            return null;
        }
    }
}

class patientElement{
    constructor(name, age, gender, condition, contact, email, appointment, picture, state) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.condition = condition;
        this.contact = contact;
        this.email = email;
        this. appointment = appointment;
        this.picture = picture;
        this.state = state;
    }
    createElement(){
        try{
        let newPatient = $(`
            <div class="card dark patient-card">
                    <button id="menuBtn">...</button>
                    <div id="elementMenu">
                        <button id="removePatient">Remove</button>
                        <button id="admitPatient">Admit</button>
                    </div>
                    <div class="info dark patient-info">
                        <h3 class="name dark patient-name">${this.name}</h3>
                        <p class="age dark patient-age">Age: ${this.age}</p>
                        <p class="gender dark patient-gender">Gender: ${this.gender}</p>
                        <p class="condition dark patient-condition">Condition: ${this.condition}</p>
                        <p class="contact dark patient-contact">Contact: ${this.number}</p>
                        <p class="email dark patient-email">Email: ${this.email}</p>
                        <p class="appointment dark patient-appointment">Next Appointment: ${this.appointment}</p>
                    </div>
                    <img src="${this.picture}" alt="Patient Photo" class="photo patient-photo">
                </div>
        `)
        return newPatient;
        }catch (error) {
            Alert(error.message, 'error');
            return null;
        }
    }
}




$(document).ready(function() {
    var admitted = 0;
    var inWaiting = 1;
    function updateMeter() {

        var totalPatients= admitted + inWaiting;
        var equation = Math.round((admitted * 100)/totalPatients);
        var fill = $(".filling")
        var currentWidth = parseFloat(fill.width) || 0;
        var newWidth = Math.round(currentWidth) + equation;
        console.log(equation);
        fill.animate({
            width: newWidth + "%"
        })
        $("#admittedDataContainer").text(admitted)
        $("#notAdmittedDataContainer").text(inWaiting)
    }
    updateMeter()
    var randomNumber = Math.floor(Math.random() * -101);
    $(".patients").slideUp()
    $(".settings").slideUp();
    $(".reports").slideUp();
    $(".alert").slideUp();
    $(".creator").slideUp();
    $(".creatorSection").slideUp();
    $(".staffSection").slideUp();
    $(".patientSection").slideUp();
    $(".dashboard").slideUp()
    $(".logs").slideUp()
    $(".appointments").slideUp()
    $("#elementMenu").slideUp();
    $('.mainCalendar').fullCalendar({
    // Configure the calendar options here
    // For example:
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultView: 'month',
    events: [
      // Add more events as needed
    ]
  });


    $("#staff").click(function() {
        $(".dashboard").slideUp()
        $(".staff").css({
            zIndex: 2
        });
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".logs").css({zIndex: randomNumber});
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".logs").slideUp()
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".staff").slideDown()
        $(".patients").slideUp()
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        Alert("Changed to staff", "success");
    });

    $("#patient").click(function() {
        console.log("patient button clicked");
        $(".staff").slideUp()
        $(".patients").slideDown()
        $(".dashboard").slideUp()
        $(".patients").css({
            zIndex: 2
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({zIndex: randomNumber});
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        $(".logs").slideUp()
        Alert("Changed to patients", "success");
    });
    $('#auditlogs').click(function(){
        $(".dashboard").slideUp()
        $(".logs").slideDown();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({
            zIndex: 2
        });
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        Alert("Changed to Audit Logs", "success");
    });
    $("#dashboard").click(function(){
        $(".logs").slideUp();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({
            zIndex: randomNumber
        });
        $(".dashboard").slideDown()
        $(".dashboard").css({
            zIndex: 2
        });
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        Alert("Changed to Dashboard", "success");
    });
    $('#appointments').click(function(){
        $(".logs").slideUp();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({
            zIndex: randomNumber
        });
        $(".dashboard").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".appointments").slideDown()
        $(".appointments").css({
            zIndex: 2
        });
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        Alert("Changed to Appointments", "success");
    })
    $("#admitions").click(function(){
        $(".logs").slideUp();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({
            zIndex: randomNumber
        });
        $(".dashboard").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".admitions").slideDown()
        $(".admitions").css({
            zIndex: 2
        });
        Alert("Changed to Admitions", "success");
    })
    $("#settings").click(function(){
        $(".logs").slideUp();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({
            zIndex: randomNumber
        });
        $(".dashboard").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".reports").slideUp();
        $(".reports").css({
            zIndex: randomNumber
        });
        $(".settings").slideDown();
        $(".settings").css({
            zIndex: 2
        });
        
        Alert("Changed to Settings", "success");
    })
    $("#reports").click(function(){
        $(".logs").slideUp();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({
            zIndex: randomNumber
        });
        $(".dashboard").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".appointments").slideUp()
        $(".dashboard").css({
            zIndex: randomNumber
        });
        $(".admitions").slideUp()
        $(".admitions").css({
            zIndex: randomNumber
        });
        $(".settings").slideUp();
        $(".settings").css({
            zIndex: randomNumber
        });
        $(".reports").slideDown();
        $(".reports").css({
            zIndex: 2
        });
        Alert("Changed to Reports", "success");
    });
    $("#create").click(function() {
        $(".creator").slideToggle("fast");
    });

    $(".staffOption").click(function() {
        $(".creator").slideUp();
        $(".staffSection").slideDown();
        $(".patientSection").slideUp(); 
    });
    $(".patientOption").click(function() {
        $(".creator").slideUp();
        $(".staffSection").slideUp();
        $(".patientSection").slideDown();        
    });
    $('#closeStaffSection').click(function() {
        $(".staffSection").slideUp();
    })
    $('#closePatientSection').click(function() {
        $(".patientSection").slideUp();
    })
    $('#createCardBtn').click(function() {
        let Name = $('#name').val();
        let Role = $('#role').val();
        let Department = $('#department').val();
        let Phone = $('#phone').val();
        let Email = $('#email').val();
        let Qualifications = $('#qualifications').val();
        let Experience = $('#experience').val();
        let Specializations = $('#specializations').val();
        let Availability = $('#availability').val();
        let PictureInput = document.getElementById('pictureInput');
        let PictureFile = PictureInput.files[0];
        if (PictureFile) {
            let reader = new FileReader();
            reader.onload = function(event) {
                var imageSource = event.target.result;
                const Staff = new StaffElement(Name, Role, Department, Phone, Email, Qualifications, Experience, Specializations, Availability, imageSource);
                const staffCard = Staff.createElement();
                console.log("click");
                $(".staffSection").slideUp("fast", function() {
                    if (staffCard) {
                        $('.staff').append(staffCard);
                        Alert(`new staff added - ${Name}`, "success")
                    }
                    setTimeout(() => {
                        logUpdate("New Staff Added",Name);
                    }, 1000);
                    setTimeout(() => {
                        newStaffText(Name)
                    }, 2000);
                });
            };
            reader.readAsDataURL(PictureFile);
            inWaiting++;
        } else {
            Alert("Please select an image", "error");
        }
    });
    $("#createPatientBtn").click(function(){
        inWaiting++;
        updateMeter()
        console.log(inWaiting);
        let Name = $("#patient-name").val();
        let Age = $("#age").val();
        let Gender = $("#gender").val();
        let State = "waiting";
        let condition = $("#condition").val();
        let contact = $("#patient-contact").val();
        let Email = $("#patient-email").val();
        let appointment = $("#appointment").val();
    // <!-- name, age, gender, condition, contact, email, appointment, picture -->
        let PictureInput = document.getElementById('pictureInputPatient');
        let PictureFile = PictureInput.files[0];
        if (PictureFile) {
            let reader = new FileReader();
            reader.onload = function(event) {
                var imageSource = event.target.result;
                const Patient = new patientElement(Name, Age, Gender, condition, contact, Email, appointment, imageSource, State);
                const patientCard = Patient.createElement();
                console.log("click");
                $(".patientSection").slideUp("fast", function() {
                    if (patientCard) {
                        $('.patients').append(patientCard);
                        Alert(`new patient added - ${Name}`, "success")
                    }
                    setTimeout(() => {
                        logUpdate("New patient Added",Name);
                    }, 1000);
                    setTimeout(() => {
                        //name, condition, date, picture
                        addAppointment(Name, condition, appointment, imageSource);
                    }, 1300);
                });
            };
            reader.readAsDataURL(PictureFile);
        } else {
            Alert("Please select an image", "error");
        }
    }); 
    $(document).on("click", "#removeStaff", function() {
    let card = $(this).closest(".card");
    let cardName = card.find(".name");
    let name = cardName.text();
    card.slideUp();
    Alert("Staff removed", "warning");
    setTimeout(function() {
        card.remove();
        logUpdate("Removed Staff", name); // Pass the 'name' variable
    }, 1000);
});
    $(document).on('click', "#removePatient", function(){
        let card = $(this).closest(".card");
        console.log("clicked")
        inWaiting--;
        updateMeter()
        let cardName = card.find(".name");
        let name = cardName.text();
        card.slideUp();
        Alert("Patient removed", "warning");
        setTimeout(function() {
            card.remove();
            logUpdate("Removed Patient", name); // Pass the 'name' variable
        }, 1000);
    })
    
    width = 0;
    $('#notificationSwitch').change(function() {
        if ($(this).is(':checked')) {
            notifToggle = "enabled";
            Alert("Notifications enabled", "success") 
        }else {
            Alert("Notifications disabled", "warning") //
            notifToggle = "disabled";
        }
    });
    $('#logsSwitch').change(function() {
        if ($(this).is(':checked')) {
            logToggle = "enabled";
            Alert("Logs enabled", "success") 
        }else {
            Alert("Logs disabled", "warning") //
            logToggle = "disabled";
        }
    });
    $(document).on("click", ".deleteAppointment", function() {
        let parent = $(this).closest(".appointmentElement");
        let name = parent.find("#appointmentName")
        let date = parent.find("#appointmentDate");
        let text = name.text();
        let dateTime = date.text();
        let message = `removed appointment for ${text} for ${dateTime}`;
        Alert("Appointment removed", "warning");
        parent.slideUp(function () {
            parent.remove();
            
            logUpdate(message, dateTime);
        });
    });
    $('#elementMenu').slideUp()
    $(document).on("click","#menuBtn",function() {
        var menu = $(this).next("#elementMenu");
        menu.css({
            opacity: 1,
        })
        menu.slideToggle()
        

    });
    $(document).on("click","#admitPatient",function(){
        admitted++;
        inWaiting--;
        Alert("Patient admitted", "success");
        let parent = $(this).closest(".patient-card");
        let appointment = parent.find(".patient-appointment");
        $(this).remove();
        let nameContainer = parent.find(".patient-name");
        let name = nameContainer.text(); 
        appointment.text("Admited");
        parent.appendTo(".admitions");
        logUpdate("Admitted patient", name);
        updateMeter()
    })
});


