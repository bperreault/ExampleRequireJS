define(["ko"], function (ko) {

    ko.bindingHandlers.loadingIndicator = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
            $(element).fadeIn();

            $(element).ajaxStart(function () {
                console.log("ajaxStart");
                // $(element).fadeIn();
            }).ajaxComplete(function () {
                $(element).fadeOut();
            });
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever the associated observable changes value.
            // Update the DOM element based on the supplied values here.
        }
    };

});