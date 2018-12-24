var Fragment = (function () {
    'use strict';

    function load(element, template) {
        element.load(template, function (responseText, textStatus, jqXHR) {
            console.log(`load ${template} is ${textStatus}`);
        });
    }

    function init() {
        load($('#navbar'), '../../fragments/navbar.html nav');
        load($('#category'), '../../fragments/category.html .box');
        load($('#post'), '../../fragments/post.html .box');
    }

    return {
        init: init
    };

}());

$(function () {

    Fragment.init();

});