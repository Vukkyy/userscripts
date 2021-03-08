// ==UserScript==
// @name         REAL Vukkyfy
// @namespace    https://vukky.ga
// @version      0.3.0
// @description  VUKKY VUKKY VUKKY VUKKY VUKKY VUKKY V
// @author       Vukky
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/realvukkyfy.user.js
// @icon         https://raw.githubusercontent.com/Vukky123/vukmoji/master/emojis/animated/vukkyspin.gif
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function vukkyfy() {
        let images = document.getElementsByTagName('img');
        for (var image of images) {
            let randomNum = Math.ceil(Math.random() * 34);
            image.src = `https://sivusto.tk/innervukky/${randomNum}.png`;
            image.srcset = `https://sivusto.tk/innervukky/${randomNum}.png`;
            image.style.backgroundImage = `url("https://sivusto.tk/innervukky/${randomNum}.png")`;
        };

        let divs = document.getElementsByTagName('div');
        for (var div of divs) {
            let randomNum = Math.ceil(Math.random() * 34);
            div.style.background = `url("https://sivusto.tk/innervukky/${randomNum}.png")`;
        };

        let ps = document.getElementsByTagName('p');
        for (var p of ps) {
            p.innerText = "Vukky"
        };

        let as = document.getElementsByTagName('a');
        for (var a of as) {
            a.innerText = "Vukky"
        };

        let buttons = document.getElementsByTagName('button');
        for (var button of buttons) {
            button.innerText = "Vukky"
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

    setInterval(vukkyfy, 1000);
})();
