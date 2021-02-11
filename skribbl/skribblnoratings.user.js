// ==UserScript==
// @name         Skribbl: No Ratings
// @namespace    https://vukky.ga
// @version      0.2
// @description  Do you hate how people give you thumbs downs for NO REASON AT ALL??? This is for you!
// @author       Vukky
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblnoratings.user.js
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        if(document.getElementById("rateDrawing")) document.getElementById("rateDrawing").remove();
        var iconList = ["iconThumbsUp", "iconThumbsDown"];
        for (let j = 0; j < iconList.length; j++) {
            var icons = document.getElementsByClassName(iconList[j]);
            for (let i = 0; i < icons.length; i++) {
                const icon = icons[i];
                icon.remove();
            }
        }
    }, 1000);
})();