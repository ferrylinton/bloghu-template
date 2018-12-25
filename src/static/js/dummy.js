var Fragment = (function () {
    'use strict';

    function load(element, template) {
        element.load(template, function (responseText, textStatus, jqXHR) {
            console.log(`load ${template} is ${textStatus}`);
            $('.box-content').find('th\\:block').hide();
        });
    }

    function init() {
        load($('#navbar'), '../../fragments/navbar.html nav');
        load($('#category'), '../../fragments/category.html .box');
        load($('#post'), '../../fragments/post.html .box');
        load($('#search'), '../../fragments/search.html form');
    }

    return {
        init: init
    };

}());

$(function () {

    Fragment.init();

});