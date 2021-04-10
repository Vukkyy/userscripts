// ==UserScript==
// @name         skribbl+
// @namespace    https://vukky.ga
// @version      0.11.1
// @description  skribbl+ is a combination of all the Skribbl userscripts that I have previously created, with brand new features.
// @author       Vukky
// @icon         https://skribbl.io/res/favicon.png
// @match        http*://skribbl.io/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblplus.user.js
// @downloadURL  https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblplus.user.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("skribbl+: Settings", opencfg);
    function opencfg() {
        GM_config.open();
    }
    GM_config.init(
        {
          'id': 'skribblplus',
          'title': "skribbl+ 0.11.1",
          'fields':
          {
            'removeavatars':
            {
              'label': 'Remove avatars',
              'section': ['Avatar Customization', 'Customize the Skribbl avatars.'],
              'type': 'checkbox',
              'default': false
            },
            'crownsforall':
            {
              'label': "Give all avatars a crown (refresh to disable)",
              'type': 'checkbox',
              'default': false
            },
            'crownsfornone':
            {
              'label': "Remove crowns from avatars (refresh to disable)",
              'type': 'checkbox',
              'default': false
            },
            'removeavatarbodies':
            {
              'label': "Remove all bodies from avatars",
              'type': 'checkbox',
              'default': false
            },
            'donttypemore':
            {
              'label': 'Enable Don\'t Type More',
              'section': ['Don\'t Type More', 'Don\'t type more than the actual length of the word.'],
              'type': 'checkbox',
              'default': false
            },
            'donttypemorecharacters':
            {
              'label': 'How many extra characters?',
              'type': 'unsigned int',
              'min': 0,
              'default': 1
            },
            'deletechatmessages':
            {
              'label': 'Delete individual chat messages',
              'section': ['Misc', 'Various other features.'],
              'type': 'checkbox',
              'default': true
            },
            'language':
            {
              'label': "Skribbl.io UI language (Disable will make skribbl+ stop editing the UI text)",
              'type': 'radio',
              'options': ['English', 'Norwegian', 'Disable'],
              'default': 'English'
            },
            'music':
            {
              'label': "Play music",
              'type': 'checkbox',
              'default': true
            },
            'googlelookup':
            {
              'label': "Look up word on Google button (only when you are drawing)",
              'type': 'checkbox',
              'default': true
            }, 
            'quickjump':
            {
              'label': "Buttons to easily switch lobbies",
              'type': 'checkbox',
              'default': true
            }
          },
          'css': "#skribblplus .section_header_holder { text-align: center; }",
          'events': {
            'open': function() {
                function removeAvatarsDisabler() {
                    var crownsforall = GM_config.get('crownsforall', true);
                    var crownsfornone = GM_config.get('crownsfornone', true);
                    var removeavatarbodies = GM_config.get('removeavatarbodies', true);
                    if(crownsforall == false && removeavatarbodies == false && crownsfornone == false) {
                        GM_config.fields['removeavatars'].node.disabled = false
                    } else {
                        GM_config.fields['removeavatars'].node.disabled = true
                    }
                }
                var crownsfornone = GM_config.get('crownsfornone', true);
                var crownsforall = GM_config.get('crownsfornone', true);
                if(crownsfornone == false) {
                    GM_config.fields['crownsforall'].node.disabled = false
                } else {
                    GM_config.fields['crownsforall'].node.disabled = true
                }
                if(crownsforall == false) {
                    GM_config.fields['crownsforall'].node.disabled = false
                } else {
                    GM_config.fields['crownsforall'].node.disabled = true
                }
                removeAvatarsDisabler();
                GM_config.fields['removeavatars'].node.addEventListener('change', function () {
                    var removeavatars = GM_config.get('removeavatars', true);
                    if(removeavatars == false) {
                        GM_config.fields['crownsforall'].node.disabled = false
                        GM_config.fields['crownsfornone'].node.disabled = false
                        GM_config.fields['removeavatarbodies'].node.disabled = false
                    } else {
                        GM_config.fields['crownsforall'].node.disabled = true
                        GM_config.fields['crownsfornone'].node.disabled = true
                        GM_config.fields['removeavatarbodies'].node.disabled = true
                    }
                }, false);
                GM_config.fields['crownsforall'].node.addEventListener('change', function () {
                    var crownsforall = GM_config.get('crownsforall', true);
                    removeAvatarsDisabler();
                    if(crownsforall == false) {
                        GM_config.fields['crownsfornone'].node.disabled = false
                    } else {
                        GM_config.fields['crownsfornone'].node.disabled = true
                    }
                }, false);
                GM_config.fields['crownsfornone'].node.addEventListener('change', function () {
                    var crownsfornone = GM_config.get('crownsfornone', true);
                    removeAvatarsDisabler();
                    if(crownsfornone == false) {
                        GM_config.fields['crownsforall'].node.disabled = false
                    } else {
                        GM_config.fields['crownsforall'].node.disabled = true
                    }
                }, false);
                GM_config.fields['removeavatarbodies'].node.addEventListener('change', function () {
                    var crownsforall = GM_config.get('crownsforall', true);
                    var removeavatarbodies = GM_config.get('removeavatarbodies', true);
                    if(crownsforall == false && removeavatarbodies == false) {
                        GM_config.fields['removeavatars'].node.disabled = false
                    } else {
                        GM_config.fields['removeavatars'].node.disabled = true
                    }
                }, false);
            },
            'reset': function() {
                GM_config.save();
                GM_config.close();
                GM_config.open();
            }
          }
    });

    const changelog = "<strong>Skribbl+ 0.11.1</strong><br>If you join a lobby and someone's already drawing, you'll now hear the guessing music!"
    setInterval(() => {
        document.querySelector(".gameHeaderButtons").style = "display: flex; float: right; justify-content: center; align-items: center;"
        document.querySelector(".grecaptcha-badge").style.display = "none"
        if(!document.querySelector("#skribblplusCredit")) {
            let credit = document.createElement('a');
            credit.innerHTML = '<img style="margin-right:5px" src="res/social/twitter.png">skribbl+ by Vukky</a>'
            credit.href = "https://twitter.com/vukky_ltd"
            credit.id = "skribblplusCredit"
            credit.style.marginLeft = "10px"
            document.querySelector(".col-xs-12").childNodes[0].appendChild(credit)
        }
        var messages = document.getElementById("boxMessages").childNodes
        for (let i = 0; i < messages.length; i++) {
            if(messages[i] == undefined) break;
            let message = messages[i];
            let messageText = messages[i].getElementsByTagName("span")[messages[i].getElementsByTagName("span").length - 1];
            if(/https:\/\/www.(twitch|youtube).​(com|tv)\//.test(messageText.innerText)) message.remove()
        }

        var lang_play, lang_lobby_play, lang_create_private_room, lang_delete_message, lang_rounds, lang_language, lang_invite_your_friends, lang_players, lang_contact, lang_result, lang_score, lang_you, lang_round, lang_round_of, lang_settings, lang_copy, lang_time_is_up, lang_the_word_was, lang_choosing_a_word, lang_choose_a_word, lang_guessed_word, lang_joined, lang_drawing_now, lang_left, lang_skribblplus_settings;
        switch(GM_config.get('language')) {
            case "Norwegian":
                lang_play = "Spill!",
                lang_lobby_play = "Start Spill"
                lang_create_private_room = "Lag Privat Rom",
                lang_delete_message = "Slett denne meldingen",
                lang_rounds = "Runder",
                lang_language = "Språk",
                lang_invite_your_friends = "Inviter vennene dine!",
                lang_players = "Spillere",
                lang_contact = "Kontakt",
                lang_result = "Resultat",
                lang_score = "Poeng:",
                lang_you = "Deg",
                lang_round = "Runde",
                lang_round_of = "av",
                lang_settings = "Innstillinger",
                lang_copy = "Kopier",
                lang_time_is_up = "Tiden er ute!",
                lang_the_word_was = "Ordet var",
                lang_choosing_a_word = "velger et ord!",
                lang_choose_a_word = "Velg et ord",
                lang_guessed_word = "gjettet ordet!",
                lang_joined = "ble med.",
                lang_drawing_now = "tegner nå!",
                lang_left = "gikk ut.",
                lang_skribblplus_settings = "skribbl+ innstillinger"
                break;
            default:
                lang_play = "Play!",
                lang_lobby_play = "Start Game"
                lang_create_private_room = "Create Private Room",
                lang_delete_message = "Delete this message",
                lang_rounds = "Rounds",
                lang_language = "Language",
                lang_invite_your_friends = "Invite your friends!",
                lang_players = "Players",
                lang_contact = "Contact",
                lang_result = "Result"
                lang_score = "Points:",
                lang_you = "You",
                lang_round = "Round",
                lang_round_of = "of",
                lang_settings = "Settings",
                lang_copy = "Copy",
                lang_time_is_up = "Time is up!",
                lang_the_word_was = "The word was",
                lang_choosing_a_word = "is choosing a word!",
                lang_choose_a_word = "Choose a word",
                lang_guessed_word = "guessed the word!",
                lang_joined = "joined.",
                lang_drawing_now = "is drawing now!",
                lang_left = "left.",
                lang_skribblplus_settings = "skribbl+ settings"
                break;
        }
        document.getElementById("formLogin").childNodes[2].id = "buttonLoginPlay"
        if(GM_config.get('language') != "Disable") {
            document.getElementById("buttonLoginPlay").innerText = lang_play
            document.getElementById("buttonLoginCreatePrivate").innerText = lang_create_private_room
            document.getElementById("buttonLobbyPlay").innerText = lang_lobby_play
            document.getElementsByClassName("containerSettings")[0].childNodes[0].childNodes[0].innerText = lang_rounds
            document.getElementsByClassName("containerSettings")[0].childNodes[2].childNodes[0].innerText = lang_language
            document.getElementsByClassName("invite-container")[0].childNodes[0].innerText = lang_invite_your_friends
            document.getElementsByClassName("lobbySection")[0].childNodes[0].innerText = lang_players
            document.getElementsByClassName("lobbySectionSettings")[0].childNodes[0].innerText = lang_settings
            document.getElementById("inviteCopyButton").innerText = lang_copy
            document.getElementsByClassName("you")[0].innerText = lang_you
            document.getElementById("tos").childNodes[0].innerText = lang_contact
            if (document.getElementById("overlay").childNodes[0].childNodes[0].innerText == "Result") {
                document.getElementById("overlay").childNodes[0].childNodes[0].innerText = lang_result
            } else if (document.getElementById("overlay").childNodes[0].childNodes[0].innerText.startsWith("Round")) {
                document.getElementById("overlay").childNodes[0].childNodes[0].innerText = lang_round + " " + document.getElementById("overlay").childNodes[0].childNodes[0].innerText.match(/\d+/g)[0]
            } else if (document.getElementById("overlay").childNodes[0].childNodes[0].innerText.startsWith("The word was:")) {
                document.getElementById("overlay").childNodes[0].childNodes[0].innerText = lang_the_word_was + ": " + document.getElementById("overlay").childNodes[0].childNodes[0].innerText.split("The word was: ")[1]
            } else if (document.getElementById("overlay").childNodes[0].childNodes[0].innerText.endsWith("is choosing a word!")) {
                document.getElementById("overlay").childNodes[0].childNodes[0].innerText = document.getElementById("overlay").childNodes[0].childNodes[0].innerText.split(" is choosing a word!")[0] + " " + lang_choosing_a_word
            } else if (document.getElementById("overlay").childNodes[0].childNodes[0].innerText == "Choose a word") {
                document.getElementById("overlay").childNodes[0].childNodes[0].innerText = lang_choose_a_word
            }
            if (document.getElementsByClassName("revealReason")[0].innerText == "Time is up!") {
                document.getElementsByClassName("revealReason")[0].innerText = lang_time_is_up
            }
            var scores = document.getElementsByClassName("score")
            for (let i = 0; i < scores.length; i++) {
                const score = scores[i];
                if(score.parentNode.parentNode.className == "revealContainer" || score.innerText == "" && !score.parentNode.parentNode.id.startsWith("player") || score.parentNode.parentNode.id == "") continue;
                score.innerText = lang_score + " " + score.innerText.replace( /^\D+/g, '')
            }
            var names = document.getElementsByClassName("name")
            for (let i = 0; i < names.length; i++) {
                const name = names[i];
                if(name.innerText == "" || !name.innerText.endsWith(")")) continue;
                name.innerText = name.innerText.split('(')[0].trim() + " (" + lang_you + ")"
            }
            var messages = document.getElementById("boxMessages").childNodes
            for (let i = 0; i < messages.length; i++) {
                if(messages[i] == undefined) break;
                let message = messages[i];
                let messageText = messages[i].getElementsByTagName("span")[messages[i].getElementsByTagName("span").length - 1];
                if(message.style.color == "rgb(86, 206, 39)" && messageText.innerText.endsWith("guessed the word!")) messageText.innerText = messageText.innerText.split(" guessed the word!")[0] + " " + lang_guessed_word;
                if(message.style.color == "rgb(86, 206, 39)" && messageText.innerText.endsWith("joined.")) messageText.innerText = messageText.innerText.split(" joined.")[0] + " " + lang_joined;
                if(message.style.color == "rgb(86, 206, 39)" && messageText.innerText.startsWith("The word was")) messageText.innerText = lang_the_word_was + " " + messageText.innerText.split("The word was ")[1];
                if(message.style.color == "rgb(57, 117, 206)" && messageText.innerText.endsWith("is drawing now!")) messageText.innerText = messageText.innerText.split(" is drawing now!")[0] + " " + lang_drawing_now;
                if(message.style.color == "rgb(206, 79, 10)" && messageText.innerText.endsWith("left.")) messageText.innerText = messageText.innerText.split(" left.")[0] + " " + lang_left;
            }
            if(document.getElementById("round").innerText.match(/\d+/g) != null) {
                document.getElementById("round").innerText = lang_round + " " + document.getElementById("round").innerText.match(/\d+/g)[0] + " " + lang_round_of + " " + document.getElementById("round").innerText.match(/\d+/g)[1]
            }
        }

        if(GM_config.get('removeavatars') == true) {
            var avatars = document.getElementsByClassName("avatar");
            for (let i = 0; i < avatars.length; i++) {
                const avatar = avatars[i];
                avatar.style.display = 'none';
            }
            var avatarContainers = document.getElementsByClassName("avatarContainer");
            for (let i = 0; i < avatarContainers.length; i++) {
                const avatarContainer = avatarContainers[i];
                avatarContainer.style.display = 'none';
            }
            document.getElementById("loginAvatarCustomizeContainer").style.display = 'none';
            document.getElementById("logoAvatarContainer").style.display = 'none';
        } else if (GM_config.get('removeavatars') == false) {
            var avatars = document.getElementsByClassName("avatar");
            for (let i = 0; i < avatars.length; i++) {
                const avatar = avatars[i];
                if(avatar.id == "logoAvatarDummy") continue;
                avatar.style.display = '';
            }
            var avatarContainers = document.getElementsByClassName("avatarContainer");
            for (let i = 0; i < avatarContainers.length; i++) {
                const avatarContainer = avatarContainers[i];
                avatarContainer.style.display = '';
            }
            document.getElementById("loginAvatarCustomizeContainer").style.display = '';
            document.getElementById("logoAvatarContainer").style.display = '';
        }

        if(GM_config.get('crownsforall') == true) {
            var crowns = document.getElementsByClassName("owner");
            for (let i = 0; i < crowns.length; i++) {
                const crown = crowns[i];
                crown.style.display = "";
            }
        }

        if(GM_config.get('crownsfornone') == true) {
            var crowns = document.getElementsByClassName("owner");
            for (let i = 0; i < crowns.length; i++) {
                const crown = crowns[i];
                crown.style.display = "none";
            }
        }

        if(GM_config.get('removeavatarbodies') == true) {
            var bodies = document.getElementsByClassName("color");
            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                body.style.display = "none";
            }

            var avatarArrows = document.getElementsByClassName("avatarArrow");
            for (let i = 0; i < avatarArrows.length; i++) {
                const avatarArrow = avatarArrows[i];
                if(avatarArrow.className.startsWith("avatarArrow avatarArrow") && avatarArrow.attributes[1].value == "0") {
                    avatarArrow.style.display = "none";
                }
            }
        } else if (GM_config.get('removeavatarbodies') == false) {
            var bodies = document.getElementsByClassName("color");
            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                body.style.display = "";
            }

            var avatarArrows = document.getElementsByClassName("avatarArrow");
            for (let i = 0; i < avatarArrows.length; i++) {
                const avatarArrow = avatarArrows[i];
                if(avatarArrow.className.startsWith("avatarArrow avatarArrow") && avatarArrow.attributes[1].value == "0") {
                    avatarArrow.style.display = "";
                }
            }
        }

        if(GM_config.get('deletechatmessages') == true) {
            // Some of this code is from https://github.com/Sv443/skribbl.io-plus.
            // Copyright (c) 2018 Sv443 / Sven Fehler
            // https://raw.githubusercontent.com/Sv443/skribbl.io-plus/master/LICENSE
            var deleteButton = "<span id='del_msg' style='font-weight: bold; color: red; cursor: pointer;' title='" + lang_delete_message + "'>X</span> ";
            var messages = document.getElementById("boxMessages").childNodes;
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i].innerHTML;
                if(message == undefined) break;
                if(messages[i].querySelector("#del_msg") == null) {
                    messages[i].innerHTML = deleteButton + message
                    messages[i].querySelector("#del_msg").addEventListener("click", function(){this.parentNode.remove();});
                }
            }
        } else if (GM_config.get('deletechatmessages') == false) {
            var messages = document.getElementById("boxMessages").childNodes;
            for (let i = 0; i < messages.length; i++) {
                if(messages[i].querySelector("#del_msg") != null) {
                    messages[i].querySelector("#del_msg").remove();
                }
            }
        }

        var wordLength = document.getElementById("currentWord").textContent.length;
        if(GM_config.get('donttypemore') == true && wordLength != 0) {
            var maxLength;
            maxLength = wordLength + GM_config.get('donttypemorecharacters')
            document.getElementById("inputChat").setAttribute("maxlength", maxLength);
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here... (max " + maxLength + " characters)");
        } else {
            document.getElementById("inputChat").setAttribute("maxlength", "100");
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here...");
        }

        document.getElementById("tabUpdate").style.display = "none";
        document.getElementById("tabAbout").style.display = "none";
        document.getElementById("tabHow").style.display = "none";
        document.querySelector(".updateInfo").innerHTML = changelog
        if(!document.querySelector("#optionsButton")) {
            let optionsbutton = document.createElement("button");
            optionsbutton.classList.add("btn");
            optionsbutton.classList.add("btn-primary");
            optionsbutton.classList.add("btn-block");
            optionsbutton.id = "optionsButton"
            optionsbutton.innerText = lang_skribblplus_settings
            optionsbutton.type = "button"
            optionsbutton.onclick = function(){
                GM_config.open();
            };
            document.querySelector("#formLogin").appendChild(optionsbutton); 
        } else {
            document.querySelector("#optionsButton").innerText = lang_skribblplus_settings
        }
        if(!document.querySelector("#optionsButtonGame")) {
            let optionsbutton = document.createElement("button");
            optionsbutton.classList.add("btn");
            optionsbutton.classList.add("btn-primary");
            optionsbutton.classList.add("btn-block");
            optionsbutton.id = "optionsButtonGame"
            optionsbutton.innerText = lang_skribblplus_settings
            optionsbutton.type = "button"
            optionsbutton.onclick = function(){
                GM_config.open();
            };
            document.querySelector(".tooltip-wrapper").insertBefore(optionsbutton, document.querySelector("#votekickCurrentPlayer")); 
        } else {
            document.querySelector("#optionsButtonGame").innerText = lang_skribblplus_settings
        }

        if(document.getElementById("screenLogin").style.display != "none") {
            if(document.getElementById("formLogin").getElementsByTagName("button")[0].disabled == false) {
                if(location.search == "?play") {
                    document.getElementById("formLogin").getElementsByTagName("button")[0].click();
                } else if (location.search == "?create") {
                    document.getElementById("formLogin").getElementsByTagName("button")[1].click();
                }
            }
        }

        if(GM_config.get('music') == true) {
            if(!document.getElementById("drawingmusic")) {
                let audio = new Audio();
                audio.id = "drawingmusic";
                audio.src = "";
                audio.loop = true;
                document.body.append(audio);
            }
            if(!document.getElementById("guessingmusic")) {
                let audio = new Audio();
                audio.id = "guessingmusic";
                audio.src = "https://github.com/Vukky123/userscripts/releases/download/skribblplus-music/coconutmall.mp3";
                audio.loop = true;
                document.body.append(audio);
            }
            if(!document.getElementById("settingsmusic")) {
                let audio = new Audio();
                audio.id = "settingsmusic";
                audio.src = "";
                audio.loop = true;
                document.body.append(audio);
            }
            if(!document.getElementById("customRoomWaitingMusic")) {
                let audio = new Audio();
                audio.id = "customRoomWaitingMusic";
                audio.src = "https://github.com/Vukky123/userscripts/releases/download/skribblplus-music/snesclassicmenu.mp3";
                audio.loop = true;
                document.body.append(audio);
            }
            if(document.querySelector("#audio").style.backgroundImage != 'url("res/audio_off.gif")') {
                if(document.getElementById("skribblplus")) {
                    document.getElementById("settingsmusic").play();
                    document.getElementById("customRoomWaitingMusic").pause();
                    document.getElementById("drawingmusic").pause();
                    document.getElementById("guessingmusic").pause();
                } else {
                    document.getElementById("settingsmusic").pause();
                    document.getElementById("settingsmusic").currentTime = 0;
                    if(document.getElementById("overlay").childNodes[0].childNodes[0].innerText.endsWith("is choosing a word!") || document.getElementById("overlay").childNodes[0].childNodes[0].innerText.endsWith(lang_choosing_a_word)) {
                        if(document.getElementById("screenGame").style.display == "" && document.getElementById("overlay").style.opacity == "0") {
                            document.getElementById("guessingmusic").play();
                        } else {
                            document.getElementById("guessingmusic").pause();
                            document.getElementById("guessingmusic").currentTime = 0;
                        }
                    } else {
                        if(document.getElementById("screenGame").style.display == "" && document.getElementById("overlay").childNodes[0].childNodes[0].innerText == "") {
                            let drawers = document.querySelectorAll(".drawing")
                            for (let i = 0; i < drawers.length; i++) {
                                const drawer = drawers[i];
                                if(drawer.parentNode.parentNode.id == "gamePlayerDummy") continue;
                                if(drawer.style.display == "") {
                                    document.getElementById("guessingmusic").play();
                                    break;
                                }
                            }
                        } else {
                            document.getElementById("guessingmusic").pause();
                            document.getElementById("guessingmusic").currentTime = 0;
                        }
                    }
                    if(document.getElementById("overlay").childNodes[0].childNodes[0].innerText == "Choose a word" || document.getElementById("overlay").childNodes[0].childNodes[0].innerText == lang_choose_a_word) {
                        if(document.getElementById("screenGame").style.display == "" && document.getElementById("overlay").style.opacity == "0") {
                            document.getElementById("drawingmusic").play();
                        } else {
                            document.getElementById("drawingmusic").pause();
                            document.getElementById("drawingmusic").currentTime = 0;
                        }
                    } else {
                        document.getElementById("drawingmusic").pause();
                        document.getElementById("drawingmusic").currentTime = 0;
                    }
                    if(document.getElementById("screenLobby").style.display == "") {
                        document.getElementById("customRoomWaitingMusic").play();
                    } else {
                        document.getElementById("customRoomWaitingMusic").pause();
                        document.getElementById("customRoomWaitingMusic").currentTime = 0;
                    }
                }
            } else {
                document.getElementById("settingsmusic").pause();
                document.getElementById("customRoomWaitingMusic").pause();
                document.getElementById("drawingmusic").pause();
                document.getElementById("guessingmusic").pause();
            }
        } else if (GM_config.get('music') == false) {
            if(document.getElementById("drawingmusic")) {
                document.getElementById("drawingmusic").remove();
            }
            if(document.getElementById("guessingmusic")) {
                document.getElementById("guessingmusic").remove();
            }
            if(document.getElementById("customRoomWaitingMusic")) {
                document.getElementById("customRoomWaitingMusic").remove();
            }
            if(document.getElementById("settingsmusic")) {
                document.getElementById("settingsmusic").remove();
            }
        }

        if(GM_config.get('googlelookup') == true) {
            if(!document.getElementById("googlelookup")) {
                let googlelookup = document.createElement("button");
                googlelookup.classList.add("btn");
                googlelookup.classList.add("btn-primary");
                googlelookup.id = "googlelookup"
                googlelookup.innerText = "Look up on Google"
                googlelookup.onclick = function(){
                    window.open("https://google.com/search?q=" + document.getElementById("currentWord").innerText)
                };
                googlelookup.style.margin = "0 0.5em"
                document.getElementsByClassName("gameHeaderButtons")[0].appendChild(googlelookup); 
            }
            if(document.getElementsByClassName("containerToolbar")[0].style.display == "") {
                document.getElementById("googlelookup").style.display = ""
            } else {
                document.getElementById("googlelookup").style.display = "none"
            }
        } else if (GM_config.get('googlelookup') == false) {
            if(document.getElementById("googlelookup")) {
                document.getElementById("googlelookup").remove();
            }
        }

        if(GM_config.get('quickjump') == true) {
            if(!document.getElementById("nextlobby")) {
                let nxtlby = document.createElement("button");
                nxtlby.classList.add("btn");
                nxtlby.classList.add("btn-warning");
                nxtlby.id = "nextlobby"
                nxtlby.innerText = "Next lobby"
                nxtlby.onclick = function(){
                    document.location.search = "?play"
                };
                nxtlby.style.margin = "0 0.5em"
                document.getElementsByClassName("gameHeaderButtons")[0].appendChild(nxtlby); 
            }
            if(!document.getElementById("exitgame")) {
                let extgme = document.createElement("button");
                extgme.classList.add("btn");
                extgme.classList.add("btn-danger");
                extgme.id = "exitgame"
                extgme.innerText = "Exit game"
                extgme.onclick = function(){
                    document.location.href = "https://skribbl.io"
                };
                extgme.style.margin = "0 0.5em"
                document.getElementsByClassName("gameHeaderButtons")[0].appendChild(extgme); 
            }
        } else if (GM_config.get('quickjump') == false) {
            if(document.getElementById("nextlobby")) {
                document.getElementById("nextlobby").remove();
            }
            if(document.getElementById("exitgame")) {
                document.getElementById("exitgame").remove();
            }
        }
    }, 100);
})();