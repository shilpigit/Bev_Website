(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'model/model',
        'service/utilities',
        'service/contents',
        'text!template/magazine/wrapper-partial-view.html',
        'text!template/magazine/item-partial-view.html'
    ], function ($, config, dataAccess, model, utilities, contents, wrapperPartial, itemPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var isOrdered = false;
        var quarterlyMagazines = null;
        var translations = null;
        var wrapper = $(document).find('#other-content-wrapper');

        // get all current quarterly magazine
        function getAllCurrent() {

            // await
            return $.Deferred(function (def) {

                if(model.ModelQuarterlyMagazine['info'] == null){
                    // call
                    dataAccess.DataQuarterlyMagazine.getCurrentQuarterlyMagazine({

                        // if action call was successful
                        success: function (data) {
                            quarterlyMagazines = model.ModelQuarterlyMagazine['info'] = data;
                            def.resolve();
                        },
                        // if any Unhanded error accrues
                        error: function () {
                            def.reject();
                        }
                    });
                }else{
                    def.resolve();
                }

            }).promise();
        }

        function orderByQuarterCodeValue() {

            translations = model.ModelTranslation['info'];

            // await
            return $.Deferred(function (def) {

                    // if don't ordered sort list
                    if (!isOrdered) {

                        isOrdered = true;
                        $.each(quarterlyMagazines, function (index, magazine) {

                            var quarterlyMagazine = magazine['quarterlyMagazine'];

                            var stringQuarter = quarterlyMagazine['quarterCodeValue'];
                            stringQuarter = 'string' + (stringQuarter.capitalizeFirstLetter());
                            quarterlyMagazine['quarterCodeValue'] = translations[stringQuarter];

                            var fileReference = magazine['fileLocation'];
                            magazine['fileLocation'] = fileReference != null && fileReference.length ?
                                fileReference : 'javascript:void(0);';

                        });

                        quarterlyMagazines = utilities.sortByKey(quarterlyMagazines, 'quarterlyMagazine', 'quarterCodeValue');
                    }
                    def.resolve();

            }).promise();
        }

        // show current in view
        function getCurrent() {

            // await
            return $.Deferred(function (def) {

                if (quarterlyMagazines != null && quarterlyMagazines.length > 0) {

                    var magazinesHtml = '';

                    var itemsHtml = '';
                    $.each(quarterlyMagazines, function (index, magazine) {

                        var quarterlyMagazine = magazine['quarterlyMagazine'];

                        itemsHtml += itemPartial
                            .replace('*|file-location|*', magazine['coverFileLocation'])
                            .replace('*|title|*', quarterlyMagazine['title'])
                            .replace('*|quarter|*', quarterlyMagazine['quarterCodeValue'])
                            .replace('*|text|*', $(quarterlyMagazine['text']).text())
                            .replace('*|file-reference|*', magazine['fileLocation']);

                    });

                    magazinesHtml += wrapperPartial.replace('*|items|*', itemsHtml);
                    $(magazinesHtml).hide().appendTo(wrapper.empty()).fadeIn('slow');

                    def.resolve();

                } else {
                    contents.getByKey(config['aWebSiteQuarterlyMagazineContentKey'], 'Quarterly Magazine');
                }
                utilities.enableForm(wrapper);

            }).promise();

        }

        // show
        function show() {

            // set meta tags
            // utilities.setMetaTags4FB('Quarterly Magazine', 'Quarterly Magazine', '');
            getCurrent();
        }
        
        return {
            show: show,
            getAllCurrent: getAllCurrent,
            orderByQuarterCodeValue: orderByQuarterCodeValue
        };

    });

})();