/*global define:true, console:true */

define(function () {

    "use strict";

    return function (key, title, content) {
        this.key = key;
        this.title = title;
        this.content = content;
    };

});