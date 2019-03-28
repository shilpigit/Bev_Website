(function () {
    'use strict';

    define([
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'model/model'
    ], function ($, config, dataAccess, model) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var translations = null;
        
        // get all
        function getAll() {
            
            return $.Deferred(function (def) {

                if(model.ModelTranslation['info'] == null){
                    
                    dataAccess.DataTranslation.getTranslation({
                        
                        success: function (data) {
                            translations = model.ModelTranslation['info'] = data;
                            def.resolve();
                        },
                        error: function () {
                            def.reject();
                        }
                        
                    });
                }else{
                    def.resolve();
                }

            }).promise();
        }
        
        return {
            getAll: getAll
        };

    });

})();