// ==UserScript==
// @name         POPBOT
// @namespace    https://vukky.ga
// @version      0.2
// @description  popcat forever
// @author       Vukky
// @match        http*://popcat.click/
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/popbot.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/popbot.user.js
// ==/UserScript==

setInterval(function(){
    document.title = document.querySelector(".counter").textContent
}, 1)
window.popbot = {}
window.popbot.pop = async function pop(amount) {
        for(let i = 0; i < amount; i++){
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
            document.dispatchEvent(new KeyboardEvent('keyup',{'key':'a'}));
        }
        return "done";
}
window.popbot.popforever = async function popforever(amount) {
    await window.popbot.pop(amount)
    setTimeout(function(){
        window.popbot.popforever(amount)
    }, 1)
}