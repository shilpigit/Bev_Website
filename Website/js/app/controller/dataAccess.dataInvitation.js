(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            postCheck: postCheck,
            newItem: newItem
        };

        function init() {

            amplify.request.define('postCheck', 'ajax', {
                url: config.baseApiUrl + 'invitation/check',
                dataType: 'json',
                type: 'POST',
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

        function postCheck(callbacks, data) {
            return amplify.request({
                resourceId: 'postCheck',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function newItem(options) {
            return new model.ModelInvitation(options);
        }

        init();

        return service;

    });

})();