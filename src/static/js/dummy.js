var Fragment = (function () {
    'use strict';

    function load(element, template) {
        element.load(template, function (responseText, textStatus, jqXHR) {
            console.log(`load ${template} is ${textStatus}`);
            $('.box-content').find('th\\:block').hide();
        });
    }

    function init() {
        // load($('#navbar'), '../../fragments/navbar.html nav');
        // load($('#category'), '../../fragments/category.html .box');
        // load($('#post'), '../../fragments/post.html .box');
        // load($('#search'), '../../fragments/search.html form');
        $('[th\\:replace]').each(function (index, value) { 
            var tag = $(this).prop('localName')
            var thReplaceAttr = $(this).attr('th:replace').split('::');
            var template = '/' + thReplaceAttr[0].trim();

            if(tag == 'xxxxhead'){
                $(this).load(template, function (responseText, textStatus, jqXHR) {
                    console.log(`load ${template} is ${textStatus}`);
                    $('.box-content').find('th\\:block').hide();
                });
            }else if(tag == 'div'){
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


    // $('[th\\:replace]').each(function (index, value) { 
    //     console.log($(this));
    //     console.log($(this).prop('localName'));
    //     var thReplaceAttr = $(this).attr('th:replace').split('::');
    //     console.log(thReplaceAttr[0].trim());
    //    // $(this).html(thReplaceAttr[0].trim());
    // });

});