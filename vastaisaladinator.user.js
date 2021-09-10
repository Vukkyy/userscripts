// ==UserScript==
// @name         Vast.ai Saladinator
// @namespace    https://vukky.ga
// @version      0.4.3
// @description  Improves vast.ai for usage with salad.com.
// @author       Vukky
// @match        https://vast.ai/console/**
// @icon         https://www.google.com/s2/favicons?domain=vast.ai
// @updateURL    https://raw.githubusercontent.com/Vukkyy/userscripts/main/vastaisaladinator.user.js
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      app-api.salad.io
// ==/UserScript==

var saladRateExpiry = "Loading...";
var saladRate = 2;
(function() {
    'use strict';

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://app-api.salad.io/api/v2/bonuses/earning-rate",
        onload: function(response) {
          if(response.status == 401) {
            saladRateExpiry = "<a href='https://app.salad.io/login' target='_blank'>Login with Salad</a>";
          }
          if(response.status == 404) {
            saladRateExpiry = "You have no special earning rate.";
            saladRate = 1;
          }
          if(JSON.parse(response.responseText).earnedAmountLimit != undefined) {
            saladRateExpiry = `${JSON.parse(response.responseText).earnedAmount}/${JSON.parse(response.responseText).earnedAmountLimit} (refresh to update)`
            saladRate = parseInt(JSON.parse(response.responseText).multiplier);
          } else {
            saladRateExpiry = new Date(JSON.parse(response.responseText).endsAt).toLocaleString();
            saladRate = parseInt(JSON.parse(response.responseText).multiplier);
          }
        }
    });

    if(!localStorage.getItem("ozuaindex")) {
        localStorage.setItem("ozuaindex", "200");
        localStorage.setItem("blockedinstances", "");
    }

    GM_registerMenuCommand('Set desirable Ozua Index', async () => {
        let desiredOzuaIndex = prompt("Please set your desired Ozua Index. Any machines lower than your desired Ozua Index will be nuked from the page.", "200")
        if(desiredOzuaIndex != null) localStorage.setItem("ozuaindex", desiredOzuaIndex);
    })

    GM_registerMenuCommand('Clear hidden machines data', async () => {
        localStorage.setItem("blockedinstances", "");
        alert("You should now see hidden machines again!");
    })

    let hashrates = {
        "RTX A5000": 87,
        "RTX 3090": 107,
        "RTX 3080": 80,
        "RTX 3070": 52,
        "A100 PCIE": 174,
        "A100 SXM4": 174,
        "Tesla V100": 84
    }

    setInterval(async () => {
        if(document.querySelector(".rent-notification h4")) document.querySelector(".rent-notification h4").innerHTML = "It's yours!";

        // HA HA I AM SO FUNNY
        document.querySelector(".vast-logo").innerHTML = "salad.ai";

        // Add Ozua Index to GPUs
        let gpus = Array.from(document.querySelectorAll('.card-expando'));
        for (let i = 0; i < gpus.length; i++) {
            let gpuName = gpus[i].querySelector(".card-title").innerHTML.split("x ")[1];
            let gpuAmount = parseInt(gpus[i].querySelector(".card-title").innerHTML.split("x ")[0]);
            let gpuPrice = parseFloat(gpus[i].querySelector(`.price-label${document.location.href.includes("instances") ? " div" : ""}`).innerHTML.split("$")[1].split("/hr")[0]);
            let ozuaIndex = hashrates[gpuName] != undefined ? hashrates[gpuName] * gpuAmount / gpuPrice : null;
            if(!document.location.href.includes("instances")) {
                let blockedInstances = localStorage.getItem("blockedinstances").split(",");
                if(blockedInstances.includes(gpus[i].querySelector(".instance-id").innerHTML) || ozuaIndex == null || ozuaIndex < localStorage.getItem("ozuaindex") && !document.location.href.includes("instances")) {
                    gpus[i].style.display = "none";
                    continue;
                } else {
                    gpus[i].style.display = "";
                }
            } else if(ozuaIndex == null) {
                ozuaIndex = "?";
            }
            gpus[i].querySelector(".dlperf").innerHTML = `${parseInt(ozuaIndex)} <a class="small-label" onclick="alert('The Ozua Index is a way to determine if a machine is profitable, using the formula (gpu hashrate * gpu amount / price). The higher, the better.')">Ozua Index</span>`;
            if(!gpus[i].querySelector(".hide-button")) {
                gpus[i].querySelectorAll(".hostname")[1].className = "hostname hide-button";
                gpus[i].querySelector(".hide-button").innerHTML = "(<a>hide</a>)";
                gpus[i].querySelector(".hide-button a").onclick = async function(event){
                    if(confirm("Are you sure? You won't see this instance on the Create page again!") == true) {
                        let blockedInstances = localStorage.getItem("blockedinstances").split(",");
                        if(blockedInstances.includes(event.path[2].querySelector(".instance-id").innerHTML)) return;
                        blockedInstances.push(event.path[2].querySelector(".instance-id").innerHTML);
                        localStorage.setItem("blockedinstances", blockedInstances.join());
                    }
                };
            }
        }

        // Show stats on instance page
        if(document.location.href.includes("instances")) {
            if(!document.querySelector("#fancystats")) {
                let fancyStats = document.createElement("div");
                fancyStats.id = "fancystats";
                fancyStats.innerHTML = "<b>Fancy Stats!</b><div id='averageOZI'></div><div id='instancePrice'></div><div id='earningRateExpiry'></div><br>"
                document.querySelector(".instances-table").insertBefore(fancyStats, document.querySelector(".card-expando"));
            }
            let ozuaIndexes = Array.from(document.querySelectorAll(".dlperf")).map(e => parseInt(e.innerHTML.split(" ")[0]));
            let totalOzuaIndex = 0;
            for (let i = 0; i < ozuaIndexes.length; i++) {
                if(ozuaIndexes[i] == "?") continue;
                totalOzuaIndex += ozuaIndexes[i];
            }
            let activeMachines = Array.from(document.querySelectorAll(".connect-button")).map(e => e.parentNode.parentNode);
            let gpuPrices = Array.from(activeMachines.map(e => parseFloat(e.querySelector(".price-label").innerHTML.split("$")[1].split("/hr")[0])));
            let totalGpuPrice = 0;
            for (let i = 0; i < gpuPrices.length; i++) {
                totalGpuPrice += gpuPrices[i];
            }
            document.querySelector("#averageOZI").innerHTML = `Average <a onclick="alert('The Ozua Index is a way to determine if a machine is profitable, using the formula (gpu hashrate * gpu amount / price). The higher, the better.')">Ozua Index</a>: ${parseInt(totalOzuaIndex / ozuaIndexes.length)}`
            document.querySelector("#instancePrice").innerHTML = `Total cost of active instances: $${totalGpuPrice.toFixed(3)}/hr ($${(totalGpuPrice.toFixed(3) / saladRate / 4).toFixed(3)}/15min to be profitable)`
            document.querySelector("#earningRateExpiry").innerHTML = `Salad earning rate will expire on: ${saladRateExpiry}`
        }
    }, 1000);
})();
