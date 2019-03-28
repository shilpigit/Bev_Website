(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'service/utilities',
        'text!template/global/header-partial-view.html',
        'text!template/global/footer-partial-view.html',
        'text!template/global/main-navbar-partial-view.html',
        'text!template/global/nomination-navbar-partial-view.html'
    ], function ($, config, dataAccess, utilities, headerPartial, footerPartial, mainMenu, nominationMenu) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var headerWrapper = $('header');
        var footerWrapper = $('footer');

        // private functions
        // header
        function loadHeader() {

            headerWrapper.empty().append(headerPartial);
            var nav = $(document).find('#nav');
            var key = utilities.getParameterValues('key');
            
            switch (key) {

                case 'quarterly-awards-nomination' :
                    var menu = nominationMenu.replace('*|base-app-url|*', config.baseAppUrl);
                    nav.empty().append(menu).fadeIn('slow');
                    break;

                default:
                    nav.empty().append(mainMenu).fadeIn('slow');
                    break;

            }
        }

        // footer
        function loadFooter() {

            footerWrapper.empty().append(footerPartial);
            var searchJobBtn = $(document).find('#job-search-button-right');
            var key = utilities.getParameterValues('key');
            
            // not show in vacancy or job search
            if(key == 'quick-jobs-search' || key == 'view-vacancy' || key == 'view-company-profile'){
                searchJobBtn.fadeOut('slow');
            }
            else{
                searchJobBtn.fadeIn('slow');
            }

        }

        // show
        function show() {
            loadHeader();
            loadFooter();
        }
        
        // event

        // close nav bar in mobile view
        $(document).on('click', '.nav a', function(){
            $('.navbar-collapse').removeClass('in');
        });
        
        // active nave bar and close menu in mobile view
        $(document).find('.nav').find('li').on('click', function () {

            // active nave bar
            utilities.activeNavBar($(this));

            // close menu in mobile view
            if (!$(this).find('a').hasClass('dropdown-toggle')) {
                console.log('ok');
                $('#navbar').removeClass('in');
            }
            
        });

        // quick job search btn
        $(document).on('click', '.quick-job-search-btn', function(){
            window.location.href = '#!/show/?key=quick-jobs-search';
        });

        return {
            show: show
        };

    });

})();