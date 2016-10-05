// ==UserScript==
// @name            Press `Ctrl + Shift + j` to load JQuery into page.
// @namespace       https://github.com/kilfu0701
// @description     Load jQuery into page, easy for debugging in console.
// @match           http://*/*
// @match           https://*/*
// @run-at          document-end
// @include         *
// @version         1.5
// ==/UserScript==


var Config = {
    version: '1.12.4'
};

(function() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 74) {
            var d = document.createElement('script');
            d.src = "https://code.jquery.com/jquery-" + Config.version + ".min.js";
            document.head.appendChild(d);
        }
    });
})();
