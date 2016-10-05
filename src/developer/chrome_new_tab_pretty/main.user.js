// ==UserScript==
// @name         Chrome New Tab Prettify.
// @namespace    https://github.com/kilfu0701
// @version      0.5
// @description  Prettify UI on Chrome new tab.
// @author       kilfu0701
// @match        /^http[s]?:\/\/www.google*/
// @run-at       document-ready
// @include      /^http[s]?:\/\/www.google*/
// @grant        none
// ==/UserScript==

// 0 = Brower default
var style = 0;

// logo, search_bar, blocks
var hide = ['logo', 'search_bar', 'blocks'];

if (location.pathname === "/_/chrome/newtab") {
    var el = {
        blocks: document.getElementsByClassName('mv-hide')[0],
        logo: document.getElementById('lga'),
        search_bar: document.getElementById('f')
    };

    hide.forEach(function (val) {
        if (val in el && typeof el[val] !== 'undefined') {
            el[val].style.display = "none";
        }
    });

    switch (style) {
        case 0:
        break;

        default:
        break;
    }
}
