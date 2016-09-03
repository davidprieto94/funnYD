/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var gSounds = {};
var equivalences = {
    c1: "do",
    d1: "re",
    e1: "mi",
    f1: "fa",
    g1: "sol",
    a1: "la",
    b1: "si",
}

window.onload = function() {
    // Create objects, makes sure that all the audio gets loaded.
    gSounds.c1 = new Audio("/static/audio/piano/piano_c1.opus");
    gSounds.d1 = new Audio("/static/audio/piano/piano_d1.opus");
    gSounds.e1 = new Audio("/static/audio/piano/piano_e1.opus");
    gSounds.f1 = new Audio("/static/audio/piano/piano_f1.opus");
    gSounds.g1 = new Audio("/static/audio/piano/piano_g1.opus");
    gSounds.a1 = new Audio("/static/audio/piano/piano_a1.opus");
    gSounds.b1 = new Audio("/static/audio/piano/piano_b1.opus");
    gSounds.c2 = new Audio("/static/audio/piano/piano_c2.opus");

    document.getElementsByTagName("body")[0].addEventListener("keydown", eventHandler, false);
}

var eventHandler = {
    handleEvent: function(aEvent) {
        var key = "";
        switch (aEvent.type) {
            case "keydown":
                // Should use aEvent.key instead of aEvent.which but needs bug 680830.
                // See https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/keydown
                switch (aEvent.which) {
                    case 32: // space
                        gPitches.play("c1");
                        key = "DO";
                        break;
                    case 39: // right
                        gPitches.play("d1");
                        key = "RE";
                        break;
                    case 38: // up
                        gPitches.play("e1");
                        key = "MI";
                        break;
                    case 37: // left
                        gPitches.play("f1");
                        key = "FA";
                        break;
                    case 40: // down
                        gPitches.play("g1");
                        key = "SOL";
                        break;
                    case 87: // w
                        gPitches.play("a1");
                        key = "LA";
                        break;
                    case 83: // a
                        gPitches.play("b1");
                        key = "SI";
                        break;
                    case 65: // s
                        gPitches.play("c2");
                        break;
                    default: // not supported
                        console.log("key not supported: " + aEvent.which);
                        break;
                }
        }
        window.play_variables.intentos += 1;
        var nota = $("#stage").find("img").first().attr("sound").toUpperCase()
        if(nota == key){
            window.play_variables.cantidad += 1;
            $("#stage").find("img").first().remove()
            if($("#stage").find("img").length == 0){
                var s = new Audio(window.play_variables.sound_src);
                s.play();
                s.onended = function() {
                    window.game_save();
                };

            }
        }
    }
};

var gPitches = {
    play: function(aPitchName) {
        gPitches.flash(aPitchName);
        var pitchSound = new Audio(gSounds[aPitchName].src);
        pitchSound.play();
        window.registernote(equivalences[aPitchName]);
    },

    flash: function(aPitchName) {
        document.getElementById(aPitchName + "-upper").classList.add("active");
        document.getElementById(aPitchName + "-lower").classList.add("active");
        setTimeout(gPitches.unflash, 200, aPitchName);
    },

    unflash: function(aPitchName) {
        document.getElementById(aPitchName + "-upper").classList.remove("active");
        document.getElementById(aPitchName + "-lower").classList.remove("active");
    }
};
