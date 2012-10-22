/*global define:true, knockout:true, console:true */

define(["ko", "../models/sections"], function (ko, sections) {

    "use strict";

    var App = function () {

        var self = this;

        self.sections = sections.sections;

        self.selectedSection = ko.observable(self.sections[0]);

        self.menuClicked = function (sectionKey) {

            var selected = ko.utils.arrayFirst(self.sections, function(section) {
                return section.key === sectionKey;
            });

            self.selectedSection(selected);
            location.hash = sectionKey;
        };

        // helper function to keep expressions out of markup
        self.sectionIsVisible = function (section) {
            return ko.utils.unwrapObservable(section) === self.selectedSection();
        };

    };

    return new App();

});



