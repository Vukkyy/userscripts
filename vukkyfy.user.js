// ==UserScript==
// @name         Vukkyfy
// @namespace    https://vukky.ga
// @version      0.4.0
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
          'title': "Vukkyfy 0.4.0",
          'fields': {
            'images': {
              'label': 'Vukkyfy images',
              'section': ['Change what will be Vukkified', 'If you disable something, you will need to apply your changes and then refresh to unvukkyfy existing Vukkified elements.'],
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
                if(image.classList.contains("vkyfy-vukkied")) continue;
                image.classList.add("vkyfy-vukkied");
                let randomNum = Math.ceil(Math.random() * 34);
                image.src = `https://sivusto.tk/innervukky/${randomNum}.png`;
                image.srcset = `https://sivusto.tk/innervukky/${randomNum}.png`;
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
            let yts = document.getElementsByTagName('yt-formatted-string');
            for (var yt of yts) {
                if(yt.classList.contains("vkyfy-vukkied")) continue;
                yt.classList.add("vkyfy-vukkied");
                yt.innerText = getSaying();
            };

            let ps = document.getElementsByTagName('p');
            for (var p of ps) {
                if(p.classList.contains("vkyfy-vukkied")) continue;
                p.classList.add("vkyfy-vukkied");
                p.innerText = getSaying();
            };

            let spans = document.getElementsByTagName('span');
            for (var span of spans) {
                if(span.classList.contains("vkyfy-vukkied")) continue;
                if(span.childElementCount != 0) continue;
                span.classList.add("vkyfy-vukkied");
                span.innerText = getSaying();
            };

            let cites = document.getElementsByTagName('cite');
            for (var cite of cites) {
                if(cite.classList.contains("vkyfy-vukkied")) continue;
                cite.classList.add("vkyfy-vukkied");
                cite.innerText = getSaying();
            };

            let divs = document.getElementsByTagName('div');
            for (var div of divs) {
                if(div.classList.contains("vkyfy-vukkied")) continue;
                if(div.childElementCount != 0) continue;
                div.classList.add("vkyfy-vukkied");
                div.innerHTML = getSaying();
            };
        }

        if(GM_config.get('divs') == true) {
            let divs = document.getElementsByTagName('div');
            for (var div of divs) {
                if(div.classList.contains("vkyfy-vukkied")) continue;
                div.classList.add("vkyfy-vukkied");
                let randomNum = Math.ceil(Math.random() * 34);
                div.style.background = `url("https://sivusto.tk/innervukky/${randomNum}.png")`;
                if(div.childElementCount == 0) div.innerHTML = getSaying();
            };
        }

        if(GM_config.get('as') == true) {
            let as = document.getElementsByTagName('a');
            for (var a of as) {
                if(a.classList.contains("vkyfy-vukkied")) continue;
                if(a.childElementCount != 0) continue;
                a.classList.add("vkyfy-vukkied");
                a.innerText = getSaying();
            };
        }

        if(GM_config.get('buttons') == true) {
            let buttons = document.getElementsByTagName('button');
            for (var button of buttons) {
                if(button.classList.contains("vkyfy-vukkied")) continue;
                if(button.childElementCount != 0) continue;
                a.classList.add("vkyfy-vukkied");
                button.innerText = getSaying();
            };
        }
    }

    function getSaying() {
        let sayings = ["Woo!", "Woo?", "Woo woo.", "Woohohooho!", "Woooo?"];
        return sayings[Math.floor(Math.random()*sayings.length)];
    }

    if(!deniedSites.includes(document.location.hostname)) setInterval(vukkyfy, 1000);
})();
