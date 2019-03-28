(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'text!template/global/quick-sign-up-partial-view.html'
    ], function ($, config, quickSignUpPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // show
        function show() {

            var wrapper = $(document).find('#quick-sign-up-wrapper');
            var partial = quickSignUpPartial.replace('*|base-app-url|*', config.baseAppUrl);
            wrapper.empty().append(partial);

        }

        return {
            show: show
        };

    });

})();