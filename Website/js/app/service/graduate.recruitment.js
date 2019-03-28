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
        'text!template/list/inner-tile-partial-view.html'
    ], function ($, config, model, utilities, contents, companyPartial, tileListPartial, innerTileListPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // show
        function show() {
            
            var title = 'Graduate Recruitment';

            // partial
            wrapper.empty().append(companyPartial.replace('*|title|*', title));

            // companies
            var partial = '';
            var companies = model.ModelCompany['info'];
            var companiesWrapper = $('#companies-wrapper');
            var isEmpty = true;

            if(companies.length > 0){

                $.each(companies, function (index, company) {

                    var graduate = company['graduateRecruitmentPublicInfos'];

                    if (graduate && graduate.length > 0) {

                        isEmpty = false;

                        var graduatesRecruitment = '';
                        $.each(graduate, function (index, graduateRecruitment) {

                            var position = graduateRecruitment['availablePositions'];
                            graduatesRecruitment += innerTileListPartial
                                .replace('*|date-of-intake|*', utilities.getTimeAgo(graduateRecruitment['dateOfIntake']))
                                .replace('*|title|*', graduateRecruitment['campaignTitle'])
                                .replace('*|position|*', position ? position : '');

                        });

                        partial += tileListPartial
                            .replace('*|image-url|*', utilities.getCompanyLogoImageId(company['logoImageId']))
                            .replace('*|title|*', company['companyName'])
                            .replace('*|description-hidden|*', 'hidden')
                            .replace('*|inner-hidden|*', '')
                            .replace('*|inner-tile|*', graduatesRecruitment);

                    }
                });

                if(isEmpty === false){
                    $(partial).hide().appendTo(companiesWrapper.empty()).fadeIn('slow');
                }
                else{
                    contents.getByKey(config['aWebSiteGraduateSchemesContentKey'], title);
                }

            }
            else{
                contents.getByKey(config['aWebSiteGraduateSchemesContentKey'], title);
            }

            utilities.enableForm(wrapper);

        }

        return {
            show: show
        };

    });

})();