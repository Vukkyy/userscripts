// ==UserScript==
// @name         WikiTweak
// @namespace    https://vukky.ga
// @version      0.1
// @description  Makes Vukky's Wikipedia experience slightly better. Other people probably shouldn't care.
// @author       Vukky
// @include      http*://*.wikipedia.org/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/personal/wikitweak.user.js
// ==/UserScript==

setInterval(() => {
    let thingi = document.querySelector(".archived-section-prompt")
    if(thingi && thingi.innerText.startsWith('No search results found for section "noticeApplied-')) {
        thingi.remove();
    }
}, 150);