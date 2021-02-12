// ==UserScript==
// @name         Skribbl: No Avatar Bodies
// @namespace    https://vukky.ga
// @version      0.4
// @description  Destroys skribbl bodies, so you only have faces. Incompatible with No Avatars.
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblnoavatarbodies.user.js
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