var Fragment = (function () {
    'use strict';

    function loadNavbar() {
        $('#navbar').load('../../fragments/navbar.html nav', function (responseText, textStatus, jqXHR) {
            console.log(`load navbar is ${textStatus}`);
        });
    }

    function loadCategory() {
        var element = $('#category');

        if (element.length) {
            element.load('../../fragments/category.html .box', function (responseText, textStatus, jqXHR) {
                console.log(`load category is ${textStatus}`);
                if (textStatus === 'success') {
                    var categoryBoxContent = element.find('.box-content');
                    categoryBoxContent.html('');

                    $.getJSON('../../categories.json', function (data) {
                        for (var i = 0; i < data.length; i++) {
                            categoryBoxContent.append(
                                `<a href="${data[i].id}" class="inline-item">
                                    <span>${data[i].name}</span>
                                </a>`
                            );
                        }
                    });
                }
            });
        }
    }

    function loadPost() {
        var element = $('#post');

        if (element.length) {
            element.load('../../fragments/post.html .box', function (responseText, textStatus, jqXHR) {
                console.log(`load post is ${textStatus}`);
                if (textStatus === 'success') {
                    var categoryBoxContent = element.find('.box-content');
                    categoryBoxContent.html('');

                    $.getJSON('../../posts.json', function (data) {
                        for (var i = 0; i < data.length; i++) {
                            categoryBoxContent.append(
                                `<a href="${data[i].id}" class="inline-item">
                                    <span>${data[i].name}</span>
                                </a>`
                            );
                        }
                    });
                }
            });
        }
    }


    function init() {
        loadNavbar();
        loadCategory();
    }

    return {
        init: init
    };

}());