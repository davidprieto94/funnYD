$(document).ready(function(){
    var centesimas = 0;
    var segundos = 0;
    var minutos = 0;
    var horas = 0;

    var dropzones = document.querySelectorAll("[dropzone-data]")
        ,draggables = document.querySelectorAll("[draggable]")
        ,dropzoneContenedor = document.getElementById("dropzoneContenedor_js")
        ,draggablesContenedor = document.getElementById("draggablesContenedor_js")
        ,contenedorMensaje = document.getElementById("contenedorMensaje_js")
        ,contenedorIntentos = document.getElementById("contenedorIntentos_js")
        ,contenedorTiempo = document.getElementById("contenedorTiempo_js")
        ,iniciar = document.getElementById("iniciar_js")
        ,elementDrag = null
        ,intentos = 0
        ,timeInit
        ,timeEnd;
    iniciar.addEventListener("click", start);


    function validDropzone() {

        var termino = true

        for (var i = 0,dropzone ;dropzone = dropzones[i]; i++) {

            if (dropzone.childElementCount == 0){
                termino = false
            }
        }
        if (termino){
            timeEnd = new Date()
            getTimeExercice(timeInit,timeEnd)
        }
    }

    function random(max,min) {
        var aleatorio = Math.floor((Math.random() * max) + min)
        return aleatorio
    }

    function dropFunction(evento) {
        console.log(evento);
        var element = evento.dataTransfer.getData("text/html",0)
        var relacion = evento.dataTransfer.getData("text/plain",1)

        elementDrag.classList.remove("ocultar")
        if (relacion == this.getAttribute("relacion-data")){
            this.innerHTML = element
            var nodeParent = elementDrag.parentNode
            nodeParent.removeChild(elementDrag)
            validDropzone()
            $("#draggablesContenedor_js").find("section").find("[data-related='" + relacion + "']").show()

        }else{

            var audio = elementDrag.getAttribute("audio-data")
            var msg = {
                mensaje : "hay no va",
                tipo : 0
            }
            reproduceAudio(audio)
            createMessage(msg)
        }
    }


    function reproduceAudio(urlAudio){
        var urlFull = "audio/" + urlAudio + ".mp3"
        var audio = new Audio(urlFull)
        audio.play()
    }

    function createMessage(msg) {
        var seccion = document.createElement("article")
        var mensaje = document.createElement("p")
        var icono = document.createElement("span")

        mensaje.innerHTML = msg.mensaje

        if (msg.tipo == 0){
            /*Mensaje de error*/
            seccion.classList.add("error")
            icono.innerHTML = "X"
        }else if(msg.tipo == 1){
            /*Mensaje de correcto*/
            seccion.classList.add("correcto")
            icono.innerHTML = "V"
        }

        seccion.appendChild(icono)
        seccion.appendChild(mensaje)
        contenedorMensaje.appendChild(seccion)

        setTimeout(function(){
            contenedorMensaje.removeChild(seccion)
        }, 2000)
    }

    function dragOverFunction(evento){
        evento.preventDefault()
    }

    function dragStartFunction(evento) {
        intentos += 1
        window.play_variables.intentos = intentos
        contenedorIntentos.innerHTML = intentos
        elementDrag = this
        evento.dataTransfer.effectAllowed = "move"

        evento.dataTransfer.setData("text/html",this.outerHTML,0)
        evento.dataTransfer.setData("text/plain",this.getAttribute("data-related"),1)

            setTimeout(function() {
            window.scroll(0,0)
        }, 100)
    }

    function getTimeExercice(init,end) {
        var minutesInit = init.getMinutes()

        var minutesEnd = end.getMinutes()
        var secondsEnd = end.getSeconds()

        var timeMinutes = minutesEnd - minutesInit
        var timeSeconds = secondsEnd

        console.log(timeMinutes + ":" + timeSeconds)

        contenedorTiempo.innerHTML = timeMinutes
    }

    function inicio () {
        control = setInterval(cronometro, 10);
    }

    function cronometro () {
        if (centesimas < 99) {
            centesimas++;
            if (centesimas < 10) { centesimas = "0"+centesimas }
            // Centesimas.innerHTML = ":"+centesimas;
        }
        if (centesimas == 99) {
            centesimas = -1;
        }
        if (centesimas == 0) {
            segundos ++;
            if (segundos < 10) { segundos = "0"+segundos }
            Segundos.innerHTML = segundos;
            window.play_variables.time = segundos;
        }
        if (segundos == 59) {
            segundos = -1;
        }
        if ( (centesimas == 0)&&(segundos == 0) ) {
            minutos++;
            if (minutos < 10) { minutos = "0"+minutos }
            // Minutos.innerHTML = ":"+minutos;
        }
        if (minutos == 59) {
            minutos = -1;
        }
        if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
            horas ++;
            if (horas < 10) { horas = "0"+horas }
            // Horas.innerHTML = horas;
        }
    }

    function start() {
        dropzones = document.querySelectorAll("[dropzone-data]");
        draggables = document.querySelectorAll("[draggable]");
        dropzoneContenedor = document.getElementById("dropzoneContenedor_js");
        draggablesContenedor = document.getElementById("draggablesContenedor_js");
        contenedorMensaje = document.getElementById("contenedorMensaje_js");
        contenedorIntentos = document.getElementById("contenedorIntentos_js");
        contenedorTiempo = document.getElementById("contenedorTiempo_js");

        timeInit = new Date()
        for (var i = 0,dropzone,draggable ;dropzone = dropzones[i],draggable = draggables[i]; i++) {
            var dropzone_data_related = $(dropzone).attr('data-related');
            var draggable_data_related = $(draggable).attr('data-related');
            var relacion = dropzone_data_related;
            if (typeof dropzone != 'undefined') {
                dropzone.addEventListener("drop", dropFunction)
                dropzone.addEventListener("dragover", dragOverFunction)
                dropzone.setAttribute("relacion-data", relacion)
            }
            draggable.addEventListener("dragstart", dragStartFunction)
            draggable.setAttribute("relacion-data", relacion)

        }
        inicio()
    }

});

