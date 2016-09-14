var notes = []
,intentos = 0
,cantidad = 0
,bandera=false
,xPos = null

function getAudio () {
	var audio = window.play_variables.sound_src;
	return audio;
}

function start(){
	document.getElementById('boton').style.display = 'none';
	var audio = document.createElement("audio");
	if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")){
		audio.src = getAudio();
		audio.play();
	}

	function Arrow(direction) {

/* Posición de salida de las flechas */

		switch(direction) {

			case "left" : xPos = "115px";
			break;

			case "up" : xPos = "182px";
			break;

			case "down" : xPos = "252px";
			break;

			case "right" : xPos = "322px";
			break;

		}

		this.direction = direction;
		this.image = $("<img src='/static/img/arrows/" + direction + ".gif'/>");

		this.image.css({
			position: "absolute",
			top: "0px",
			left: xPos
		});

		$('.stage').append(this.image);

	}

	Arrow.prototype.step = function() {
		this.image.css("top", "+=1px");
	};

	Arrow.prototype.destroy = function() {
		cantidad+= 1;
		this.image.remove();
		notes.splice(0,1);
	};

	Arrow.prototype.explode = function() {
		cantidad+= 1;
		var arrow = this;
		arrow.image1 = $("<img src='/static/img/arrows/explode.gif' width=80 heidht=80</>");
		arrow.image1.css({

	/* Posición de explosión */

			position: "absolute",
			top: "270px",
			left: xPos
		});
		$('.stage').append(arrow.image1);
		arrow.image.remove();
		setTimeout(function() {
			arrow.image1.remove();
		}, 1000)
	};

	var randNum = 0;

	var frame = 0;

	var arrowSpawnRate = 150;

	function randomGen() {

		randNum = Math.floor(Math.random() * 4) + 1;

		if (randNum === 1) {
			notes.push(new Arrow("left"));
		}

		if (randNum === 2) {
			notes.push(new Arrow("right"));
		}

		if (randNum === 3) {
			notes.push(new Arrow("up"));
		}

		if (randNum === 4) {
			notes.push(new Arrow("down"));
		}

	}

	function render() {
		if (frame++ % arrowSpawnRate === 0) {
			randomGen();
		}
		for (var i = notes.length - 1; i >= 0; i--) {
			notes[i].step();
			if (notes[i].image.position().top > 370) {
				notes[i].destroy();
				if(bandera==false){
					intentos += 1;
					document.getElementById("fallas").innerHTML = intentos
				}else
				bandera=false;
			}
		}
	}

	$(document).ready(function () {

		window.requestAnimFrame = (function() {

			return window.requestAnimationFrame ||

			window.webkitRequestAnimationFrame ||

			window.mozRequestAnimationFrame ||

			function(callback) {

				window.setTimeout(callback, 40 / 75);

			};

		})();

		(function animloop() {
			requestAnimFrame(animloop);
			render();
		})();
	});

	$(document).keydown( function(event) {

		for (var i = 0; i < notes.length; i++) {
			bandera=true;
			console.log(notes[i].image.position().top);
			if(notes[i].image.position().top>=310 ){
				// intentos++;
				document.getElementById("fallas").innerHTML = intentos
				bandera=false;
			}
			else{
				bandera=false;
			}

			/* Rango de posición del limite al bajar las flechas*/

			if (event.keyCode == 37 && notes[i].direction == "left") {
				if (notes[i].image.position().top > 300 && notes[i].image.position().top < 380) {
					notes[i].explode();
				}
			}

			if (event.keyCode == 38 && notes[i].direction == "up") {
				if (notes[i].image.position().top > 280 && notes[i].image.position().top < 380) {
					notes[i].explode()
				}
			}

			if (event.keyCode == 40 && notes[i].direction == "down") {
				if (notes[i].image.position().top > 280 && notes[i].image.position().top < 380) {
					notes[i].explode()
				}
			}
			if (event.keyCode == 39 && notes[i].direction == "right") {
				if (notes[i].image.position().top > 280 && notes[i].image.position().top < 380) {
					notes[i].explode()
				}
			}
		}
	});
audio.onended = function() {
	alert("Partida terminada");
	window.play_variables.intentos = intentos;
	window.play_variables.cantidad = cantidad;
	window.game_save();
}
}