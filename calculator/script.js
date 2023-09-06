var expression = "";
$("button").click(function(){
    const text = $(this).html();
    const field = $('input');
    const el = new String(expression);
    if (text != "="){
        expression += text;
        field.val(expression);
    }
    if(text == "="){
        expression = "";
        const result = eval(String(el));
       field.val(text+result);
    }
    if(text == "AC"){
        expression = "";
    }
})

