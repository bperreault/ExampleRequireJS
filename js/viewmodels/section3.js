define(["ko"], function (ko) {

    "use strict";

    var Section3 = function () {

        var self = this;

        self.item = ko.observable("some item");

    };

    return new Section3();

});