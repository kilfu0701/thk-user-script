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
        var t = document.body.innerText;
        var pre = document.createElement('pre');
        
        //console.log(charCode);
        
        var my_account = 'yourEmailName@gmail.com';
        var my_password = 'yourPassword';
        var my_pin = 'yourPin';
        
        if(charCode === 1) {
            if(document.contentType === 'application/json') {
                document.body.textContent = '';
                pre.textContent = JSON.stringify(JSON.parse(t), undefined, 4);        
                document.body.appendChild(pre);
            } else if(typeof $ !== undefined) {
                if(location.host === '10.1.201.168' || location.host === '10.1.201.186') {
                    var $account = $('input#account');
                    
                    if($account.size() === 1) {
                        // auto signin
                        $account.val(my_account);
                        $('input#password').val(my_password);
                    } else if(location.pathname === '/masterpassword/input') {
                        // auto input pin
                        $('input#masterpassword').val(my_pin);
                    }
                }
            }
        }
    };
})(window, document);
