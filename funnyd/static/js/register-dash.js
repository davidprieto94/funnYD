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

window.save_observacion = function () {
    var observacion = $('#observacion').val();
    var id = window.obsertavacion_id;
    request('POST', window.location.origin + '/api/niveles/intentos/',{
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        json: {
            observation: observacion,
            id: id,
        }
    }).done(function (res) {
        alert("Lo hiciste bien!!!... Se ha guardado tu puntaje! :)");
        location.reload();
        return true;
    });
};

window.show_modal = function (id, observacion) {
    $('#myModal').modal("show");
    window.obsertavacion_id = id;
    $('#observacion').val(observacion);
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
        }
        setTimeout(function(){ window.game_save() }, window.play_variables.tiempo * 1000);
        $(game).show();
        $(wellcome).hide();
        init();
        return true;
    });
}