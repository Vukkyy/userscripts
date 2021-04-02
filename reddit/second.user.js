// ==UserScript==
// @name         r/second
// @namespace    https://vukky.ga
// @version      0.1
// @description  Automate the usage of r/second.
// @author       Vukky
// @include      http*://second-api.reddit.com/embed*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/reddit/second.user.js
// ==/UserScript==

setInterval(() => {
    const charts = document.querySelector("afd2021-embed").shadowRoot.querySelector("afd2021-votes").shadowRoot.querySelectorAll("#chart > .image-votes > .votes-bar")
    const images = document.querySelector("afd2021-embed").shadowRoot.querySelector("afd2021-round").shadowRoot.querySelectorAll("faceplate-form > #image-container > label > button")
    const secondsLeft = document.querySelector("afd2021-embed").shadowRoot.querySelector("afd2021-votes").secondsLeft
    if(secondsLeft < 15 && secondsLeft != NaN) {
        if(charts[0].classList.contains("winner")) images[0].click();
        if(charts[1].classList.contains("winner")) images[1].click();
        if(charts[2].classList.contains("winner")) images[2].click();
    }
}, 1000);