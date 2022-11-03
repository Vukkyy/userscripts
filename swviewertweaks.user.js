// ==UserScript==
// @name         SWViewer Tweaks
// @namespace    https://sus.omg.lol
// @version      0.1.2
// @description  try to take over the world! (this is the default desc, gonna get a better one eventually)
// @author       You
// @match        https://swviewer.toolforge.org/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=toolforge.org
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/Vukkyy/userscripts/main/swviewertweaks.user.js
// @updateURL    https://raw.githubusercontent.com/Vukkyy/userscripts/main/swviewertweaks.user.js
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener("click", function(e) {
      if(Array.from(e.target.parentNode.classList).some((x) => x.startsWith("queue"))) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/select.mp3").play();
      if(e.target.getAttribute("ng-click")) {
          if(e.target.getAttribute("ng-click").startsWith("selectSpeedy")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/send.mp3").play();
          if(e.target.getAttribute("ng-click").startsWith("selectRollback")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/send.mp3").play();
          if(e.target.getAttribute("ng-click").startsWith("doRevert")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/send.mp3").play();
          if(e.target.getAttribute("ng-click").startsWith("openCustomRevert")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/open.mp3").play();
          if(e.target.getAttribute("ng-click").startsWith("openTag")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/open.mp3").play();
          if(e.target.getAttribute("ng-click").startsWith("Back()")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/close.wav").play();
          if(e.target.getAttribute("ng-click").startsWith("nextDiff")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/select.mp3").play();
      }
      if(e.target.getAttribute("onclick")) {
          if(e.target.getAttribute("onclick").startsWith("toggleMoreControl")) {
              if(!document.querySelector("#moreControl.more-control__hidden")) {
                  new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/open.mp3").play();
              } else {
                  new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/close.wav").play();
              }
          }
          if(e.target.getAttribute("onclick").startsWith("closeMoreControl")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/close.wav").play();
          if(e.target.getAttribute("onclick").startsWith("closePO")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/close.wav").play();
          if(e.target.getAttribute("onclick").startsWith("openPO")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/open.mp3").play();
          if(e.target.getAttribute("onclick").startsWith("removeAllNotify")) new Audio("https://github.com/Vukkyy/userscripts/releases/download/skribblplus-music/close.wav").play();
      }
    })
})();
