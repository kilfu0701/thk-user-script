// ==UserScript==
// @name            Lottery Search.
// @namespace       https://github.com/kilfu0701
// @description     
// @match           http://lotto2.arclink.com.tw/2015100wan/
// @run-at          document-end
// @include         *
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version         1.0
// ==/UserScript==


(function(window, document) {
    $('<style>.tc { width:30px; margin:0 5px; };</style>').prependTo($('body'));
    $('<style>.lotto_event form { text-align: center; border: solid 1px red; padding: 3px; width: 400px; margin: 3px auto;</style>').prependTo($('body'));
    
    var className = ".lotto_number";
    var origin_buf = $(className).html();
    
    var s_form = $('<form>').prependTo('.lotto_event');
    for(var i=0; i<6; i++)
        $('<input name="t' + i + '" type="text" id="t' + i + '" class="tc">').appendTo(s_form);
    
    var s_btn = $('<button type="submit">Submit</button>').appendTo(s_form);
    var c_btn = $('<button type="submit">Clear</button>').appendTo(s_form);
    
    var kw_search = function(pat) {
        if(pat === '')
            return ;
        
        var src_str = $(className).html();
        var term = " " + pat;
        term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
        var pattern = new RegExp("("+term+")", "gi");

        src_str = src_str.replace(pattern, "<mark>$1</mark>");
        src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");

        $(className).html(src_str);
    };
    
    var reset_html = function() {
        $(className).html(origin_buf);
    };
    
    s_form.on('submit', function(e){
        e.preventDefault();
        
        var arr = $(this).serializeArray();
        
        reset_html();
        $.each(arr, function(k, v) {
            kw_search(v.value);
        });
    });
    
    c_btn.on('click', function(e) {
        e.preventDefault();
        
        reset_html();
        s_form.trigger("reset");
    });
    
})(window, document);