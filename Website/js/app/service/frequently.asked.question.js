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
            contents.getByKey(config['aWebSiteFAQContentKey'], 'Frequently Asked Question');
        }

        return {
            show: show
        };

    });

})();


//(function () {
//    'use strict';

//    define([
//        'jquery',
//        'text!template/global/frequently-asked-questions-partial-view.html'
//    ], function ($, frequentlyaskedquestionSpartial) {

//        // this class is a view class so feel free to do what you need !
//        // DOM objects
//        var wrapper = $(document).find('#other-content-wrapper');

//        // show
//        function show() {
//            wrapper.empty().append(frequentlyaskedquestionSpartial);
//        }

//        return {
//            show: show
//        };

//    });

//})();