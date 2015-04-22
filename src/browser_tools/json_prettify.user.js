// ==UserScript==
// @name            JSON prettifier.
// @namespace       https://github.com/kilfu0701
// @description     Prettify json string, use 'ctrl + shift + a' to run this script.
// @match           http://*/*
// @match           https://*/*
// @run-at          document-end
// @include         *
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version         1.1
// ==/UserScript==
 
//"use strict";
var debug_mode = 1;
 
(function(window, document) {
    if(document.contentType !== 'application/json')
        return ;

    var result = '';
    var t = document.body.innerText || document.body.textContent;
    var pre = document.createElement('pre');

    try {
        //console.log(t);
        result = JSON.stringify(JSON.parse(t), undefined, 4);
        pre.textContent = result;
        document.body.textContent = document.body.innerText = '';
        document.body.appendChild(pre);

    } catch(e) {
        //console.error('err', e);
    }

})(window, document);

