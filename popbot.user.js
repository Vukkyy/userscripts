// ==UserScript==
// @name         POPBOT
// @namespace    https://vukky.ga
// @version      0.5.1
// @description  popcat forever
// @author       Vukky
// @match        http*://popcat.click/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/popbot.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/popbot.user.js
// @icon         https://popcat.click/icons/favicon.ico
// ==/UserScript==

window.popbot = {}
window.popbot._internal = {
    userCountryCount: 0,
    showPopWarn: true,
    showBotWarn: true,
    showDropWarn: true,
    popForeverNumber: null,
    botWarn: function(){
        if(window.popbot._internal.showBotWarn == false) return;
        if(document.querySelector(".cat-img").classList.contains("bot") || document.cookie.includes("bot=true")) {
            document.cookie="bot=; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            if(window.popbot._internal.popForeverNumber != null) {
                document.location.search = window.popbot._internal.popForeverNumber
            } else {
                document.location.search = "bot"
            }
        }
    },
    numberWithCommas: function(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
}
setInterval(function(){
    let pop = document.querySelector(".mine > span > span > span") || document.querySelector(".mine") ? document.querySelector(".mine").parentNode.querySelector(".count > .animated-number") : null
    if(pop) {
        let unparsedpop = pop
        pop = parseInt(pop.textContent.replace(/,/g, "").trim())
        if(window.popbot._internal.userCountryCount > pop && window.popbot._internal.showDropWarn == true) {
            console.log(
                "%cDROP",
                "color:yellow;font-weight:bold",
                `- your country's count appears to have dropped! it used to be ${window.popbot._internal.numberWithCommas(window.popbot._internal.userCountryCount)} but now it's ${unparsedpop.textContent.trim()}`
            );
        }
        window.popbot._internal.userCountryCount = pop
    }
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
        }
        document.dispatchEvent(new KeyboardEvent('keyup',{'key':'a'}));
        return `your popcat just popped ${amount} time${amount == 1 ? "" : "s"}! pretty cool, don't you think?`;
}
window.popbot.popforever = async function popforever(amount) {
    window.popbot._internal.popForeverNumber = amount
    await window.popbot.pop(amount)
    setTimeout(function(){
        window.popbot.popforever(amount)
    }, 1)
}
window.popbot.popslow = async function popslow(amount) {
    window.popbot._internal.popForeverNumber = "slow" + amount
    await window.popbot.pop(amount)
    setTimeout(function(){
        window.popbot.popslow(amount)
    }, 1000)
}
window.popbot.popsuperspeed = async function popsuperspeed() {
    window.popbot._internal.popForeverNumber = "super"
    setInterval(function(){
        for (let i = 0; i < 1000; i++) {
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
        }
    }, 0);
}

console.groupCollapsed("POPBOT instructions")
console.log(
    "%cPOPBOT",
    "color:ffffff;font-size:4rem;-webkit-text-stroke: 2px black;font-weight:bold",
    "by vukky\nto start popping, you can do popbot.pop(amount), or to do it on loop forever, popbot.popforever(amount).\nif you must, use your inner poppery with popbot.popsuperspeed().\nfor example, below, type popbot.pop(1) and press enter to pop once!\n\npopbot is a fun project published for free. if you paid for it, you've been scammed.\nnote that the errors and warnings you may see here are normal most of the time!\n\nyou'll see some ✨ automatic drop logs ✨ to tell you when your country's pop count has dropped, but these will likely lag with a high pop amount."
);
console.groupEnd()

if(document.location.search) {
    console.log(
        "%cBOT DETECTED",
        "color:red;font-weight:bold",
        `- popbot has detected that the popcat may have discovered your botting at ${new Date().toTimeString()}!!\npopbot has tried to revert the curse of the popcat.`
    );
    if(document.location.search != "?bot") {
        if(!document.location.search.startsWith("?slow") && document.location.search != "?super") {
            window.popbot.popforever(parseInt(document.location.search.substr(1)))
        } else if (document.location.search == "?super") {
            window.popbot.popsuperspeed()
        } else {
            window.popbot.popslow(parseInt(document.location.search.substr(5)))
        }
    }
}