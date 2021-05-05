// ==UserScript==
// @name         ArchiveTeam Tweaks
// @namespace    https://vukky.ga
// @version      0.4.0
// @description  Tweakings ArchiveTeam
// @author       Vukky
// @match        https://tracker.archiveteam.org/**
// @include      http://127.0.0.1:*
// @grant        GM.info
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/archiveteamtweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/archiveteamtweaks.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        let version = GM.info.script.version;
        let overloaded = " We don't want to overload the site we're archiving, so we've limited the number of downloads per minute.";
        let completedTasks = [];
        let failedTasks = [];
        if(document.title === "ArchiveTeam Warrior" && document.location.href.startsWith("http://127.0.0.1")) {
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
                })
                $(".item").each(function() {
                    if(this.classList.contains("item-completed")) $(this).children("h3").css("backgroundColor", "#326827");
                })
                $(".item h3 .name").each(function() {
                    if($(this).text().length > 140) $(this).text("Item")
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
        } else {
            if(document.querySelector("#log").innerHTML == "") {
                document.querySelector("#log").innerHTML = "Loading...";
            }
        }
        console.log(`ArchiveTeam Tweaks ${version}`);
    }, false);
})();