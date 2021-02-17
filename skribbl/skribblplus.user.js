// ==UserScript==
// @name         skribbl+
// @namespace    https://vukky.ga
// @version      0.1.0
// @description  skribbl+ is a combination of all the Skribbl userscripts that I have previously created.
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblnoavatarbodies.user.js

// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(() => {
        if(!window.vukkyNoAvatarsInstalled) {
            setInterval(() => {
                var bodies = document.getElementsByClassName("color");
                for (let i = 0; i < bodies.length; i++) {
                    const body = bodies[i];
                    body.remove();
                }
        
                var avatarArrows = document.getElementsByClassName("avatarArrow");
                for (let i = 0; i < avatarArrows.length; i++) {
                    const avatarArrow = avatarArrows[i];
                    if(avatarArrow.className.startsWith("avatarArrow avatarArrow") && avatarArrow.attributes[1].value == "0") {
                        avatarArrow.remove();
                    }
                }
            }, 1000);
        }
    }, 500);
})();