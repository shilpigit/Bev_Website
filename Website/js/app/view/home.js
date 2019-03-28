(function () {
    'use strict';

    define([
            'jquery',
            'service/utilities',
            'service/contents',
            'service/companies',
            'service/translations',
            'service/quarterly.magazines',
            'service/header.footer',
            'service/main',
            'service/sponsors',
            'service/about.us',
            'service/contact.us',
            'service/sign.up',
            'service/graduate.recruitment',
            'service/quarterly.awards.nomination',
            'service/quarterly.awards',
            'service/community.network',
            'service/privacy.policy',
            'service/terms.of.service',
            'service/jobs.search',
            'service/frequently.asked.question',
            'bootstrap' //we have not added this as parameters because we don't use it in the home view (this view)
        ],
        function (
            $,
            utilities,
            contents,
            companies,
            translations,
            quarterlyMagazines,
            headerFooter,
            main,
            sponsors,
            aboutUs,
            contactUs,
            signUp,
            graduateRecruitment,
            quarterlyAwardsNomination,
            quarterlyAwards,
            communityNetwork,
            privacyPolicy,
            termsOfService,
            jobsSearch,
            frequentlyAskedQuestion) {

            // this class is a view class so feel free to do what you need !
            // DOM objects
            var isHashChange = false;
            var homeContentWrapper = $('#home-content-wrapper');
            var otherContentWrapper = $('#other-content-wrapper');

            // private methods
            // active nav bar
            function activeNavBar(activeItem) {
                activeItem = $('a[href$="' + activeItem + '"]').parent('li');
                utilities.activeNavBar(activeItem);
            }

            // get info from server
            function getInfoFromServer() {

                // get companies                
                utilities.disableForm($(document).find('#_logos-container'));
                companies.getCompaniesPublicInfo().done(function () {
                    sponsors.show();
                });

                // get contents
                contents.getAllEnglishWebsite();

                // get translations
                translations.getAll();

                // magazine
                quarterlyMagazines.getAllCurrent();

            }

            // load home page
            function loadHomePage() {

                // fade out
                otherContentWrapper.fadeOut('slow');

                // home page
                homeContentWrapper.fadeIn('slow');
                main.show();

                // get info                
                getInfoFromServer();

            }

            // load pages by key
            function loadPagesByKey(key) {

                var activeItem = key;
                switch (key) {

                    // content
                    case 'about-us' :
                        utilities.disableForm(otherContentWrapper);
                        contents.getAllEnglishWebsite().done(function () {
                            aboutUs.show();
                        });
                        break;
                    case 'quarterly-awards' :
                        utilities.disableForm(otherContentWrapper);
                        contents.getAllEnglishWebsite().done(function () {
                            activeItem = 'quarterly';
                            quarterlyAwards.show();
                        });
                        break;
                    case 'frequently-asked-questions':
                        utilities.disableForm(otherContentWrapper);
                        contents.getAllEnglishWebsite().done(function () {
                            activeItem = 'FAQ&#39';
                            frequentlyAskedQuestion.show();
                        });
                        break;

                    // translations
                    case 'quarterly-magazine' :
                        activeItem = 'quarterly';
                        utilities.disableForm(otherContentWrapper);
                        translations.getAll().done(function () {
                            quarterlyMagazines.getAllCurrent().done(function () {
                                quarterlyMagazines.orderByQuarterCodeValue().done(function () {
                                    quarterlyMagazines.show();
                                });
                            });
                        });

                        break;
                    case 'quick-jobs-search' :
                        utilities.disableForm(otherContentWrapper);
                        translations.getAll().done(function () {
                            companies.getCompaniesPublicInfo().done(function () {
                                jobsSearch.getCountries().done(function () {
                                    jobsSearch.getOrderBys().done(function () {
                                        jobsSearch.show();
                                    });
                                });
                            });
                        });
                        break;

                    case 'view-vacancy' :
                    case 'view-company-profile':
                        utilities.disableForm(otherContentWrapper);
                        translations.getAll().done(function () {
                            companies.getCompaniesPublicInfo().done(function () {
                                jobsSearch.getCountries().done(function () {
                                    jobsSearch.getCompanyProfile();
                                });
                            });
                        });
                        break;

                    // company
                    case 'graduate-schemes' :
                    case 'graduate-recruitment' :
                        utilities.disableForm(otherContentWrapper);
                        companies.getCompaniesPublicInfo().done(function () {
                            graduateRecruitment.show();
                        });
                        break;
                    case 'community-network' :
                        utilities.disableForm(otherContentWrapper);
                        companies.getCompaniesPublicInfo().done(function () {
                            var title = utilities.getParameterValues('t');
                            title ? communityNetwork.getByTitle(title) : communityNetwork.show();
                        });
                        break;

                    // independent info
                    case 'contact-us' :
                        contactUs.show();
                        break;
                    case 'sign-up' :
                        signUp.show();
                        break;
                    case 'quarterly-awards-nomination' :
                        activeItem = '#!';
                        quarterlyAwardsNomination.show();
                        break;
                    case 'privacy-policy' :
                        privacyPolicy.show();
                        break;
                    case 'terms-of-service' :
                        termsOfService.show();
                        break;
                    //case 'frequently-asked-questions':
                    //    frequentlyAskedQuestion.show();
                    //    break;
                    default:
                        loadHomePage();
                        return;
                }

                activeNavBar(activeItem);

            }

            // load pages
            function loadPages() {

                utilities.scrollToTop();

                // show progress bar
                if(!isHashChange) {
                    utilities.showProgressBar();
                }

                // show header & footer
                headerFooter.show();

                // other content
                if (utilities.isValidRout('/show')) {

                    // fade out
                    homeContentWrapper.fadeOut('slow');

                    // search for partial key & title
                    var key = utilities.getParameterValues('key');
                    key = key ? key : utilities.getParameterValues('t');

                    if (key) {

                        loadPagesByKey(key);

                        otherContentWrapper.fadeIn('slow');
                        return; // don't show home anymore

                    }
                }

                // home page
                loadHomePage();

            }

            // start
            loadPages();

            // event
            // stop loader
            $(document).ready(function () {
                // place code to be executed on completion of last outstanding ajax call here
                utilities.hideProgressBar();
            });

            // handlers
            $(window).on('hashchange', function () {
                isHashChange = true;
                loadPages();
            });

        });
})();