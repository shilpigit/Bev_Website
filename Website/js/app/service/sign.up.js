(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'text!template/sign-up-partial-view.html',
        'text!template/services-partial-view.html'
    ], function ($, config, signUpPartial, servicesPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // show
        function show() {
            wrapper.empty().append(signUpPartial.replaceAll('*|base-app-url|*', config['baseAppUrl']));

            // var partialWrapper = $(document).find('#partial-wrapper');
            // partialWrapper.append(servicesPartial);
        }

        return {
            show: show
        };

    });

})();