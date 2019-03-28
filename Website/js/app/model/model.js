(function () {
    'use strict';

    define([         
            'model/model.modelQuote',
            'model/model.modelInvitation',
            'model/model.modelJobsSearch',
            'model/model.modelSponsor',
            'model/model.modelCompany',
            'model/model.modelContent',
            'model/model.modelTranslation',
            'model/model.modelQuarterlyMagazine'
    ],
        function (modelQuote, modelInvitation, modelJobsSearch, modelSponsor, modelCompany, modelContent, modelTranslation, modelQuarterlyMagazine) {

            return {
                ModelQuote: modelQuote,
                ModelInvitation: modelInvitation,
                ModelJobsSearch: modelJobsSearch,
                ModelSponsor: modelSponsor,
                ModelCompany: modelCompany,
                ModelContent: modelContent,
                ModelTranslation: modelTranslation,
                ModelQuarterlyMagazine: modelQuarterlyMagazine
            };
        });
})();