// ==UserScript==
// @name         Burn the Paywall
// @namespace    https://vukky.ga
// @version      0.1.0
// @description  Bypass paywalls in a few clicks!
// @author       Vukky
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?domain=12ft.io
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/burnthepaywall.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/burnthepaywall.user.js
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

    if(document.location.hostname == "12ft.io") return alert("Stop! You have violated the law!");
    document.location.href = `https://12ft.io/${document.location.href}`;
})();
