(function () {
    'use strict';

    define(
        function () {

            var model = function (options) {

                this.searchPhrase = options.searchPhrase;
                this.orderByCodeValue = options.orderByCodeValue;
                this.countryCodeValue = options.countryCodeValue;
                this.industryExperienceCodeValue = options.industryExperienceCodeValue;
                this.employmentTypeCodeValue = options.employmentTypeCodeValue;
                this.salarySoughtCurrencyCodeValue = options.salarySoughtCurrencyCodeValue;
                this.salarySoughtAmount = options.salarySoughtAmount;
                this.educationCodeValue = options.educationCodeValue;
                this.summaryOfExperienceCategoryCodeValue = options.summaryOfExperienceCategoryCodeValue;
                this.experienceDisciplineFirstLevelCodeValue = options.experienceDisciplineFirstLevelCodeValue;
                this.experienceDisciplineSecondLevelCodeValue = options.experienceDisciplineSecondLevelCodeValue;
                this.token = options.token;
            };

            return model;
        });
})();