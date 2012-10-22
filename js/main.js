/*global require:true, console:true */
require.config({
    paths: {
        'jquery': 'ext/jquery-1.8.2.min',
        'infuser': 'ext/infuser-amd',
        'TrafficCop': 'ext/TrafficCop',
        'ko': 'ext/knockout-2.1.0',
        'koext': 'ext/koExternalTemplateEngine-amd.min',
        "bootstrap": "ext/bootstrap.min",
        'domReady': 'ext/domReady',
        'sammy': 'ext/sammy-latest.min'
    }
});

require(['jquery', 'ko', 'viewmodels/app', 'viewmodels/twitter', 'viewmodels/section2', 'viewmodels/section3', 'viewmodels/section4',
    'extends/bindings', 'koext', 'domReady!', "sammy", 'bootstrap'],
    function ($, ko, app, vmTwitter, s2, s3, s4) {

        "use strict";

        infuser.defaults.templateUrl = "templates";
        infuser.defaults.templateSuffix = ".tmpl.html";

        $.sammy(function () {

            this.get('#:section', function () {
                app.menuClicked(this.params.section);
            });

            this.get('', function () {
                this.app.runRoute('get', '#twitter');
            });

            // override to disable sammy logging...
            this.log = function () {
                // do nothing...
            };

        }).run();

        var viewModels = {
            vmApp: app,
            vmTwitter: vmTwitter,
            vmSection2: s2,
            vmSection3: s3,
            vmSection4: s4
        };

        console.log("viewModels", viewModels);

        ko.applyBindings(viewModels);

        console.log("done applyBindings");

        $('body').show();

    });
