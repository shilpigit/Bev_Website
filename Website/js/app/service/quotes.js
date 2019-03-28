(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'service/utilities',
        'text!template/home/quote-partial-view.html',
        'owlCarousel'
    ], function ($, config, dataAccess, utilities, quotePartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        function show() {

            // quote data
            var quoteData = dataAccess.DataQuote.getQuoteData();
            var quoteWrapper = $(document).find('#quotes-container');
            var quotes = '';

            for (var i = 0; i < quoteData.length; i++) {
                quotes += quotePartial.replace('*|quote|*', quoteData[i]['quote']).replace('*|author|*', quoteData[i]['author']);
            }

            quoteWrapper.empty().append(quotes);

            // quotes owl carousel
            quoteWrapper.owlCarousel(
                {
                    items:1,
                    loop:true,
                    nav:true,
                    margin:10,
                    center: true,
                    autoplay:true,
                    responsiveClass:true,
                    autoplayTimeout:5000,
                    animateIn: 'fadeIn',
                    animateOut: 'fadeOut',
                    navText: ['<i class="fa fa-angle-left fa-lg"></i>','<i class="fa fa-angle-right fa-lg"></i>']
                }
            );

        }

        return {
            show: show
        };

    });

})();