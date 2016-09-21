// ==UserScript==
// @name         Chrome New Tab Prettify.
// @namespace    https://github.com/kilfu0701
// @version      0.3
// @description  Prettify UI on Chrome new tab.
// @author       kilfu0701
// @match        /^http[s]?:\/\/www.google*/
// @run-at       document-ready
// @include      /^http[s]?:\/\/www.google*/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        none
// ==/UserScript==

// 0 = Brower default
var style = 0;

// logo, search_bar, blocks
var hide = ['logo', 'search_bar', 'blocks'];

if (location.pathname === "/_/chrome/newtab") {
    var $el = {
        blocks: $('.mv-hide'),
        logo: $('#lga'),
        search_bar: $('#f')
    };

    $.each(hide, function (val) {
        if (val in $el) {
            $el[val].hide();
        }
    });

    switch (style) {
        case 0:
        break;

        default:
        break;
    }
}
