// ==UserScript==
// @name         Vukkyfy
// @namespace    https://vukky.ga
// @version      0.1.3
// @description  All <img> images are now Vukkies. Uh oh.
// @author       Vukky
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/vukkyfy.user.js
// @icon         https://raw.githubusercontent.com/Vukky123/vukmoji/master/emojis/animated/vukkyspin.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const deniedSites = ["github.com", "discord.com", "ptb.discord.com", "canary.discord.com"]

    function vukkyfy() {
        let images = document.getElementsByTagName('img');

        for (var image of images) {
            let randomNum = Math.ceil(Math.random() * 34);
            image.src = `https://sivusto.tk/innervukky/${randomNum}.png`;
        };

        if(document.location.hostname == "www.youtube.com") {
            let imgShadows = document.getElementsByTagName('yt-img-shadow');

            for (var imgShadow of imgShadows) {
                if(imgShadow.className.includes("empty")) {
                    imgShadow.className = imgShadow.className.replace("empty", "")
                }
            };
        }
    }

    if(!deniedSites.includes(document.location.hostname)) setInterval(vukkyfy, 1000);
})();