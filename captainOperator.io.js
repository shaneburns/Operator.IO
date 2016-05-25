/*
    = Captain Operator.io =
        *Site-wide Page Loader using AJAX / PHP
        
        ** I made a plugin
*/

/*

    AJAX Settings -
        *url - address to request
        *type - GET, POST, etc. methods
        *data - jsonObject with vars for server side processing
   
   Format Settings -
       *remove - for easily removing an object from the dom which 
                 will be potentially replaced by the ajax call 
                
*/

(function($){
    $.fn.operatorio = function(params){
        var client = $(this);
        
        // Initial Function  ---------------------------------------------------------
        client.init = function(){
            params = $.extend({}, $.fn.operatorio.defaults, params);
            if(params.url !== 'none' || params.data !== null){
                client.request(params);
                if(params.remove !== null){
                    client.banish(params.remove);
                }
            }else{
                console.log('No URL was given, so no data can be requested. Here are your params:');
                console.log(params);
            }
        };
        
        // Request Function  ---------------------------------------------------------
        client.request = function(params){
            $.ajax({
                method: params.method,
                url: params.url,
                data: params.data
            }).done(function(result){
                client.patchIn(result);
            });
        };
        
        // Patch In Function  ---------------------------------------------------------
        client.patchIn = function(result){
                var content = $(result);
                if(params.before != false){
                    content.insertBefore(params.before);
                }else if(params.after != false){
                    content.insertAfter(params.after);
                }else if(params.prepend){
                    client.prepend(content);
                }else{
                    client.append(content);
                }
                if(params.shell[0]){
                    content.shellfw({cmd: params.shell[1], class: params.shell[2]});
                }
        };
        
        // Banish/(Remove :) Function  ---------------------------------------------------------
        client.banish = function(elName){
            client.find(elName).remove();
        }
        // Initial Function Call ---------------------------------------------------------
        client.init();
    };
    
    // Operatorio Defaults for params '''''''''''''''''''''''''''''''''''''''''''''''''''''
    $.fn.operatorio.defaults = {
        method: 'GET',
        url: 'none',
        data: null,
        remove: null,
        prepend: false,
        before: false,
        after: false,
        shell: [false]
    };
})(jQuery);