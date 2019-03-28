(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getTranslation: getTranslation
        };

        function init() {
            
            amplify.request.define('getTranslation', 'ajax', {
                url: config.baseApiAppUrl + 'language/en',
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

        function getTranslation(callbacks) {
            return amplify.request({
                resourceId: 'getTranslation',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();