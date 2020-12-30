// ==UserScript==
// @name         Vukkyfy
// @namespace    https://vukky.ga
// @version      0.1.0
// @description  All <img> images are now Vukkies. Uh oh.
// @author       Vukky
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/vukkyfy.user.js
// @icon         https://raw.githubusercontent.com/Vukky123/vukmoji/master/emojis/animated/vukkyspin.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function vukkyfy() {
        let images = document.getElementsByTagName('img');

        for (var image of images) {
            let randomNum = Math.floor(Math.random() * 34) + 1;
            image.src = 'https://sivusto.tk/innervukky/' + randomNum + '.png';
        };
    }

    setInterval(vukkyfy, 1000);
})();