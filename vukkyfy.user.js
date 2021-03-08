// ==UserScript==
// @name         Vukkyfy
// @namespace    https://vukky.ga
// @version      0.3.0
// @description  All <img> images are now Vukkies. Uh oh.
// @author       Vukky
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/vukkyfy.user.js
// @icon         https://raw.githubusercontent.com/Vukky123/vukmoji/master/emojis/animated/vukkyspin.gif
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("Vukkyfy: Settings", opencfg);
    function opencfg() {
        GM_config.open();
    }
    GM_config.init(
        {
          'id': 'vukkyfy',
          'title': "Vukkyfy 0.3.0",
          'fields': {
            'images': {
              'label': 'Vukkyfy images',
              'type': 'checkbox',
              'default': true
            },
            'ps': {
                'label': 'Vukkyfy text',
                'type': 'checkbox',
                'default': false
            },
            'divs': {
                'label': 'Vukkyfy divs (INSANITY)',
                'type': 'checkbox',
                'default': false
            },
            'buttons': {
                'label': 'Vukkyfy buttons',
                'type': 'checkbox',
                'default': false
            },
            'as': {
                'label': 'Vukkyfy links',
                'type': 'checkbox',
                'default': false
            },
          },
          'css': "#vukkyfy_wrapper { text-align: center; }",
        }
    );

    const deniedSites = ["github.com", "discord.com", "ptb.discord.com", "canary.discord.com"]

    function vukkyfy() {
        if(GM_config.get('images') == true) {
            let images = document.getElementsByTagName('img');
            for (var image of images) {
                let randomNum = Math.ceil(Math.random() * 34);
                image.src = `https://sivusto.tk/innervukky/${randomNum}.png`;
                image.srcset = `https://sivusto.tk/innervukky/${randomNum}.png`;
                image.style.backgroundImage = `url("https://sivusto.tk/innervukky/${randomNum}.png")`;
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

        if(GM_config.get('ps') == true) {
            let ps = document.getElementsByTagName('p');
            for (var p of ps) {
                p.innerText = "Vukky"
            };
        }

        if(GM_config.get('divs') == true) {
            let divs = document.getElementsByTagName('div');
            for (var div of divs) {
                let randomNum = Math.ceil(Math.random() * 34);
                div.style.background = `url("https://sivusto.tk/innervukky/${randomNum}.png")`;
            };
        }

        if(GM_config.get('as') == true) {
            let as = document.getElementsByTagName('a');
            for (var a of as) {
                a.innerText = "Vukky"
            };
        }

        if(GM_config.get('buttons') == true) {
            let buttons = document.getElementsByTagName('button');
            for (var button of buttons) {
                button.innerText = "Vukky"
            };
        }
    }

    if(!deniedSites.includes(document.location.hostname)) setInterval(vukkyfy, 1000);
})();
