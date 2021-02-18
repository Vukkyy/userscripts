// ==UserScript==
// @name         skribbl+
// @namespace    https://vukky.ga
// @version      0.3.0
// @description  skribbl+ is a combination of all the Skribbl userscripts that I have previously created.
// @author       Vukky
// @match        http*://skribbl.io/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblplus.user.js
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
          'title': "skribbl+ 0.3.0",
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
            var deleteButton = "<span id='del_msg' style='font-weight: bold; color: red; cursor: pointer;' title='Delete this message'>X</span> ";
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
            if(!document.getElementById("screenLogin").style.display != "none") {
                if(location.search == "?play") {
                    document.getElementById("formLogin").getElementsByTagName("button")[0].click();
                    document.getElementById("containerLogoBig").style.display = ""
                } else if (location.search == "?create") {
                    document.getElementById("formLogin").getElementsByTagName("button")[1].click();
                    document.getElementById("containerLogoBig").style.display = ""
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
    }, 100);
})();