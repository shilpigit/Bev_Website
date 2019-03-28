(function () {
    'use strict';

    define(
        function () {

            var model = function (options) {

                this.quote = options.quote;
                this.author = options.author;
            };

            return model;
        });
})();