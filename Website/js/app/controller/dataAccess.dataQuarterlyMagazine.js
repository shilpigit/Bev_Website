(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getCurrentQuarterlyMagazine: getCurrentQuarterlyMagazine
        };

        function init() {
            
            amplify.request.define('getCurrentQuarterlyMagazine', 'ajax', {
                url: config.baseApiAppUrl + 'quarterlyMagazine/QuarterlyMagazineContainer/current',
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

        function getCurrentQuarterlyMagazine(callbacks) {
            return amplify.request({
                resourceId: 'getCurrentQuarterlyMagazine',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();