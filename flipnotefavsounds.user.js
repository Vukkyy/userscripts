// ==UserScript==
// @name         Flipnote Hatena favorite sounds
// @namespace    https://sus.omg.lol
// @version      0.1
// @description  try to take over twitter!
// @author       You
// @match        https://twitter.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ugomemo.hatena.ne.jp
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/flipnotefavsounds.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/flipnotefavsounds.user.js
// ==/UserScript==

// this was originally intended to have mastodon support
// but mastodon is a crybaby and doesn't let any extensions run scripts
// so instead it requires OldTwitter: https://github.com/dimdenGD/OldTwitter

(function() {
    'use strict';

    function handleFolpnote(star) { // intentional typo i was bored lol
        star = star.target;
        let folpnoteColors = { // one day i'll make these have weighted probabilities
            "yellow": "#f6b64a",
            "green": "#2ba516",
            "red": "#f14b60",
            "blue": "#21bdfe",
            "purple": "#bb2ad0"
        }
        if(star.classList.contains("tweet-interact-favorited")) {
            let randomFolpnote = Object.keys(folpnoteColors)[Math.floor(Math.random()*Object.keys(folpnoteColors).length)];
            star.style.setProperty("--favorite-icon-color", folpnoteColors[randomFolpnote])
        } else if (star.classList.contains("tweet-interact-favorite")) {
            star.style.setProperty("--favorite-icon-color", "")
        }
    }

    window.addEventListener("click", handleFolpnote)
})();