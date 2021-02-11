// ==UserScript==
// @name         Skribbl: URL Shortcuts
// @namespace    https://vukky.ga
// @version      0.1
// @description  Want to quickly play? skribbl.io/?play. Create a room? skribbl.io/?create.
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblurlshortcuts.user.js
// ==/UserScript==

(function() {
    'use strict';
    window.vukkySkribblUrlShortcutsInstalled = true;
    if(location.search == "?play") {
        document.getElementById("formLogin").getElementsByTagName("button")[0].click();
        document.getElementById("containerLogoBig").style.display = ""
    } else if (location.search == "?create") {
        document.getElementById("formLogin").getElementsByTagName("button")[1].click();
        document.getElementById("containerLogoBig").style.display = ""
    }
})();