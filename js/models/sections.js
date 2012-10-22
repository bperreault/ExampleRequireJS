/*global define:true, console:true */

define(['./section'], function (Section) {

    "use strict";

    var sections = {

        sections: [
            new Section("twitter", "Twitter viewer"),
            new Section("s2", "Section 2", "Section 2 content yada, yada"),
            new Section("s3", "Section 3", "Section 3 content stuff goes here..."),
            new Section("s4", "Section 4", "Section 4")
        ]
    };

    return sections;

});
