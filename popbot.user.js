// ==UserScript==
// @name         POPBOT
// @namespace    https://vukky.ga
// @version      0.3
// @description  popcat forever
// @author       Vukky
// @match        http*://popcat.click/
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/popbot.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/popbot.user.js
// ==/UserScript==

window.popbot = {}
window.popbot._internal = {
    showPopWarn: true,
    showBotWarn: true,
    botWarn: function(){
        if(window.popbot._internal.showBotWarn == false) return;
        if(document.querySelector(".cat-img").classList.contains("bot") || document.cookie.includes("bot=true")) {
            document.querySelector(".cat-img").classList.remove("bot")
            document.cookie="bot=; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            console.log(
                "%cWARNING",
                "color:red;font-size:4rem;-webkit-text-stroke: 2px black;font-weight:bold",
                "\npopbot has detected that the popcat has discovered your botting!!\npopbot has tried to revert the curse of the popcat, but a refresh may be needed."
            );
        }
    }
}
setInterval(function(){
    document.title = document.querySelector(".counter").textContent
    window.popbot._internal.botWarn()
}, 1)
window.popbot.pop = async function pop(amount) {
        if(!amount) amount = 1;
        if(amount >= 4000 && window.popbot._internal.showPopWarn == true) {
            console.warn("hey! it may take a while to pop this long, just so you know. this message won't show again until you close the tab or refresh.")
            window.popbot._internal.showPopWarn = false
        }
        for(let i = 0; i < amount; i++){
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
            document.dispatchEvent(new KeyboardEvent('keyup',{'key':'a'}));
        }
        return `your popcat just popped ${amount} time${amount == 1 ? "" : "s"}! pretty cool, don't you think?`;
}
window.popbot.popforever = async function popforever(amount) {
    await window.popbot.pop(amount)
    setTimeout(function(){
        window.popbot.popforever(amount)
    }, 1)
}

console.log(
    "%cPOPBOT",
    "color:ffffff;font-size:4rem;-webkit-text-stroke: 2px black;font-weight:bold",
    "by vukky\nto start popping, you can do popbot.pop(amount), or to do it on loop forever, popbot.popforever(amount)\nfor example, below, type popbot.pop(1) and press enter to pop once!\n\npopbot is a fun project published for free. if you paid for it, you've been scammed.\nnote that the errors and warnings you may see here are normal most of the time!"
);