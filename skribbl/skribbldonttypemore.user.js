// ==UserScript==
// @name         Skribbl: Don't Type More
// @namespace    https://vukky.ga
// @version      0.4
// @description  Don't type more than the actual length of the word + 1! Run "vukkyDontTypeMoreOn = false" in console to quickly disable it - "vukkyDontTypeMoreOn = true" to turn back on.
// @author       Vukky
// @match        https://skribbl.io/**
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribbldonttypemore.user.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("Don't Type More Settings", opencfg);
    function opencfg() {
        GM_config.open();
    }
    GM_config.init(
        {
          'id': 'donttypemore',
          'title': "Don't Type More Settings",
          'fields': // Fields object
          {
            'trueLength':
            {
              'label': 'Use true length instead of length + 1',
              'type': 'checkbox',
              'default': false
            },
            'enabled':
            {
              'label': "Enable Don't Type More?",
              'type': 'checkbox',
              'default': true
            },
          }
    });

    if(document.location.href == "https://skribbl.io/vukky/donttypemore") {
        GM_config.open();
    }

    setInterval(() => {
        var wordLength = document.getElementById("currentWord").textContent.length;
        if(GM_config.get('enabled') == true && !wordLength == 0) {
            var maxLength;
            if(GM_config.get('trueLength') == true) {
                maxLength = wordLength;
            } else {
                maxLength = wordLength + 1;
            }
            document.getElementById("inputChat").setAttribute("maxlength", maxLength);
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here... (max " + maxLength + " characters)");
        } else {
            document.getElementById("inputChat").setAttribute("maxlength", "100");
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here...");
        }
    }, 1000);
})();