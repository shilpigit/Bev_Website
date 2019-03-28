(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'text!template/home/sponsor-partial-view.html',
        'owlCarousel'
    ], function ($, config, model, utilities, sponsorPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        function show() {

            var logos = '';
            var wrapper = $(document).find('#logos-container');
            var companies = model.ModelCompany['info'];
            
            utilities.disableForm(wrapper);

            // get logos            
            $.each(companies, function (index, company) {
                if (company['logoImageId']) {                    
                    logos += sponsorPartial.replace('*|image-url|*', utilities.getCompanyLogoImageId(company['logoImageId']));
                }
            });

            wrapper.empty().append(logos);
            wrapper.owlCarousel(
                {
                    loop: true,
                    nav: false,
                    margin: 10,
                    center: true,
                    autoplay: true,
                    responsiveClass: true,
                    autoplayTimeout: 2000,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 3
                        },
                        1000: {
                            items: 5
                        }
                    }
                }
            );

            utilities.enableForm(wrapper);
        }

        return {
            show: show
        };

    });

})();