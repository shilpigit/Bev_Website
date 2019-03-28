(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            newItem: newItem,
            getAllEnglishWebsite: getAllEnglishWebsite
        };

        function init() {

            amplify.request.define('getAllEnglishWebsite', 'ajax', {
                url: config.baseApiAppUrl + 'content/GetAllWebsiteContent/en',
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

        function getAllEnglishWebsite(callbacks, data) {
            return amplify.request({
                resourceId: 'getAllEnglishWebsite',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function newItem(options) {
            return new model.ModelContent(options);
        }

        init();

        return service;

    });

})();