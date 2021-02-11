// ==UserScript==
// @name         Skribbl: Quick Buttons
// @namespace    https://vukky.ga
// @version      0.1
// @description  Adds quick buttons to the game.
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblquickbuttons.user.js
// ==/UserScript==

(function() {
    'use strict';
    var button = document.createElement("button");
    button.className = "btn btn-danger btn-block"
    button.innerText = "Disconnect"
    button.setAttribute("onclick", "document.location.href='https://skribbl.io'")
    document.getElementsByClassName("tooltip-wrapper")[0].appendChild(button)
    if(window.vukkySkribblUrlShortcutsInstalled) {
        var button2 = document.createElement("button");
        button2.className = "btn btn-danger btn-block"
        button2.innerText = "Switch servers"
        button2.setAttribute("onclick", "document.location.href='https://skribbl.io/?play'")
        document.getElementsByClassName("tooltip-wrapper")[0].appendChild(button2)

        var button3 = document.createElement("button");
        button3.className = "btn btn-danger btn-block"
        button3.innerText = "Start private game"
        button3.setAttribute("onclick", "document.location.href='https://skribbl.io/?create'")
        document.getElementsByClassName("tooltip-wrapper")[0].appendChild(button3)

        var button4 = document.createElement("button");
        button4.className = "btn btn-danger"
        button4.innerText = "Join Public Game"
        button4.setAttribute("onclick", "document.location.href='https://skribbl.io/?play'")
        document.getElementsByClassName("lobbyContentButtons")[0].appendChild(button4)
    }
})();