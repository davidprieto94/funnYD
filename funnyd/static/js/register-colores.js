var template = _.template('<section class = "contentDrag"> <article style="display: <%- display %>" data-related="<%- related %>" audio-data="<%- audio %>" relacion-data="" class="draggables" draggable="true"> <img src="<%- imgsrc %>" width="250" height="100"> </article> </section>');
var template2 = _.template('<article data-related="<%- related %>" class="dropzone" dropzone-data="true" style="background-color: <%- index %>; width: 250px; height: 100px; border: 1px solid #000000;">  </article>')
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
            time: window.play_variables.time,
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
    request('GET', window.location.origin + '/api/niveles/niveles/?juego=Colores&nivel=' + nivel).done(function (res) {
        var arr = [];
        var json = eval(res.getBody());
        $.each(json[0].soundmodel_set, function(i, value){
            var display = "none"
            if(!(value.color in arr)){
                $("#dropzoneContenedor_js").append(template2({index: value.color, related: value.color}));
                display = "block"
            }
            $("#draggablesContenedor_js").append(template({imgsrc: value.file_url, audio: value.name, related: value.color, display: display}))
            arr[value.color] = true;
        })

        // console.log(json)
        // var i = Math.floor(Math.random() * json[0].soundmodel_set.length)
        var sound = json[0].soundmodel_set[0];
        window.play_variables = {
            sound_id: sound.id,
            intentos: 0,
            cantidad: 0,
            time: 0,
            tiempo: sound.tiempo,
        }
        // setTimeout(function(){ window.game_save() }, window.play_variables.tiempo * 1000);
        $(game).show();
        $(wellcome).hide();
        return true;
    });
}