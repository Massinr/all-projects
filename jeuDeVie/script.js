$(document).ready(function() {
    var message = ""
  $("#calculate").click(function() {
    var equation = $("#equation").val().trim();
    var coefficients = equation.split(",");
  
    console.log(coefficients)

    a = coefficients[0];
    b = coefficients[1];
    c = coefficients[2];

    let _a  =a.replace("x^2", "")
    let _b = b.replace("x", "")
    let delta = _b**2 - 4*_a
    if (delta > 0) {
        var x1 = (-_b + delta)/(2*_a)
        var x2 = (-_b - delta)/(2*_a)
        message = `x1 : ${x1}, x2 : ${x2}`
    }else if (delta < 0) {
        message = "aucun solution reel"
    }else if(delta === 0){
        var x = -_b/(2*_a)
        message = `x : ${x}`
    }

});
$("#results").text(message)
});
