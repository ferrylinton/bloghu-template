var Fragment = (function () {
    'use strict';

    function init() {
        $('[th\\:replace]').each(function (index, value) { 
            var tag = $(this).prop('localName')
            var thReplaceAttr = $(this).attr('th:replace').split('::');
            var template = '/' + thReplaceAttr[0].trim();

            if(tag == 'div'){
                $(this).load(template + ' div:first', function (responseText, textStatus, jqXHR) {
                    console.log(`load ${template} is ${textStatus}`);
                    $('.box-content').find('th\\:block').hide();
                });
            }

        });
    }

    return {
        init: init
    };

}());

$(function () {

    Fragment.init();
    
});