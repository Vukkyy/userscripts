// ==UserScript==
// @name         Skribbl: No Timer
// @namespace    https://vukky.ga
// @version      0.1
// @description  Is the timer scary? Do you wish you didn't know how much time you have left? Great! This is for you.
// @author       You
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblnotimer.user.js
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        // there will probably never be more than one timer, but you never know!
        var timers = document.getElementsByClassName("timer-container");
        for (let i = 0; i < timers.length; i++) {
            const timer = timers[i];
            timer.remove();
        }
    }, 1000);
})();