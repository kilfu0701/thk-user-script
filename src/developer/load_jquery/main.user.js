// ==UserScript==
// @name            Load JQuery into page.
// @namespace       https://github.com/kilfu0701
// @description     Load jQuery into page if not exists, easy for debugging in console.
// @match           http://*/*
// @match           https://*/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at          document-end
// @include         *
// @version         1.3
// ==/UserScript==


// Using @require to load jquery.
/*
var Config = {
    version: '1.12.4'
};

(function() {
    if (window !== window.top)
        return ;

    if (typeof window.jQuery === 'undefined') {
        var jq = document.createElement('script');
        jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + Config.version + "/jquery.min.js";
        document.getElementsByTagName('body')[0].appendChild(jq);
    }

})();
*/
