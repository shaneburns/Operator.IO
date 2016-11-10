/*
    = Captain Operator.io =
        *Site-wide Content Loader using AJAX / PHP

        ** Plugin Status :      Being Developed
        ** Version :            Alpha 0.0.2
*/

/*
    Operator.IO Options List -

        *method (string)
                - default: 'GET'
                - desc:    'GET' or 'POST' data passing

        *url (string)
                - default: 'none'
                - desc:    address to request

        *data (jsonObject)
                - default: null
                - desc:    jsonObject with vars for server side processing (default null)

        *remove (string)
                - default: null
                - desc:    remove element from the DOM by designated query string which
                           will be potentially replaced by the AJAX request

        *prepend (bool)
                - default: false
                - desc:    set to true if the returned content should be prepended,
                           versus appended, to the designated(client) element.

        *before (bool/string)
                - default: false
                - desc:    set to string of element selector of which the returned content
                           should be inserted before.

        *after (bool/string)
                - default: false
                - desc:    set to string of element selector of which the returned content
                           should be inserted after.

        *shell (array)
                - default: [false]
                - desc:    Direct integration of the Shell FrameWork plugin.  This option
                           allows content being requested to automatically be transferred into
                           the Shell FrameWork.  This option takes 3 options in itself, the first
                           being a boolean value to designate if the content should be 'shelled'.
                           The second option should be a jsonObject for all options the Shell FW
                           takes. The third option is for a class value to be added to the shell.
                           ex(shell: [true, {reveal: true}, 'loading'])
*/
let operatorLoading = false;

(($) => {
    $.fn.operatorio = function(params){
        const client = $(this)

        // Initial Function  ---------------------------------------------------------
        client.init = function(){
            params = $.extend({}, $.fn.operatorio.defaults, params)
            if(params.url !== 'none' || params.data !== null){
                client.request(params)
                if(params.remove !== null){
                    client.banish(params.remove)
                }
            }else{
                console.log('No URL was given, so no data can be requested. Here are your params:')
                console.log(params);
            }
        }

        // Request Function  ---------------------------------------------------------
        client.request = function(params){
            operatorLoading = true
            $.ajax({
                method: params.method,
                url: params.url,
                data: params.data
            }).done(function(result){
                client.patchIn(result)
                operatorLoading = false
            })
        }

        // Patch In Function  ---------------------------------------------------------
        client.patchIn = function(result){
                const content = $(result)
                if(params.before != false){
                    content.insertBefore(params.before)
                }else if(params.after != false){
                    content.insertAfter(params.after)
                }else if(params.prepend){
                    client.prepend(content)
                }else{
                    client.append(content)
                }
                if(params.shell[0]){
                    content.shellfw({cmd: params.shell[1], class: params.shell[2]})
                }
        }

        // Banish/(Remove :) Function  ---------------------------------------------------------
        client.banish = function(elName){
            client.find(elName).remove()
        }
        // Initial Function Call ---------------------------------------------------------
        client.init()
    }

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
    }
})(jQuery)
