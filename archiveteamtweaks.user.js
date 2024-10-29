// ==UserScript==
// @name         ArchiveTeam Tweaks
// @namespace    https://vukky.ga
// @version      0.7.0
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
    if(document.title === "ArchiveTeam Warrior" && document.location.href.startsWith("http://127.0.0.1")) {
        console.log(`ArchiveTeam Tweaks ${version}`);
        const css = `
            .item.closed .name {
                display: inline-block;
                max-width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 0.5em;
                margin-right: 0.5em;
                border-right: 1px solid grey;
            }
            .status-line {
                display: none;
            }
            .item .log-line,
            .item .name,
            .item .twisty {
                font-family: 'Terminus' !important;
                color: #aaa;
                z-index: 1;
                background-color: transparent !important;
            }
            .item .log-line {
                color: white;
            }
            .item h3 {
                display: flex;
            }
            .item h3:before {
                content: "";
                background-color: blue;
                width: var(--progress);
                height: 24px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .name, .twisty {
                cursor: pointer;
            }
            .item-completed {
            background-color: #326827
            }
            .log {
            font-family: 'Terminus' !important;
            }
            .status {
            left: 94% !important;
            }
        `;
        $('head').append(`<style>${css}</style>`);

        $(document).on("click", ".twisty, .name", function(event) {
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
            $(".log-line").each(function() {
                if($(this).text().includes(overloaded)) $(this).text($(this).text().split(overloaded).join(""));

                if($(this)[0].innerHTML != "") return;
                let logList = $(this)[0].parentNode.parentNode.querySelector(".log").innerHTML.split("\n")
                if(logList[logList.length-1] == "" && logList[logList.length-2] != "") $(this).text(logList[logList.length-2])
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
                    if(!document.hasFocus()) return;

                    new Audio("https://github.com/ShareX/ShareX/blob/master/ShareX/Resources/TaskCompletedSound.wav?raw=true").play();
                }
            });
            $(".item-failed").each(function() {
                if(!failedTasks.includes(this.id)) {
                    failedTasks.push(this.id);
                    new Audio("https://github.com/ShareX/ShareX/blob/master/ShareX/Resources/ErrorSound.wav?raw=true").play();
                }
            });
        }, 1);
        setInterval(function() {
            $(".log-line").each(function() {
                const timer = $(this).text().match(/(?:Retrying after|Sleeping) (\d+)(?: seconds|s)/)
                if(timer) {
                    $(this).text($(this).text().replace(timer[0], timer[0].replace(timer[1], parseInt(timer[1] - 1))))
                }
            })
        }, 1000)
    } else if (document.location.hostname == "tracker.archiveteam.org") {
        if(document.querySelector("#log").innerHTML == "") {
            document.querySelector("#log").innerHTML = "Loading...";
        }
        console.log(`ArchiveTeam Tweaks ${version}`);
    }
})();
