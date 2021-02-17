// ==UserScript==
// @name         skribbl+
// @namespace    https://vukky.ga
// @version      0.1.0
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
          'title': "skribbl+",
          'fields': // Fields object
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
          },
          'css': "#skribblplus .section_header_holder { text-align: center; }",
          'events': {
            'open': function(doc) {
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
                var crownsfornone = GM_config.get('crownsforall', true);
                if(crownsfornone == false) {
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
    }, 500);
})();