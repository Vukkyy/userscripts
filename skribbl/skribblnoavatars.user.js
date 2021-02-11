// ==UserScript==
// @name         Skribbl: No Avatars
// @namespace    https://vukky.ga
// @version      0.1
// @description  Destroys all traces of avatars.
// @author       You
// @match        https://skribbl.io/**
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblnoavatars.user.js
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        var avatars = document.getElementsByClassName("avatar");
        for (let i = 0; i < avatars.length; i++) {
            const avatar = avatars[i];
            avatar.remove();
        }

        var avatarContainers = document.getElementsByClassName("avatarContainer");
        for (let i = 0; i < avatarContainers.length; i++) {
            const avatarContainer = avatarContainers[i];
            avatarContainer.remove();
        }

        document.getElementById("loginAvatarCustomizeContainer").remove();
        document.getElementById("logoAvatarContainer").remove();
    }, 1000);
})();