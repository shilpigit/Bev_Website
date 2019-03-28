(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'service/utilities',
        'service/quotes',
        'text!template/home/main-content-partial-view.html'
    ], function ($, config, utilities, quotes, mainPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $('#home-content-wrapper');

        // private functions
        // go to app url
        function goToAppUrl() {            
            window.location.href = config['baseAppUrl'];
        }

        // set height for quick job search
        function setHeight4QuickJobSearch() {

            // set height
            var doc = $(document);
            var jobSearchWrapper = doc.find('#job-search-wrapper');
            var jobSearchContainer = doc.find('#job-search-container');
            var jobSearchHeight = jobSearchWrapper.height();

            jobSearchContainer.css('margin-top', (jobSearchHeight/2) - 35);

        }

        // main info
        function show() {

            // load main content
            var main = mainPartial.replace('*|base-app-url|*', config.baseAppUrl).replace('*|base-app-url|*', config.baseAppUrl);
            wrapper.empty().append(main);

            // set meta tags
            // utilities.setMetaTags4FB('Home', 'Oil Diversity Global® HR Portal.', 'Welcome to Oil Diversity®');
            utilities.activeNavBar($('a[href$="#!"]').parent('li'));

            // load quotes
            quotes.show();

            // set height
            setHeight4QuickJobSearch();
        }

        // event
        // job seeker login btn
        $(document).on('click', '#job-seeker-login-btn', function(){
            goToAppUrl();
        });

        // client login btn
        $(document).on('click', '#client-login-btn', function(){
            goToAppUrl();
        });

        return {
            show: show
        };

    });

})();