// ==UserScript==
// @name         FandomDesktop Destroyer
// @namespace    https://vukky.ga
// @version      0.2.1
// @description  No one likes you and your attempts to ruin everything, Fandom.
// @author       Vukky
// @match        https://*.fandom.com/wiki/**
// @icon         https://www.google.com/s2/favicons?domain=fandom.com
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/fandomdesktopdestroyer.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand('Toggle Gamepedia dark mode', async () => {
        await GM_setValue("dark", !await GM_getValue("dark", false));
        if(!document.body.classList.contains("is-gamepedia")) alert(`Just to let you know, this isn't a Gamepedia wiki. Your choice has been saved - Gamepedia dark mode is now turned ${await GM_getValue("dark", false) == true ? "on" : "off"}. Press OK to finish.`);
        undesktop(await GM_getValue("dark", false));
    })

    if(document.body.classList.contains("skin-fandomdesktop")) {
        undesktop(GM_getValue("dark", false));
    }

    function undesktop(dark) {
        let noskin = new URL(document.location.href);
        if(document.body.classList.contains("is-gamepedia")) {
            // gamepedia wikis use a different skin, oasis doesn't work here
            noskin.searchParams.set("useskin", `hydra${dark == true ? "dark" : ""}`);
        } else {
            noskin.searchParams.set("useskin", "oasis");
        }
        document.location.replace(noskin.href);
    }
})();