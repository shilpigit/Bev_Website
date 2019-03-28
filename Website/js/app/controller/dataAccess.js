(function () {
    'use strict';

    define([         
            'dataAccess/dataAccess.dataSponsor',
            'dataAccess/dataAccess.dataQuote',
            'dataAccess/dataAccess.dataInvitation',
            'dataAccess/dataAccess.dataCompany',
            'dataAccess/dataAccess.dataJobsSearch',         
            'dataAccess/dataAccess.dataTranslation',
            'dataAccess/dataAccess.dataContent',
            'dataAccess/dataAccess.dataQuarterlyMagazine'
        ],
        function (             
            dataSponsor, 
            dataQuote, 
            dataInvitation, 
            dataCompany, 
            dataJobsSearch,
            dataTranslation,
            dataContent,
            dataQuarterlyMagazine) {

            return {
                DataSponsor: dataSponsor,
                DataQuote: dataQuote,
                DataInvitation: dataInvitation,
                DataCompany: dataCompany,
                DataJobsSearch: dataJobsSearch,
                DataTranslation: dataTranslation,
                DataContent: dataContent,
                DataQuarterlyMagazine: dataQuarterlyMagazine
            };
        });
})();