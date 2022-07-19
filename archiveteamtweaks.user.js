// ==UserScript==
// @name         ArchiveTeam Tweaks
// @namespace    https://vukky.ga
// @version      0.6.1
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
    if(document.title === "ArchiveTeam Warrior" && document.location.href.startsWith("http://127.0.0.1")) {
        console.log(`ArchiveTeam Tweaks ${version}`);
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
        function removeItem(item) {
            window.setTimeout(function() {
                $(item).slideUp(500, function() { $(item).remove(); });
            }, 5000);
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
            })
            $(".item").each(function() {
                if(this.classList.contains("item-completed")) {
                    $(this).children("h3").css("backgroundColor", "#326827");
                    removeItem(this);
                } else if (this.classList.contains("item-failed")) {
                    removeItem(this);
                }
            })
            $(".item h3 .name").each(function() {
                if($(this).text().length > 140) $(this).text("Item")
            });
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
        }, 1);
    } else if (document.location.hostname == "tracker.archiveteam.org") {
        if(document.querySelector("#log").innerHTML == "") {
            document.querySelector("#log").innerHTML = "Loading...";
        }
        console.log(`ArchiveTeam Tweaks ${version}`);
    }
})();
