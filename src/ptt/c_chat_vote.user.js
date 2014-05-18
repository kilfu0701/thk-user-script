// ==UserScript==
// @name            Vote counting for C_Chat@PTT
// @namespace       https://github.com/kilfu0701
// @description     Counting votes.
// @match           http://www.ptt.cc/bbs/C_Chat/*.html
// @match           http://www.ptt.cc/bbs/Test/*.html
// @run-at          document-end
// @include         *
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version         1.4
// ==/UserScript==
 
//"use strict";
var debug_mode = 1;
var jquery_src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
/* http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey */
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
 
(function(window, document) {
    //console.log("script starting");
    
    loadAndExecute(jquery_src, function() {
        var $topbar = $("#topbar");
        var $main_content = $("#main-content"); 
        
        var $vote_count = $("<a>").addClass("right small").attr({href: "#", id: "vote_count"}).html("票數計算");
        var $vote_list = $("<a>").addClass("right small").attr({href: "#", id: "vote_list"}).html("推投文章清單");
        var vote_settings_is_focus = false;
        
        // vote settings block
        var $vote_window = $("<div>");
        var $vote_tbar = $("<div>").html("< 投票設定 >");
        var $vote_ctn = $('<div style="height:420px; width:100%;">');
        var $vote_options = $('<textarea style="float:left; width:30%; height:400px; margin:5px;">');
        var $vote_allow_multiple = $('<div>').html('單項複投:<input type="radio" name="revote" value="1">允許<input type="radio" name="revote" value="0" checked="checked">不允許');
        var $vote_allow_renew = $('<div>').html('重投(最新N筆數):<input type="radio" name="renew" value="1">允許<input type="radio" name="renew" value="0" checked="checked">不允許');
        var $maxPerID = $('<div>').html('每人最多幾票:<input type="text" name="max_per_id" value="1" style="width:80px;">');
        var $date_interval = $('<div>').html('期間:');
        var $date_start = $('<input>').attr({type: 'name'}).css({width: '80px'}).val('05/10 00:00');
        var $date_end = $('<input>').attr({type: 'name'}).css({width: '80px'}).val('05/31 23:59');
        var $vote_result = $('<div style="float:left; width:55%; height:400px; margin:5px; overflow-y:scroll;">').html("");
        var $vote_submit = $('<input type="button" value="計算" style="display:block;">');
        var $vote_article_list = $('<div>').css({display: 'none'});
        
        $vote_ctn.append($vote_options);
        $vote_ctn.append($vote_result);
        
        $date_interval.append($date_start);
        $date_interval.append('<span> - </span>');
        $date_interval.append($date_end);
        
        $vote_window.append($vote_tbar);
        $vote_window.append($vote_ctn);
        $vote_window.append($vote_allow_multiple);
        $vote_window.append($vote_allow_renew);
        $vote_window.append($maxPerID);
        $vote_window.append($date_interval);
        $vote_window.append($vote_submit);
        
        $main_content.prepend($vote_window);
        $main_content.prepend($vote_article_list);
        
        $vote_window.hide();
        
        $topbar.append($vote_count);
        $topbar.append($vote_list);
 
        
        $vote_submit.click(function(e) { 
            e.preventDefault();
            
            var results = {};
            var sorted_results = [];
            var set_list = $vote_options.val().split("\n");
            
            // solve date interval
            var start_from = 0;
            var end_to = 9399647600000;
            
            if($date_start.val() != '') {
                try {
                    start_from = new Date('2014/'+$date_start.val()+':00').getTime();
                } catch(e) {
                    
                }
            }
 
            if($date_end.val() != '') {
                try {
                    end_to = new Date('2014/'+$date_end.val()+':59').getTime();
                } catch(e) {
                    
                }
            }            
            
            
            // solve vote options
            for(var i in set_list) {
                var keys = $.trim(set_list[i]).split('@')[0];
                if(keys != "") {
                    results[keys] = 0;
                }
            }
            
            
            // solve push comments
            var revote = parseInt($('input[name=revote]:checked').val());
            var renew = parseInt($('input[name=renew]:checked').val());
            var all_pushs = $("div.push");
            var voter_id = {};
            var total_votes = 0;
            $.each(all_pushs, function(k, v) {
                var sp = $(v).text().split(':');
                var push_type = sp[0].split(' ')[0];
                var push_id = sp[0].split(' ')[1];
                var vote_to = [];
                var vote_time = '';
                var spChar = '@';
                var maxPerID = parseInt($('input[name=max_per_id]').val()) || 1;
                var splitWithSpChar = sp[1].split(spChar);
                
                
                if(splitWithSpChar.length >= 2) {
                    for(var n=0; n<splitWithSpChar.length-1; n++) {
                        vote_to.push($.trim(splitWithSpChar[n]));
                    }
                    
                    // if comments has ':' char
                    if(sp.length > 3) {
                        vote_time = sp[sp.length-2].split(' ').slice(-2).join(' ') + ':' + sp.slice(-1).join('');
                        console.log(vote_time);
                    } else {
                        vote_time = splitWithSpChar.slice(-1)[0].split(' ').slice(-2).join(' ') + ':' + sp.slice(-1).join('');
 
                    }
                    vote_time = $.trim(vote_time);
                    vote_time = new Date('2014/'+vote_time+':00').getTime();         
 
                    
                    $.each(vote_to, function(key, val) {
                        if(revote === 1) {
                            if(typeof results[val] != "undefined") {
                                if(typeof voter_id[push_id] == "undefined")
                                    voter_id[push_id] = {"counter": 0, "history": []};
 
                                if(typeof voter_id[push_id][val] == "undefined")
                                    voter_id[push_id][val] = 0;
 
                                if(vote_time > start_from && vote_time < end_to) {
                                    if(voter_id[push_id]["counter"] < maxPerID) {
                                        results[val] += 1;
                                        voter_id[push_id][val] += 1;
                                        voter_id[push_id]["counter"] += 1;
                                        total_votes += 1;
                                        voter_id[push_id]["history"].push(val);
                                    } else {
                                        // vote count is over limit...
                                        if(renew === 1) {
                                            // if renew enabled, overwrite oldest data...
                                            var old_val = voter_id[push_id]["history"].pop();
                                            voter_id[push_id][old_val] -= 1;
                                            results[old_val] -= 1;
                                            
                                            voter_id[push_id]["history"].push(val);
                                            results[val] += 1;
                                        }
                                    }
                                }
                            }
                        } else {
                            if(typeof results[val] != "undefined") {
                                if(typeof voter_id[push_id] == "undefined" || (voter_id[push_id] && typeof voter_id[push_id][val] == "undefined") ) {
                                    
                                    if(typeof voter_id[push_id] == "undefined")
                                        voter_id[push_id] = {"counter": 0, "history": []};
 
                                    if(typeof voter_id[push_id][val] == "undefined")
                                        voter_id[push_id][val] = 0;
 
                                    if(vote_time > start_from && vote_time < end_to) {
                                        if(voter_id[push_id]["counter"] < maxPerID) {
                                            results[val] += 1;
                                            voter_id[push_id][val] += 1;
                                            voter_id[push_id]["counter"] += 1;
                                            total_votes += 1;
                                            voter_id[push_id]["history"].push(val);
                                        } else {
                                            if(renew === 1) {
                                                var old_val = voter_id[push_id]["history"].pop();
                                                voter_id[push_id][old_val] -= 1;
                                                results[old_val] -= 1;
                                                
                                                voter_id[push_id]["history"].push(val);
                                                results[val] += 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }                    
                    });
                    //console.log(revote, voter_id);
                }
                //console.log(total_votes, push_type, push_id, vote_to, vote_time, end_to);
            });
            
            //console.log(results, voter_id);
            
            // sort results
            for (var key in results)
                sorted_results.push([key, results[key]]);
            
            sorted_results.sort(function(a, b) {
                a = a[1];
                b = b[1];
 
                return a > b ? -1 : (a < b ? 1 : 0);
            });
            
            var rhtml = $('<div>');
            $vote_result.html(''); // cleanup
            
            $vote_result.append($('<div>').html('總票數: ' + total_votes));
            $vote_result.append($('<div>').html('--------------------'));
            
            for (var i = 0; i < sorted_results.length; i++) {
                var key = sorted_results[i][0];
                var value = sorted_results[i][1];
 
                $vote_result.append( $('<div>').html(key + ' : ' + value + ' (' + parseFloat(value/total_votes*100).toFixed(2) + '%)') );
            }
        });
        
        // 
        $vote_count.click(function(e) {
            if(vote_settings_is_focus) {
                $vote_window.hide();
                vote_settings_is_focus = false;
            } else {
                $vote_window.show();
                vote_settings_is_focus = true;
            }
        });
        
        // query vote lists
        var vl_has_queried = false;
        var init_query_url = 'http://www.ptt.cc/bbs/C_Chat/index.html';
        var max_action = 100;
        var current_action = 0;
        var sleep_t = 3000;
        var now_quering = false;
        
        var recursive_func = function(url) {
            current_action++;
            
            if(current_action > max_action) {
                $vote_article_list.append( $('<div>Done!</div>') );
                vl_has_queried = true;
                return ;
            } else {
                $.get(url, function(data) {
                    var $data = $(data);
                    var p_btns = $data.find('a.btn.wide');
                    var prev_page_url = $(p_btns[1]).attr('href');
 
                    var title_list = $data.find('div.r-ent > div.title > a');
                    var first_date = $data.find('div.r-ent > div.meta > div.date:eq(0)');
                    
                    if( $.trim(first_date.html()) == "5/08" ) {
                        // no more articles...
                        $vote_article_list.append( $('<div>Done!</div>') );
                        vl_has_queried = true;
                        return ;
                    } else {
                        //console.log(prev_page_url, title_list);
                        
                        $.each(title_list, function(k, v) {
                            var title = $(v).html();
                            var split_with_re = title.split('Re:');
                            
                            if(split_with_re.length == 1) {
                                // not Re:
                                var title_tag = '';
                                try {
                                    title_tag = title.split('[')[1].split(']')[0];
                                } catch(e) {
                                
                                }
                                
                                //console.log(title_tag);
                                
                                if(title_tag == "推投") {
                                    $vote_article_list.append( $('<div>').append($(v).attr('target', '_blank')) );
                                }
                            }
                        });
                        
                        window.setTimeout(function() { recursive_func(prev_page_url); }, sleep_t);
                    }
                });
            }
            //window.clearInterval(rf_hd);
        };
        
        $vote_list.click(function(e) {
            e.preventDefault();
            
            if(vl_has_queried || now_quering) {
                return ;
            } else {
                now_quering = true;
            
                $vote_article_list.show();
                window.setTimeout(function() { recursive_func(init_query_url); }, sleep_t);
            }
        });
    });
    
})(window, document);
