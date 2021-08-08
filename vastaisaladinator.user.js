// ==UserScript==
// @name         Vast.ai Saladinator
// @namespace    https://vukky.ga
// @version      0.1.2
// @description  Show profitable Vast.ai GPUs for Salad 2x earning rate mining using the Ozua Index.
// @author       Vukky
// @match        https://vast.ai/console/**
// @icon         https://www.google.com/s2/favicons?domain=vast.ai
// @updateURL    https://raw.githubusercontent.com/Vukkyy/userscripts/main/vastaisaladinator.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand('Set desirable Ozua Index', async () => {
        let desiredOzuaIndex = prompt("Please set your desired Ozua Index. Any machines lower than your desired Ozua Index will be nuked from the page.", "200")
        if(desiredOzuaIndex != null) await GM_setValue("ozuaindex", desiredOzuaIndex);
    })

    let hashrates = {
        "RTX A5000": 87,
        "RTX 3090": 107,
        "RTX 3080": 80,
        "RTX 3070": 60,
        "A100 PCIE": 174,
        "A100 SXM4": 174,
        "Tesla V100": 84
    }

    setInterval(async () => {
        let gpus = document.querySelectorAll('.card-expando');
        gpus = Array.from(gpus);
        for (let i = 0; i < gpus.length; i++) {
            if(gpus[i].querySelector(".dlperf").innerHTML.includes("Ozua Index")) continue;
            let gpuName = gpus[i].querySelector(".card-title").innerHTML.split("x ")[1];
            let gpuAmount = parseInt(gpus[i].querySelector(".card-title").innerHTML.split("x ")[0]);
            let gpuPrice = parseFloat(gpus[i].querySelector(`.price-label${document.location.href.includes("instances") ? " div" : ""}`).innerHTML.split("$")[1].split("/hr")[0]);
            let ozuaIndex = hashrates[gpuName] != undefined ? hashrates[gpuName] * gpuAmount / gpuPrice : null;
            gpus[i].querySelector(".dlperf").innerHTML = `${parseInt(ozuaIndex)} <a class="small-label" onclick="alert('The Ozua Index is a way to determine if a machine is profitable, using the formula (gpu hashrate * gpu amount / price). The higher, the better.')">Ozua Index</span>`;
            if(ozuaIndex == null || ozuaIndex < parseInt(await GM_getValue("ozuaindex", 200)) && !document.location.href.includes("instances")) {
                gpus[i].style.display = "none";
                continue;
            }
        }
    }, 1000);
})();