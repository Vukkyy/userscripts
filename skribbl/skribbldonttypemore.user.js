// ==UserScript==
// @name         Skribbl: Don't Type More
// @namespace    https://vukky.ga
// @version      0.1
// @description  Don't type more than the actual length of the word + 1! Run "vukkyDontTypeMoreOn = false" in console to quickly disable it - "vukkyDontTypeMoreOn = true" to turn back on.
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribbldonttypemore.user.js
// ==/UserScript==

(function() {
    'use strict';
    window.vukkyDontTypeMoreOn = true;

    setInterval(() => {
        var wordLength = document.getElementById("currentWord").textContent.length;
        if(window.vukkyDontTypeMoreOn && !wordLength == 0) {
            var maxLength = wordLength + 1;
            document.getElementById("inputChat").setAttribute("maxlength", maxLength);
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here... (max " + maxLength + " characters)");
        } else {
            document.getElementById("inputChat").setAttribute("maxlength", "100");
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here...");
        }
    }, 1000);
})();