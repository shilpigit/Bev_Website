(function () {
    'use strict';

    define(
        function () {

            var model = function (options) {

                this.uniquePin = options.uniquePin;
                this.changeLastEventLog = options.changeLastEventLog;
            };

            return model;
        });
})();