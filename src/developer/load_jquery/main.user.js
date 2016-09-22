// ==UserScript==
// @name            Load JQuery into page.
// @namespace       https://github.com/kilfu0701
// @description     Load jQuery into page if not exists, easy for debugging in console.
// @match           http://*/*
// @match           https://*/*
// @run-at          document-end
// @include         *
// @version         1.2
// ==/UserScript==

var Config = {
    version: '1.12.4'
};

(function(window, document) {

    if (typeof window.parent.jQuery === 'undefined') {
        var jq = document.createElement('script');
        jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + Config.version + "/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(jq);
    }

})(window, document);
