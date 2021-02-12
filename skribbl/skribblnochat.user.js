// ==UserScript==
// @name         Skribbl: No Chat
// @namespace    https://vukky.ga
// @version      0.1
// @description  Removes the chat from the game. Not sure why would want to do this.
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblnochat.user.js
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        document.getElementById("boxMessages").remove();
    }, 1000);
})();