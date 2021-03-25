# Userscripts for skribbl.io
Tested in Tampermonkey, on Microsoft Edge Chromium `90.0.794.0 (Official build) canary (64-bit)` and Brave `Version 1.24.8 Chromium: 89.0.4389.90 (Official Build) nightly (64-bit)`.

## skribbl+ [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblplus.user.js)
The ultimate skribbl userscript.

Hide the chat, give everyone cosmetic crowns, take the owner's crown (cosmetic), stop yourself from typing more than the length of the word, play amazing music tracks, play in Norwegian, and more!

Change the settings my clicking on the Tampermonkey icon while on skribbl.io, then press "Settings" under skribbl+.

### Default configuration
On installation, the following features are automatically enabled (they can be disabled in the settings menu):
* Delete individual chat messages
* URL shortcuts
* Hide About and How To Play
* Play music
* Look up word on Google button

### Music disclaimer
**Music is downloaded over GitHub Gists.** As such, the script needs to connect to gist.githubusercontent.com in order for music to function. The music is about *8,35 MB*, as of 25/03/2021.

### Credits
Uses code from [skribbl.io+](https://github.com/Sv443/skribbl.io-plus) [(license)](https://raw.githubusercontent.com/Sv443/skribbl.io-plus/master/LICENSE) by Sv443.

Uses music from:
* Guessing music - [Wii Shop Channel - Minecraft Note Blocks by BlockFusion](https://www.youtube.com/watch?v=gpoj5Q2pddM)
* Drawing music - [Anki Cozmo: Lost in Reddit (Full Soundtrack by The Helio Sequence) - "Meme Economy"](https://www.youtube.com/watch?v=mCFgO06Lf6c)
* Custom lobby music - [Animal Crossing - Nook's Cranny by Nintendo](https://www.youtube.com/watch?v=KdS-EonI124)
* Settings music - [Internet Settings - Nintendo 3DS System Settings by Nintendo, re-arrangement by legoj15](https://www.youtube.com/watch?v=77BWKq4tqHQ)

## Legacy scripts
No longer maintained. [Most of these scripts are available in skribbl+.](#skribbl-install)

### skribblcrownsforall [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblcrownsforall.user.js)
Gives all avatars a crown. **Purely visual. You will not become an owner.**

![Logo with crowns](https://i.imgur.com/lpzydkB.png) ![Game with crowns](https://i.imgur.com/wbUjRJu.png)

### skribbldonttypemore [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribbldonttypemore.user.js)
Prevents you from typing more than `word length + 1` characters in the chat.
To change its settings, click on the Tampermonkey icon in your extension bar, then click "Don't Type More Settings".

![Game with skribbldonttypemore on](https://i.imgur.com/hzQ3eL3.png)

### skribblnoavatarbodies [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblnoavatarbodies.user.js)
Removes all avatar bodies.

![Login screen without avatar bodies](https://i.imgur.com/0OyHSDY.png)

### skribblnoavatars [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblnoavatars.user.js)
Removes all traces of avatars.

![Login screen without avatars](https://i.imgur.com/PkCh3VI.png) ![Game without avatars](https://i.imgur.com/dcxs5Bk.png)

### skribblnochat [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblnochat.user.js)
Removes the chat from the game. Not sure why you would want to do this.

### skribblnoratings [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblnoratings.user.js)
Removes the "ratings" (👍👎) from the game.

### skribblnotimer [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblnotimer.user.js)
Removes the timer from the game.

![Game without timer](https://i.imgur.com/QCllYsr.png)

### skribblquickbuttons [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblquickbuttons.user.js)
Adds multiple buttons to make actions faster.

**Enhanced with skribblurlshortcuts!** Switch server, Start private game, and Join Public Game are only available if you have skribblurlshortcuts installed.

![Game with skribblquickbuttons](https://i.imgur.com/j5mt8je.png) ![Private game settings with skribblquickbuttons](https://i.imgur.com/PBgXHFp.png) ![Picking words with skribblquickbuttons](https://i.imgur.com/b7tEQdY.png)

### skribblsurprise [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblsurprise.user.js)
Leaves which word you get to draw up to fate. Scary!

### skribblurlshortcuts [(Install)](https://github.com/Vukky123/userscripts/raw/main/skribbl/skribblurlshortcuts.user.js)
Adds shortcuts to the URLs. To play, go to `skribbl.io/?play`. To start a private lobby, go to `skribbl.io/?create`.