// ==UserScript==
// @name         skribbl+
// @namespace    https://vukky.ga
// @version      0.8.0
// @description  skribbl+ is a combination of all the Skribbl userscripts that I have previously created, with brand new features.
// @author       Vukky
// @match        http*://skribbl.io/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblplus.user.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      gist.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';
    let drawingmusic, customRoomWaitingMusic, guessingmusic, settingsmusic = null
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://gist.githubusercontent.com/Vukky123/6ae8fc55dac45784fdb2cfbe880ef79f/raw/427622be80883632d5fa13f26059dc54cedcad91/cozmolostinredditmemeeconomy.txt",
        onload: function(response) {
            drawingmusic = response.responseText
        }
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://gist.githubusercontent.com/Vukky123/f41a7f6399af18e889a63be63fa55fa8/raw/b2486c484af362413b774b140f9cecfb76836a12/animalcrossingnookscranny.txt",
        onload: function(response) {
            customRoomWaitingMusic = response.responseText
        }
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://gist.githubusercontent.com/Vukky123/f797b169fb7975f2164884236d91f7a2/raw/455d02395cbd6e6e556fbfa28333b27a8eaac5a1/wiishopnoteblock.txt",
        onload: function(response) {
            guessingmusic = response.responseText
        }
    });
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://gist.githubusercontent.com/Vukky123/dd513af113eb1fed71044701097a2140/raw/88f8744d2c26d523746fec257addbd8c9c3ae31f/nnidmedley.txt",
        onload: function(response) {
            settingsmusic = response.responseText
        }
    });
    GM_registerMenuCommand("skribbl+: Settings", opencfg);
    function opencfg() {
        GM_config.open();
    }
    GM_config.init(
        {
          'id': 'skribblplus',
          'title': "skribbl+ 0.8.0",
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
            'removechat':
            {
              'label': "Remove the chat (but why?)",
              'section': ['Misc', 'Various other features.'],
              'type': 'checkbox',
              'default': false
            },
            'deletechatmessages':
            {
              'label': 'Delete individual chat messages',
              'type': 'checkbox',
              'default': false
            },
            'urlshortcuts':
            {
              'label': "URL shortcuts (skribbl.io/?play, skribbl.io/?create)",
              'type': 'checkbox',
              'default': false
            },
            'noexplanations':
            {
              'label': "Hide About and How to Play",
              'type': 'checkbox',
              'default': false
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
              'default': false
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
                var removechat = GM_config.get('removechat', true);
                var deletechatmessages = GM_config.get('deletechatmessages', true);
                if(removechat == false) {
                    GM_config.fields['deletechatmessages'].node.disabled = false
                } else {
                    GM_config.fields['deletechatmessages'].node.disabled = true
                }
                if(deletechatmessages == false) {
                    GM_config.fields['removechat'].node.disabled = false
                } else {
                    GM_config.fields['removechat'].node.disabled = true
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
                GM_config.fields['removechat'].node.addEventListener('change', function () {
                    var removechat = GM_config.get('removechat', true);
                    if(removechat == false) {
                        GM_config.fields['deletechatmessages'].node.disabled = false
                    } else {
                        GM_config.fields['deletechatmessages'].node.disabled = true
                    }
                }, false);
                GM_config.fields['deletechatmessages'].node.addEventListener('change', function () {
                    var deletechatmessages = GM_config.get('deletechatmessages', true);
                    if(deletechatmessages == false) {
                        GM_config.fields['removechat'].node.disabled = false
                    } else {
                        GM_config.fields['removechat'].node.disabled = true
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

    setInterval(() => {
        var lang_play, lang_lobby_play, lang_create_private_room, lang_delete_message, lang_rounds, lang_language, lang_invite_your_friends, lang_players, lang_contact, lang_result, lang_score, lang_you, lang_round, lang_round_of, lang_settings, lang_copy, lang_time_is_up, lang_the_word_was, lang_choosing_a_word, lang_choose_a_word, lang_guessed_word, lang_joined, lang_drawing_now, lang_left;
        switch(GM_config.get('language')) {
            case "English":
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
                lang_left = "left."
                break;
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
                lang_left = "gikk ut."
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

        if(GM_config.get('urlshortcuts') == true) {
            if(document.getElementById("screenLogin").style.display != "none") {
                if(location.search == "?play") {
                    document.getElementById("formLogin").getElementsByTagName("button")[0].click();
                } else if (location.search == "?create") {
                    document.getElementById("formLogin").getElementsByTagName("button")[1].click();
                }
            }
        }

        if(GM_config.get('removechat') == true) {
            document.getElementById("boxMessages").style.display = "none";
        } else if (GM_config.get('removechat') == false) {
            if(document.getElementById("screenGame").style.display == "") {
                document.getElementById("boxMessages").style.display = "";
            }
        }

        var wordLength = document.getElementById("currentWord").textContent.length;
        if(GM_config.get('donttypemore') == true && !wordLength == 0) {
            var maxLength;
            maxLength = wordLength + GM_config.get('donttypemorecharacters')
            document.getElementById("inputChat").setAttribute("maxlength", maxLength);
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here... (max " + maxLength + " characters)");
        } else {
            document.getElementById("inputChat").setAttribute("maxlength", "100");
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here...");
        }

        if(GM_config.get('noexplanations') == true) {
            document.getElementById("tabUpdate").style.display = "none";
            document.getElementById("tabAbout").style.display = "none";
            document.getElementById("tabHow").style.display = "none";
        } else if (GM_config.get('noexplanations') == false) {
            document.getElementById("tabUpdate").style.display = "";
            document.getElementById("tabAbout").style.display = "";
            document.getElementById("tabHow").style.display = "";
        }

        if(GM_config.get('music') == true && drawingmusic != null && customRoomWaitingMusic != null && guessingmusic != null && settingsmusic != null) {
            if(!document.getElementById("drawingmusic")) {
                let audio = new Audio();
                audio.id = "drawingmusic";
                audio.src = drawingmusic;
                audio.loop = true;
                document.body.append(audio);
            }
            if(!document.getElementById("guessingmusic")) {
                let audio = new Audio();
                audio.id = "guessingmusic";
                audio.src = guessingmusic;
                audio.loop = true;
                document.body.append(audio);
            }
            if(!document.getElementById("settingsmusic")) {
                let audio = new Audio();
                audio.id = "settingsmusic";
                audio.src = settingsmusic;
                audio.loop = true;
                document.body.append(audio);
            }
            if(!document.getElementById("customRoomWaitingMusic")) {
                let audio = new Audio();
                audio.id = "customRoomWaitingMusic";
                audio.src = customRoomWaitingMusic;
                audio.loop = true;
                document.body.append(audio);
            }
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
                    document.getElementById("guessingmusic").pause();
                    document.getElementById("guessingmusic").currentTime = 0;
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
        }
    }, 100);
})();