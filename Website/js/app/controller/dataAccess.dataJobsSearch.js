(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getSearch: getSearch,
            getCountries: getCountries,
            getOrderBy: getOrderBy,
            newItem: newItem
        };

        function init() {
            debugger
            amplify.request.define('getSearch', 'ajax', {
                url: config.baseApiAppUrl + 'vacancy/search/advanced?searchPhrase={searchPhrase}&orderByCodeValue={orderByCodeValue}&countryCodeValue={countryCodeValue}&industryExperienceCodeValue={industryExperienceCodeValue}&employmentTypeCodeValue={employmentTypeCodeValue}&salarySoughtCurrencyCodeValue={salarySoughtCurrencyCodeValue}&salarySoughtAmount={salarySoughtAmount}&educationCodeValue={educationCodeValue}&summaryOfExperienceCategoryCodeValue={summaryOfExperienceCategoryCodeValue}&experienceDisciplineFirstLevelCodeValue={experienceDisciplineFirstLevelCodeValue}&experienceDisciplineSecondLevelCodeValue={experienceDisciplineSecondLevelCodeValue}&token={token}',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });

            amplify.request.define('getCountries', 'ajax', {
                url: config.baseApiAppUrl + 'code/codeset?id=country',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {                        
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });

            amplify.request.define('getOrderBy', 'ajax', {
                url: config.baseApiAppUrl + 'code/codeset?id=vacancySearchOrderBy',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getSearch(callbacks, data) {
            debugger
            return amplify.request({
                resourceId: 'getSearch',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        }


        function getCountries(callbacks) {
            return amplify.request({
                resourceId: 'getCountries',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function getOrderBy(callbacks) {
            return amplify.request({
                resourceId: 'getOrderBy',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function newItem(options) {
            return new model.ModelJobsSearch(options);
        }

        init();

        return service;

    });

})();