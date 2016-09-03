var template = _.template('<img sound="<%- sound %>" src="/static/img/<%- imgsrc %>.png" style="display: inline-block;" height="50px">');
board = "#register"
game = "#game"
wellcome = "#wellcome"
window.notes_reristered = [];

window.game_score = {}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$(document).ready(function(){
    $("#play").on("click", function(){
        window.get_play();
    })

    $("#game_save").on("click", function(){
		window.game_save();
	})
});

window.game_save = function () {
    debugger;
    request('POST', window.location.origin + '/api/niveles/niveles/',{
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        json: {
            sound_id: window.play_variables.sound_id,
            piano_notes: window.notes_reristered.join(' '),
            intentos: window.play_variables.intentos,
            cantidad: window.play_variables.cantidad,
        }
    }).done(function (res) {
        alert("Bien!!!... Se a guardado tu puntaje! :)");
        location.reload();
        return true;
    });
}

window.registernote = function(aPitchName){
    window.notes_reristered.push(aPitchName);
    $(board).append(aPitchName);
    $(board).append("-");
}

window.restart_board = function(aPitchName){
    $(board).html("");
}

window.get_play = function(nivel){
    window.notes_reristered = []
    // var nivel = $("#difficulty").val()
    request('GET', window.location.origin + '/api/niveles/niveles/?juego=Piano&nivel=' + nivel).done(function (res) {
        var json = eval(res.getBody())
        var i = Math.floor(Math.random() * json[0].soundmodel_set.length)
        console.log(json);
        console.log(i);
        var sound = json[0].soundmodel_set[i]
        window.play_variables = {
            sound_src: sound.file_url,
            notes: sound.piano_notes,
            sound_id: sound.id,
            tiempo: sound.tiempo,
            intento: 0,
            cantidad: 0,
        };
            $.each(sound.piano_notes.split(" "), function(i, note){
            $("#stage").append(template({
                imgsrc: note,
                sound: note,
            }));
        });
        // setTimeout(function(){ window.game_save() }, window.play_variables.tiempo * 1000);
        $(game).show();
        $(wellcome).hide();
        // init();
        return true;
    });
}