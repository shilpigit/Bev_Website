(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'service/utilities',
        'service/contents'
    ], function ($, config, utilities, contents) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // show
        function show() {
            contents.getByKey(config['aWebSiteBusinessAdvertisingOpportunitiesContentKey'], 'Business Advertising Opportunities');
        }

        return {
            show: show
        };

    });

})();