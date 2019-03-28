(function () {
    'use strict';

    define(
        function () {

            var model = function (options) {

                this.info = options.info;
                this.value = options.value;
            };

            return model;
        });
})();