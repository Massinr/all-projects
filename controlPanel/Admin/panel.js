var stats = {
  numberOfClients: 0,
  numberOfcurrentClients: 0,
  numberOfDeletedClients: 0,
  clientHistory: [],
}

var click = 0;
$(".filter-menu").slideUp();
$(".delete-menu").slideUp();
$(".create-menu").slideUp();
$(".stats-menu").slideUp();


$('.filter').click(function() {
    $(".filter-menu").animate({opacity : 1});
    $(".filter-menu").slideToggle();
    $(".delete-menu").slideUp();
    $(".stats-menu").slideUp();
    $(".create-menu").slideUp();

});
$('.delete').click(function() {
    $(".delete-menu").animate({opacity : 1});
    $(".delete-menu").slideToggle();
    $(".filter-menu").slideUp();
    $(".stats-menu").slideUp();
    
});
$('.create').click(function() {
    $(".create-menu").animate({opacity : 1});
    $(".create-menu").slideToggle();
    $(".filter-menu").slideUp();
    $(".delete-menu").slideUp();
    $(".stats-menu").slideUp();
});
var bgs = ["background1.webp","background2.png","background3.jpg"]
var pfps = ["user_female.png","user_male.jpg"]
var $client;
$(document).ready(function() {
    $('.client').click(function() {
      console.log('clicked');
    });
    
    $('.save').click(function(event) {

        event.preventDefault();
        $(".create-menu").slideToggle();
      const random1 = Math.floor(Math.random() * bgs.length);
      const random2 = Math.floor(Math.random() * pfps.length);
      var pfp = pfps[random2];
      var bg = bgs[random1];
      var fname = $(".fname").val();
      var lname = $(".lname").val();
      var age = $(".age").val();
      var job = $(".job").val();
      var email = $(".email").val();
      const id = fname + lname
      var $client = $('<div class="client" id="'+id+'">' +
                      '<div class="shown">' +
                          '<img src="/assets/'+pfp+'" alt="user" class="user">' +
                          '<img src="/assets/'+bg+'" alt="" class="bg">' +
                      '</div>' +
                      '<div class="onclick">' +
                          '<div class="label-container">' +
                              '<label><span>First Name : </span>' + fname + '</label>' +
                              '<label><span>Last Name : </span>' + lname + '</label>' +
                              '<label><span>Age : </span>' + age + '</label>' +
                              '<label><span>Job: </span>' + job + '</label>' +
                              '<label><span>Email : </span>' + email + '</label>' +
                          '</div>' +
                          '<button id="contact">Contact</button>' +
                      '</div>' +
                  '</div>');
  
      $('.client-container').append($client);
      $client.click(function() {
        if ($client.height() === 150) {
          $client.animate({height: "400px"}, 500);
        } else {
          $client.animate({height: "150px"}, 500);
        }
      });
    });
  });
$('.reset').slideUp("fast");
$(".search").click(function() {
  var id ="#"+ $("#filterData").val();
  $(".client").slideToggle("fast");
  $(id).slideDown("fast");
  $('.reset').slideDown("fast");
});
$(".reset").click(function() {
  $(".client").slideDown("fast");
});

$(".deletebtn").click(function() {
  var toDelete ="#"+ $("#deleteData").val();
  $(toDelete).slideUp("slow");
  $(toDelete).fadeOut("slow");
  setTimeout(function() {
    $(toDelete).remove();
  },2000)
});


$(".stats").click(function() {
  $(".stats-menu").animate({opacity : 1});
    $(".stats-menu").slideToggle();
    $(".filter-menu").slideUp();
    $(".delete-menu").slideUp();
    $(".create-menu").slideUp();
})