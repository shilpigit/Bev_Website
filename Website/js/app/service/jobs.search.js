(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'model/model',
        'service/utilities',
        'text!template/search/quick-jobs-search-partial-view.html',
        'text!template/search/find-jobs-partial-view.html',
        'text!template/search/pagination.html',
        'text!template/search/details-partial-view.html'
    ], function ($, config, dataAccess, model, utilities, jobSearchPartial, resultPartial, paginationPartial, detailsPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var translations = null;
        var countries = [];
        var orderBys = null;
        var vacancySearchResult = null;
        var tempToken = {};
        var currentToken = '';
        var nextToken = '';
        var recordsCount = null;
        var pageIndex = 1;
        var page = null;
        var isSearchButton = false;
        var isPreviousButton = false;
        var isNextButton = false;
        var wrapper = $(document).find('#other-content-wrapper');

        // countries
        function getCountries() {

            // translations
            translations = model.ModelTranslation['info'];

            return $.Deferred(function (def) {

                if(countries.length <= 0){

                    dataAccess.DataJobsSearch.getCountries({

                        success: function (data) {                            
                            var item = { 'value' : '', 'text' : 'All' };
                            countries.push(item);

                            for (var i = 0; i < data['codes'].length; i++) {

                                var country = data['codes'][i];
                                var codeValue = country['codeValue'];
                                var dataDefinitionId = country['dataDefinitionId'];
                                var dataDefinitionString = translations[dataDefinitionId];

                                item = { 'value' : codeValue, 'text' : dataDefinitionString };
                                countries.push(item);

                            }

                            def.resolve();
                        },
                        error: function () {
                            def.reject();
                        }

                    });

                }else{
                    def.resolve();
                }


            }).promise();
        }

        // drop down countries
        function fullDropDownCountries(wrapper, countryCodeValue) {            
            wrapper.empty();
            $.each(countries, function (index, country) {
                wrapper.append($('<option>', {value: country['value'], text: country['text']}));
            });

            if (countryCodeValue) {                
                wrapper.val(countryCodeValue);
            }
        }

        // text
        function getCountryText(codeValue) {            
            var text = '';
            $.each(countries, function (index, country) {
                if (countries.hasOwnProperty(index)) {
                    if (country['value'] == codeValue) {
                        text = country['text'];
                    }
                }
            });
            return text;
        }

        // orderBys
        function getOrderBys() {

            // await
            return $.Deferred(function (def) {

                if(orderBys == null){
                    // call search
                    dataAccess.DataJobsSearch.getOrderBy({

                        // if action call was successful
                        success: function (data) {
                            orderBys = data;
                            def.resolve();
                        },
                        // if any Unhanded error accrues
                        error: function () {
                            def.reject();
                        }
                    });
                }else{
                    def.resolve();
                }

            }).promise();

        }

        // drop down order by
        function fullDropDownOrderBys(wrapper, orderByCodeValue) {            
            var codes = orderBys['codes'];
            if (codes.length > 0) {

                var options = '';
                for (var i = 0; i < codes.length; i++) {
                    var orderByd = codes[i];
                    if (orderByd != null) {
                        var codeValue = orderByd['codeValue'];
                        var dataDefinitionId = orderByd['dataDefinitionId'];
                        var dataDefinitionString = translations[dataDefinitionId];
                        options += '<option value="' + codeValue + '">' + dataDefinitionString + '</option>';
                    }
                }
                wrapper.empty().append(options);
                wrapper.val(orderByCodeValue ? orderByCodeValue : 'jobTitle');
            }

        }

        // change url
        function changeUrl(searchPhrase, countryCodeValue, orderByCodeValue) {
            history.pushState(null, '','/#!/show/?key=quick-jobs-search&s=' + searchPhrase +'&c=' + countryCodeValue + '&o=' + orderByCodeValue);
        }

        // get search
        function getSearch(searchPhrase, countryCodeValue, orderByCodeValue) {

            // await
            return $.Deferred(function (def) {

                if(vacancySearchResult == null || isSearchButton || isPreviousButton || isNextButton){

                    // new model data
                    var modelJobSearch = dataAccess.DataJobsSearch.newItem({
                        searchPhrase: searchPhrase ?  searchPhrase : '',
                        countryCodeValue: countryCodeValue,
                        orderByCodeValue: orderByCodeValue,
                        industryExperienceCodeValue: '',
                        employmentTypeCodeValue: '',
                        salarySoughtCurrencyCodeValue: '',
                        salarySoughtAmount: '',
                        educationCodeValue: '',
                        summaryOfExperienceCategoryCodeValue: '',
                        experienceDisciplineFirstLevelCodeValue: '',
                        experienceDisciplineSecondLevelCodeValue: '',
                        token: encodeURI(currentToken)
                    });

                    if(pageIndex==1){
                        tempToken[pageIndex] = currentToken;
                    }

                    // call search
                    dataAccess.DataJobsSearch.getSearch({

                        // if action call was successful
                        success: function (data) {

                            vacancySearchResult = data['vacancySearchResult'];
                            nextToken = data['continuationToken'];

                            if(recordsCount == null || pageIndex==1){
                                recordsCount = data['recordsCount'];
                            }

                            page = Math.ceil(recordsCount / 10);
                            def.resolve();
                        },
                        // if any Unhanded error accrues
                        error: function () {

                            def.reject();

                        }
                    }, modelJobSearch);
                }else{
                    def.resolve();
                }

            }).promise();
        }

        // job search
        function jobsSearch(quickJobsSearchForm, searchPhrase, countryCodeValue, orderByCodeValue) {

            var findJobsWrapper = $('#find-jobs-wrapper');
            var jobsPagination = $('.jobs-pagination');
            var notFound = $('#not-found-jobs-wrapper').fadeOut('slow');

            if (!(isPreviousButton || isNextButton)) {
                utilities.disableForm(quickJobsSearchForm);
            }
            else {
                utilities.disableForm(jobsPagination);
            }

            if (isSearchButton) {
                currentToken = '';
                pageIndex = 1;
                findJobsWrapper.empty();
                jobsPagination.empty();
            }

            getSearch(searchPhrase, countryCodeValue, orderByCodeValue).done(function () {

                // back to default value
                isSearchButton = isPreviousButton = isNextButton = false;

                // url
                changeUrl(searchPhrase, countryCodeValue, orderByCodeValue);

                if (vacancySearchResult.length > 0) {

                    var htmlCompany = '';
                    $.each(vacancySearchResult, function (index, result) {

                        if (result != null) {

                            var company = result['companyContainer']['company'];
                            var vacancy = result['vacancy'];
                            var country = getCountryText(vacancy['countryCode']);
                            var city = vacancy['cityName'];

                            htmlCompany += resultPartial
                                .replace('*|company-logo-url|*', utilities.getCompanyLogoImageId(company['logoImageId']))
                                .replace('*|created-date-time|*', utilities.getTimeAgo(vacancy['createdDateTime']))
                                .replace('*|company-name|*', company['name'])
                                .replace('*|job-title|*', vacancy['jobTitle'])
                                .replace('*|country|*', country)
                                .replace('*|city|*', country && city ? '/' + city : city ? city : '')
                                .replace('*|search-phrase|*', searchPhrase)
                                .replace('*|country-code-value|*', countryCodeValue)
                                .replace('*|order-by-code-value|*', orderByCodeValue)
                                .replace('*|token|*', currentToken)
                                .replace('*|count|*', recordsCount)
                                .replace('*|vacancy-id|*', vacancy['id']);
                        }

                    });

                    if(recordsCount > 10){
                        var paginationHtml = paginationPartial
                            .replaceAll('*|previous-disabled|*', pageIndex == 1 ? 'disabled' : '')
                            .replaceAll('*|next-disabled|*', pageIndex == page ? 'disabled' : '')
                            .replaceAll('*|index|*', pageIndex)
                            .replaceAll('*|page|*', page)
                            .replaceAll('*|count|*', recordsCount);

                        $(paginationHtml).hide().appendTo(jobsPagination.empty()).fadeIn('slow');
                    }

                    $(htmlCompany).hide().appendTo(findJobsWrapper.empty()).fadeIn('slow');

                    utilities.enableForm(jobsPagination);
                    utilities.enableForm(quickJobsSearchForm);
                }
                else {
                    notFound.fadeIn('slow');
                    utilities.enableForm(quickJobsSearchForm);
                }
            });
        }

        // show
        function show() {
            var searchPhrase = utilities.getParameterValues('s');
            var countryCodeValue = utilities.getParameterValues('c');
            var orderByCodeValue = utilities.getParameterValues('o');
            
            // show partial
            wrapper.empty().append(jobSearchPartial);

            // find controls
            var inputCountry = $('#inputCountry');
            var inputOrderBy = $('#inputOrderBy');
            var inputSearchPhrase = $('#inputSearchPhrase');
            var quickJobsSearchForm = '#quick-jobs-search-form';

            inputSearchPhrase.val(searchPhrase ? searchPhrase : '');
            fullDropDownCountries(inputCountry, countryCodeValue);
            fullDropDownOrderBys(inputOrderBy, orderByCodeValue);

            if (orderByCodeValue) {
                jobsSearch(quickJobsSearchForm, searchPhrase, countryCodeValue, orderByCodeValue);
            }

            utilities.enableForm(wrapper);

            // event
            // search form
            $(quickJobsSearchForm)
                .validate({
                    rules: {},
                    submitHandler: function () {
                        isSearchButton = true;
                        jobsSearch(quickJobsSearchForm, inputSearchPhrase.val(), inputCountry.val(), inputOrderBy.val());
                    }
                });
        }

        // details
        function getCompanyProfile() {

            var details = '';
            var searchPhrase = utilities.getParameterValues('s');
            var countryCodeValue = utilities.getParameterValues('c');
            var orderByCodeValue = utilities.getParameterValues('o');
            var vacancyId = utilities.getParameterValues('vc');
            currentToken = utilities.getParameterValues('t');
            recordsCount = utilities.getParameterValues('r');
            
            getSearch(searchPhrase, countryCodeValue, orderByCodeValue).done(function () {

                $.each(vacancySearchResult, function (index, result) {

                    var company = result['companyContainer']['company'];
                    if (company != null) {

                        var vacancy = result['vacancy'];

                        if (vacancy['id'] == vacancyId) {

                            var companyName = company['name'];
                            var jobTitle = vacancy['jobTitle'];
                            var companyLogoUrl = utilities.getCompanyLogoImageId(company['logoImageId']);
                            // var titlePage = companyName + '-' + jobTitle;
                            var responsibilities = vacancy['responsibilities'];
                            var scopeOfResponsibilities = vacancy['scopeOfResponsibilities'];
                            var entryRequirements = vacancy['entryRequirements'];
                            var additionalInformation = vacancy['additionalInformation'];

                            var country = getCountryText(vacancy['countryCode']);
                            var city = vacancy['cityName'];

                            // set meta tags
                            // utilities.setMetaTags4FB(titlePage, titlePage, company['description'], companyLogoUrl);

                            // responsibilities
                            // split and create lis
                            var responsibilitiesLis = '';
                            var responsibilitiesArray = responsibilities ? responsibilities.split('\n') : [];
                            for (var counter in responsibilitiesArray) {

                                var current = responsibilitiesArray[counter].trim();
                                if (current) {
                                    responsibilitiesLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // scopeOfResponsibilities
                            var scopeOfResponsibilitiesLis = '';
                            var scopeOfResponsibilitiesArray = scopeOfResponsibilities ? scopeOfResponsibilities.split('\n') : [];
                            for (counter in scopeOfResponsibilitiesArray) {

                                current = scopeOfResponsibilitiesArray[counter].trim();
                                if (current) {
                                    scopeOfResponsibilitiesLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // entryRequirements
                            var entryRequirementsLis = '';
                            var entryRequirementsArray = entryRequirements ? entryRequirements.split('\n') : [];
                            for (counter in entryRequirementsArray) {

                                current = entryRequirementsArray[counter].trim();
                                if (current) {
                                    entryRequirementsLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // additionalInformation
                            var additionalInformationLis = '';
                            var additionalInformationArray = additionalInformation ? additionalInformation.split('\n') : [];
                            for (counter in additionalInformationArray) {

                                current = additionalInformationArray[counter].trim();
                                if (current) {
                                    additionalInformationLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // details
                            return details += detailsPartial
                                .replace('*|company-name|*', companyName)
                                .replace('*|company-logo-url|*', companyLogoUrl)
                                .replace('*|country|*', country)
                                .replace('*|city|*', country && city ? '/' + city : city ? city : '')
                                .replace('*|job-title|*', jobTitle)
                                .replace('*|created-date-time|*', utilities.getTimeAgo(vacancy['createdDateTime']))
                                .replace('*|hidden-responsibilities|*', responsibilities ? '' : 'hidden')
                                .replace('*|responsibilities|*', responsibilitiesLis)
                                .replace('*|hidden-scope-of-responsibilities|*', scopeOfResponsibilities ? '' : 'hidden')
                                .replace('*|scope-of-responsibilities|*', scopeOfResponsibilitiesLis)
                                .replace('*|hidden-entry-requirements|*', entryRequirements ? '' : 'hidden')
                                .replace('*|entry-requirements|*', entryRequirementsLis)
                                .replace('*|hidden-additional-information|*', additionalInformation ? '' : 'hidden')
                                .replace('*|additional-information|*', additionalInformationLis)
                                .replace('*|require-visa|*', vacancy['requireVisa'] ? 'Yes' : 'No')
                                .replace('*|search-phrase|*', searchPhrase)
                                .replace('*|country-code-value|*', countryCodeValue)
                                .replace('*|order-by-code-value|*', orderByCodeValue)
                                .replace('*|apply-now-url|*', config.baseAppUrl + '#/signin/home?vc=' + vacancyId);

                        }
                    }

                });

                $(details).hide().appendTo(wrapper.empty()).fadeIn('slow');
                utilities.enableForm(wrapper);

            });
        }

        // event
        $(document).on('click', '.btn-previous', function () {

            if(pageIndex == 1){
                return false;
            }
            var inputCountry = $('#inputCountry');
            var inputOrderBy = $('#inputOrderBy');
            var inputSearchPhrase = $('#inputSearchPhrase');
            var quickJobsSearchForm = '#quick-jobs-search-form';

            // get previous token
            currentToken = tempToken[pageIndex];
            delete tempToken[pageIndex];

            pageIndex--;
            isPreviousButton = true;

            jobsSearch(quickJobsSearchForm, inputSearchPhrase.val(), inputCountry.val(), inputOrderBy.val());
        });

        // event
        $(document).on('click', '.btn-next', function () {

            if(pageIndex == page){
                return false;
            }

            var inputCountry = $('#inputCountry');
            var inputOrderBy = $('#inputOrderBy');
            var inputSearchPhrase = $('#inputSearchPhrase');
            var quickJobsSearchForm = '#quick-jobs-search-form';

            pageIndex++;
            isNextButton = true;

            // add current token in temp token
            tempToken[pageIndex] = currentToken;
            currentToken = nextToken;

            jobsSearch(quickJobsSearchForm, inputSearchPhrase.val(), inputCountry.val(), inputOrderBy.val());

        });

        return {
            show: show,
            getCompanyProfile: getCompanyProfile,
            getCountries: getCountries,
            getOrderBys: getOrderBys
        };

    });

})();