board = "#register"
game = "#game"
wellcome = "#wellcome"
notes_reristered = [];

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
    request('POST', window.location.origin + '/api/niveles/niveles/',{
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        json: {
            sound_id: window.play_variables.sound_id,
            piano_notes: window.notes_reristered.join(' '),
            intentos: window.play_variables.intentos,
            cantidad: window.play_variables.cantidad
        }
    }).done(function (res) {
        alert("Bien!!!... Se a guardado tu puntaje! :)");
        location.reload();
        return true;
    });
}

window.registernote = function(aPitchName){
	notes_reristered.push(aPitchName);
	$(board).append(aPitchName);
	$(board).append("-");
}

window.restart_board = function(aPitchName){
	$(board).html("");
}

window.get_play = function(nivel){
    window.notes_reristered = []
    // var nivel = $("#difficulty").val()
    request('GET', window.location.origin + '/api/niveles/niveles/?juego=Baila&nivel=' + nivel).done(function (res) {
        var json = eval(res.getBody())
		console.log(json)
        var i = Math.floor(Math.random() * json[0].soundmodel_set.length)
        var sound = json[0].soundmodel_set[i];
        debugger;
        window.play_variables = {
            sound_src: sound.file_url,
            sound_id: sound.id,
            intentos: 0,
            cantidad: 0,
        }
        $(game).show();
        $(wellcome).hide();
        return true;
    });
}