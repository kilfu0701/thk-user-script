// ==UserScript==
// @name         Chrome New Tab Prettify.
// @namespace    https://github.com/kilfu0701
// @version      0.1
// @description  Prettify UI on Chrome new tab.
// @author       kilfu0701
// @match        /^http[s]?:\/\/www.google*/
// @run-at       document-ready
// @include      /^http[s]?:\/\/www.google*/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        none
// ==/UserScript==

if(location.pathname === "/_/chrome/newtab") {
    $('.mv-hide').hide();
}
