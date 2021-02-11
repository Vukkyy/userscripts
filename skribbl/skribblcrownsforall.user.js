// ==UserScript==
// @name         Skribbl: Crowns for All
// @namespace    https://vukky.ga
// @version      0.1
// @description  Everyone gets a crown! This is JUST VISUAL and will NOT make you the owner. Incompatible with No Avatars.
// @author       You
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblcrownsforall.user.js
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        var crowns = document.getElementsByClassName("owner");
        for (let i = 0; i < crowns.length; i++) {
            const crown = crowns[i];
            crown.style.display = "";
        }
    }, 1000);
})();