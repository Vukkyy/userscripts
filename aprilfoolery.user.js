// ==UserScript==
// @name         April Foolery
// @namespace    https://vukky.ga
// @version      0.1
// @description  It's a mistake.
// @author       Vukky
// @match        http*://twitter.com/**
// @include      http*://*google.*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/aprilfoolery.user.js
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        if(document.location.hostname === "twitter.com") {
            if(document.querySelector(".public-DraftEditorPlaceholder-inner")) document.querySelector(".public-DraftEditorPlaceholder-inner").innerText = "Are you okay?";
        } else if (document.location.hostname.includes(".google.")) {
            let buttons = Array.from(document.querySelectorAll('input'))
            if(buttons.find(el => el.value === "Google Search")) buttons.find(el => el.value === "Google Search").setAttribute("value", "DuckDuckGo Search");
            if(buttons.find(el => el.value === "I'm Feeling Lucky")) buttons.find(el => el.value === "I'm Feeling Lucky").setAttribute("value", "I'm Feeling Unlucky");
            let images = Array.from(document.querySelectorAll('img'))
            if(images.find(el => el.alt === "Google")) {
                images.find(el => el.alt === "Google").src = "https://duckduckgo.com/assets/common/dax-logo.svg"
                images.find(el => el.alt === "Google").srcset = "https://duckduckgo.com/assets/common/dax-logo.svg"
            }
        }
    }, 100);
})();