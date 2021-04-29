// ==UserScript==
// @name         ArchiveTeam Tweaks
// @namespace    https://vukky.ga
// @version      0.2.0
// @description  Tweakings ArchiveTeam
// @author       Vukky
// @match        https://tracker.archiveteam.org/**
// @match        http://127.0.0.1:8001
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/archiveteamtweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/archiveteamtweaks.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        let version = "0.2.0";
        let overloaded = " We don't want to overload the site we're archiving, so we've limited the number of downloads per minute.";
        if(document.title === "ArchiveTeam Warrior" && document.location.href === "http://127.0.0.1:8001/") {
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
                $(".twisty").each(function() {
                    if($(this).css("backgroundColor") != "inherit") $(this).css("backgroundColor", "inherit");
                })
                $(".log-line").each(function() {
                    if($(this).text().includes(overloaded)) $(this).text($(this).text().split(overloaded).join(""));
                })
                $(".item").each(function() {
                    if(this.classList.contains("item-completed")) $(this).children("h3").css("backgroundColor", "#326827");
                })
            }, 1);
        } else {
            if(document.querySelector("#log").innerHTML == "") {
                document.querySelector("#log").innerHTML = "Loading...";
            }
        }
        console.log(`ArchiveTeam Tweaks ${version}`);
    }, false);
})();