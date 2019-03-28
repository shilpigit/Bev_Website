(function () {
    'use strict';

    define(['toastr'],
        function (toastr) {
            var logger = {
                init: init,
                log: log,
                logSuccess: logSuccess,
                logWarning: logWarning,
                logError: logError,
                logInfo: logInfo,
                qLog: qLog,
                qLogSuccess: qLogSuccess,
                qLogWarning: qLogWarning,
                qLogError: qLogError,
                qLogInfo: qLogInfo
            };

            init();

            return logger;


            function init() {
                toastr.options = {
                    "newestOnTop": true,
                    "progressBar": true,
                    "timeOut": "3000"
                };
            }
            function qLog(message) {
                logIt(message, null, null);
            }

            function log(message, data, source) {
                logIt(message.message, data, source);
            }

            function logError(message, data, source) {
                logIt(message.message, data, source);

                toastr.error(message.message, message.title);
            }

            function qLogError(message) {
                logIt(message, null, null);

                toastr.error(message);
            }

            function logSuccess(message, data, source) {
                logIt(message.message, data, source);

                toastr.success(message.message, message.title);
            }


            function qLogSuccess(message) {
                logIt(message, null, null);

                toastr.success(message);
            }

            function logWarning(message, data, source) {
                logIt(message.message, data, source);

                toastr.warning(message.message, message.title);
            }


            function qLogWarning(message) {
                logIt(message, null, null);

                toastr.warning(message);
            }

            function logInfo(message, data, source) {
                logIt(message.message, data, source);

                toastr.info(message.message, message.title);
            }

            function qLogInfo(message) {
                logIt(message, null, null);

                toastr.info(message);
            }

            function logIt(message, data, source) {
                source = source ? '[' + source + '] ' : '';

                if (data) {
                    console.log(source, message, data);
                } else {
                    console.log(source, message);
                }
            }
        });
})();
