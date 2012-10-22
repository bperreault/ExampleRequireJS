define(["ko"], function (ko) {

    "use strict";

    var Section2 = function () {

        var self = this;

        self.thingee = ko.observable("some thingee");

    };

    return new Section2();

});