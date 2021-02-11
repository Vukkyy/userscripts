// ==UserScript==
// @name         Better YT Studio
// @namespace    https://vukky.ga
// @version      0.1
// @description  YouTube Studio, but Better.
// @author       Vukky
// @match        http*://studio.youtube.com/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/betterytstudio.user.js
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        var copyrightClaimItems = ["style-scope ytcp-video-row restrictions-list"]
        for (let j = 0; j < copyrightClaimItems.length; j++) {
            const copyrightClaimItem = copyrightClaimItems[j];
            var restrictions = document.getElementsByClassName(copyrightClaimItem)
            for (let i = 0; i < restrictions.length; i++) {
                const restriction = restrictions[i];
                if(restriction.tagName != "YTCP-BUTTON" && restriction.tagName != "A") {
                    restriction.innerHTML = restriction.innerHTML.replace("Copyright claim", "Content ID claim");
                }
            }
        }
    }, 1000);
})();