// ==UserScript==
// @name            JSON prettifier.
// @namespace       https://github.com/kilfu0701
// @description     Prettify json string, use 'ctrl + shift + a' to run this script.
// @match           http://*/*
// @match           https://*/*
// @run-at          document-end
// @include         *
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version         1.0
// ==/UserScript==
 
//"use strict";
var debug_mode = 1;
 
(function(window, document) {
    //console.log("script starting");
    document.onkeypress = function(e) {
        e = e || window.event;

        // charCode = 1, ctrl + shift + a
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        var t = document.body.textContent;
        var pre = document.createElement('pre');

        //console.log(charCode);
        if(charCode === 1) {
            document.body.textContent = '';
            pre.textContent = JSON.stringify(JSON.parse(t), undefined, 4);        
            document.body.appendChild(pre);
        }
    };
})(window, document);
