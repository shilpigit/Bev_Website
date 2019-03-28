(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getLogos: getLogos
        };

        function init() {
            
            amplify.request.define('getLogos', 'ajax', {
                url: config.baseApiAppUrl + 'company/CompanyContainer/getLogos',
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

        function getLogos(callbacks) {
            return amplify.request({
                resourceId: 'getLogos',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();