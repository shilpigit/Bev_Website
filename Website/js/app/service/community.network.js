(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'service/contents',
        'text!template/company-partial-view.html',
        'text!template/list/tile-partial-view.html',
        'text!template/list/details-partial-view.html'
    ], function ($, config, model, utilities, contents, companyPartial, tileListPartial, detailsPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // details
        function getByTitle(title) {

            var details = '';
            var companies = model.ModelCompany['info'];

            $.each(companies, function (index, company) {

                var imageUrl = utilities.getCompanyLogoImageId(company['logoImageId']);
                var companyName = company['companyName'];
                var lowerCompanyName = companyName.toLocaleString().toLocaleLowerCase();
                title = utilities.decodeUrl(title).toLocaleString().toLocaleLowerCase();

                if (lowerCompanyName == title) {

                    // set meta tags
                    // utilities.setMetaTags4FB(companyName, companyName, company['description'], imageUrl);

                    return details += detailsPartial
                        .replace('*|title|*', companyName)
                        // .replace('*|image-hidden|*', imageUrl == config['defaultImage'] ? 'hidden' : '')
                        .replace('*|image-url|*', imageUrl)
                        .replace('*|description|*', company['description'])
                        .replace('*|key|*', 'community-network');
                }

            });
            
            $(details).hide().appendTo(wrapper.empty()).fadeIn('slow');
            utilities.enableForm(wrapper);
        }
        
        // show
        function show() {
            
            var title = 'Community Network';

            // partial
            wrapper.empty().append(companyPartial.replace('*|title|*', title));

            // companies
            var partial = '';
            var companies = model.ModelCompany['info'];
            var companiesWrapper = $('#companies-wrapper');

            $.each(companies, function (index, company) {

                var description = company['description'];
                if(description){

                    var companyName = company['companyName'];
                    var encodeCompanyName = utilities.encodeUrl(companyName);
                    var shortDescription = utilities.getWords(description, 12).replace(/(<([^>]+)>)/ig, "");

                    partial += tileListPartial
                        .replace('*|image-url|*', utilities.getCompanyLogoImageId(company['logoImageId']))
                        .replace('*|title|*', companyName)
                        .replace('*|description-hidden|*', '')
                        .replace('*|short-description|*', shortDescription)
                        .replace('*|key|*', 'community-network')
                        .replace('*|encode-title|*', encodeCompanyName)
                        .replace('*|inner-hidden|*', 'hidden');
                }

            });

            $(partial).hide().appendTo(companiesWrapper.empty()).fadeIn('slow');

            utilities.enableForm(wrapper);

        }

        return {
            show: show,
            getByTitle: getByTitle
        };

    });

})();