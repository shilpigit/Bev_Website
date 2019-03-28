(function () {
    'use strict';

    define([
        'jquery',
        'dataAccess/dataAccess',
        'model/model'
    ], function ($, dataAccess, model) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // companies public info
        function getCompaniesPublicInfo() {
            
            return $.Deferred(function (def) {

                if(model.ModelCompany['info'] == null){
                    
                    dataAccess.DataCompany.getCompaniesPublicInfo({
                        
                        success: function (data) {
                            model.ModelCompany['info'] = data;
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

        return {
            getCompaniesPublicInfo: getCompaniesPublicInfo
        };

    });

})();