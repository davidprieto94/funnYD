$(document).ready(function(){
    $("body").keypress(function(e){
        code = e.which;
        $("a.key-press").each(function(index, object){
            if(object.getAttribute('key-data') == code){
                window.location.replace(object.getAttribute('href'));
            }
        });
    });
});