// ==UserScript==
// @name         FandomDesktop Destroyer
// @namespace    https://vukky.ga
// @version      0.1.0
// @description  No one likes you and your attempts to ruin everything, Fandom.
// @author       Vukky
// @match        https://*.fandom.com/wiki/**
// @icon         https://www.google.com/s2/favicons?domain=fandom.com
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/fandomdesktopdestroyer.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(document.body.classList.contains("skin-fandomdesktop")) {
        let noskin = new URL(document.location.href);
        if(document.querySelector(".gp-wiki-badge")) {
            // gamepedia wikis use a different skin, oasis doesn't work here
            noskin.searchParams.set("useskin", "hydra");
        } else {
            noskin.searchParams.set("useskin", "oasis");
        }
        document.location.href = noskin.href;
    }
})();