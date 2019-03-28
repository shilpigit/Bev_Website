(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {

        
        var service = {
            getCompaniesPublicInfo: getCompaniesPublicInfo,
            getLogosAndIds: getLogosAndIds
        };

        function init() {
            
            amplify.request.define('getCompanyPublicInfo', 'ajax', {
                url: config.baseApiAppUrl + 'company/CompanyContainer/GetCompanyPublicInfo',
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

            amplify.request.define('getLogosAndIds', 'ajax', {
                url: config.baseApiAppUrl + 'company/CompanyContainer/GetLogosAndIds',
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

        function getCompaniesPublicInfo(callbacks) {
            return amplify.request({
                resourceId: 'getCompanyPublicInfo',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function getLogosAndIds(callbacks) {
            return amplify.request({
                resourceId: 'getLogosAndIds',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();