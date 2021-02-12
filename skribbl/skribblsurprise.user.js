// ==UserScript==
// @name         Skribbl: Skribbl Surprise
// @namespace    https://vukky.ga
// @version      0.1
// @description  Leaves which word you get to draw up to fate. Scary!
// @author       Vukky, Synne (name and description)
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblsurprise.user.js
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        if(document.getElementsByClassName("wordContainer")[0].children.length > 0) {
            if(document.getElementsByClassName("wordContainer")[0].style.display == "") {
                document.getElementsByClassName("word")[Math.floor(Math.random() * (2 - 0 + 1)) + 0].click()
            }
        }
    }, 1000);
})();