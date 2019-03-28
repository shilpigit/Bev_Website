(function () {
    'use strict';

    define([
        'jquery',
        'text!template/global/terms-of-service-partial-view.html'
    ], function ($, termsOfServicePartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // show
        function show() {
            wrapper.empty().append(termsOfServicePartial);
        }

        return {
            show: show
        };

    });

})();