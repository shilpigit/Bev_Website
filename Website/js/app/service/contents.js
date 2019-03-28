(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'model/model',
        'service/utilities',
        'service/quick.sign.up',
        'text!template/global/content-partial-view.html'
    ], function ($, config, dataAccess, model, utilities, quickSignUp, contentPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var englishWebsiteContents = null;
        var wrapper = $(document).find('#other-content-wrapper');

        // get all contents
        function getAllEnglishWebsite() {

            return $.Deferred(function (def) {

                if(!model.ModelContent['info']){

                    dataAccess.DataContent.getAllEnglishWebsite({

                        success: function (data) {

                            englishWebsiteContents = model.ModelContent['info'] = data;
                            def.resolve();

                        },
                        error: function () {
                            def.reject();
                        }

                    });
                }
                else{
                    def.resolve();
                }

            }).promise();
        }

        // get by key
        function getByKey(key, title) {

            getAllEnglishWebsite().done(function () {

                var text = '';
                $.each(englishWebsiteContents, function(index, content) {
                    if(content['keyCodeValue'] === key){
                        return text = content['text'];
                    }
                });

                // set meta tags
                // utilities.setMetaTags4FB(title, title, text);

                wrapper.empty().append(contentPartial.replace('*|title|*',title).replace('*|text|*',text));
                quickSignUp.show();

                utilities.enableForm(wrapper);
            });
        }

        // get by key
        function getValueByKey(key) {

            return $.Deferred(function (def) {

                getAllEnglishWebsite().done(function () {

                    $.each(englishWebsiteContents, function(index, content) {

                        if(content['keyCodeValue'] === key){

                            model.ModelContent['value'] = content['text'];
                            def.resolve();
                            return;
                        }
                    });

                    model.ModelContent['value'] = '';
                    def.resolve();

                });

            }).promise();
        }

        return {
            getAllEnglishWebsite: getAllEnglishWebsite,
            getByKey: getByKey,
            getValueByKey: getValueByKey
        };

    });

})();