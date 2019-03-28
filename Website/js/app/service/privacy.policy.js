(function () {
    'use strict';

    define([
        'jquery',
        'text!template/global/privacy-policy-partial-view.html'
    ], function ($, privacyPolicyPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');
        
        // show
        function show() {
            wrapper.empty().append(privacyPolicyPartial);
        }

        return {
            show: show
        };

    });

})();