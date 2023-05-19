// ==UserScript==
// @name         ArchiveTeam Tweaks
// @namespace    https://vukky.ga
// @version      0.6.7
// @description  Tweakings ArchiveTeam
// @author       Vukky
// @match        http*://tracker.archiveteam.org/**
// @match        http://127.0.0.1:*
// @grant        GM.info
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/archiveteamtweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/archiveteamtweaks.user.js
// ==/UserScript==

(function() {
    'use strict';

    let version = GM.info.script.version;
    let overloaded = " We don't want to overload the site we're archiving, so we've limited the number of downloads per minute.";
    let completedTasks = [];
    let failedTasks = [];
    let itemNamePatcher = [];
    if(document.title === "ArchiveTeam Warrior" && document.location.href.startsWith("http://127.0.0.1")) {
        console.log(`ArchiveTeam Tweaks ${version}`);
        $("<style>.closed-name { display: none; } .item.closed .name { display: none; } .item.closed .closed-name { display: inline; }</style>").appendTo( "head" )
        $(document).on("click", ".twisty", function(event) {
            let item = $(event.target).parent().parent()[0];
            if(item.classList.contains("open")) {
                $(item).removeClass("open");
                $(item).addClass("closed");
            } else if (item.classList.contains("closed")) {
                $(item).removeClass("closed");
                $(item).addClass("open");
            }
        });
        function removeItem(item, doDelay = true) {
            window.setTimeout(function() {
                $(item).slideUp(500, function() { $(item).remove(); });
            }, doDelay ? 5000 : 0);
        }
        setInterval(() => {
            if($("#help ul")[1] != undefined && document.querySelector("#attv") == null) {
                let attv = document.createElement("li");
                attv.id = "attv";
                attv.innerHTML = `ArchiveTeam Tweaks version: ${GM.info.script.version}`;
                $("#help ul")[1].appendChild(attv);
            }
            $(".twisty").each(function() {
                if($(this).css("backgroundColor") != "inherit" || $(this).css("cursor") != "pointer") {
                    $(this).css("backgroundColor", "inherit");
                    $(this).css("cursor", "pointer");
                }
            })
            $(".log-line").each(function() {
                if($(this).text().includes(overloaded)) $(this).text($(this).text().split(overloaded).join(""));
                
                if($(this)[0].innerHTML != "") return;
                let pissLog = $(this)[0].parentNode.parentNode.querySelector(".log").innerHTML.split("\n")
                if(pissLog[pissLog.length-1] == "" && pissLog[pissLog.length-2] != "") $(this).text(pissLog[pissLog.length-2])
            })
            $(".item").each(function() {
                if(this.classList.contains("item-completed")) {
                    $(this).children("h3").css("backgroundColor", "#326827");
                    removeItem(this);
                } else if (this.classList.contains("item-failed")) {
                    removeItem(this, true);
                }
                if(!itemNamePatcher.includes(this.id)) {
                    itemNamePatcher.push(this.id);
                    $("<span class='closed-name'>Item</span>").insertBefore(`#${this.id} h3 .name`)
                }
            })
            $("#task-summary li .s").each(function() {
                if($(this).text() > 0 && $(this).parent().css("opacity") == 0.5) $(this).parent().css("opacity", "1")
                if($(this).text() == 0 && $(this).parent().css("opacity") == 1) $(this).parent().css("opacity", "0.5")
                if($(this).text() < 0 && $(this).parent().css("opacity") == 1) {
                    $(this).parent().css("opacity", "0.5") // there are a few cases where the number is negative
                    $(this).text("0");
                }
            });
            $(".links a").each(function() {
                $(this).attr("target", "_blank")
            });
            $(".item-completed").each(function() {
                if(!completedTasks.includes(this.id)) {
                    completedTasks.push(this.id);
                    let sfx = new Audio();
                    sfx.src = "https://github.com/ShareX/ShareX/blob/master/ShareX/Resources/TaskCompletedSound.wav?raw=true";
                    sfx.play();
                }
            });
            $(".item-failed").each(function() {
                if(!failedTasks.includes(this.id)) {
                    failedTasks.push(this.id);
                    let sfx = new Audio();
                    sfx.src = "https://github.com/ShareX/ShareX/blob/master/ShareX/Resources/ErrorSound.wav?raw=true";
                    sfx.play();
                }
            });
        }, 1);
    } else if (document.location.hostname == "tracker.archiveteam.org") {
        if(document.querySelector("#log").innerHTML == "") {
            document.querySelector("#log").innerHTML = "Loading...";
        }
        console.log(`ArchiveTeam Tweaks ${version}`);
    }
})();
