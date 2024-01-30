// ==UserScript==
// @name         WavesMV
// @namespace    https://hakase.life
// @version      2024-01-30.1
// @description  Add music video support for waves.
// @author       Hakase
// @match        https://radio.byemc.xyz/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=byemc.xyz
// @grant        none
// @updateURL    https://raw.githubusercontent.com/nyakase/userscripts/main/wavesmv.user.js
// @downloadURL  https://raw.githubusercontent.com/nyakase/userscripts/main/wavesmv.user.js
// ==/UserScript==

/**
You will need the custom field videoUrl on your Azuracast station.
Set this to an embed URL. WavesMV will iframe this URL.
**/

(function() {
    'use strict';

    const MV = document.createElement("iframe")
    MV.height = "300";
    MV.width = "100%";
    MV.classList.add("hidden");
    document.querySelector("main").insertBefore(MV, document.querySelector("#playing-next"));

    let originalEmbedUrl;

    setInterval(async function() {
        if(stream_type_param != "azuracast") return MV.classList.add("hidden");
        let npUrl = server_url + "/api/nowplaying/" + server_stub;
        let npRequest = await fetch(npUrl);
        let np = await npRequest.json();

        if(np.now_playing.song.custom_fields.videoUrl) {
            let embedUrl = new URL(np.now_playing.song.custom_fields.videoUrl);
            if(embedUrl == originalEmbedUrl) return;
            originalEmbedUrl = embedUrl.href;

            if(embedUrl.href.startsWith("https://www.youtube.com/embed/")) {
                embedUrl.searchParams.set("autoplay", "1")
                if(embedUrl.searchParams.has("t")) {
                    embedUrl.searchParams.set("t", parseInt(searchParams.get("t")) + np.now_playing.elapsed)
                } else {
                    embedUrl.searchParams.set("t", np.now_playing.elapsed);
                }
            } else if(embedUrl.href.startsWith("https://embed.nicovideo.jp/watch/")) {
                embedUrl.searchParams.set("jsapi", "1")
                embedUrl.searchParams.set("playerId", "tummy")
                if(embedUrl.searchParams.has("from")) {
                    embedUrl.searchParams.set("from", parseInt(searchParams.get("from")) + np.now_playing.elapsed)
                } else {
                    embedUrl.searchParams.set("from", np.now_playing.elapsed);
                }
                MV.addEventListener("load", function() {
                    MV.contentWindow.postMessage({ eventName: 'play', sourceConnectorType: 1, playerId: 'tummy' }, 'https://embed.nicovideo.jp');
                })
            }

            player.muted = true;
            MV.src = embedUrl.href;
            return MV.classList.remove("hidden");
        } else {
            player.muted = false;
            MV.src = "";
            return MV.classList.add("hidden");
        }
    }, 2500)
})();
