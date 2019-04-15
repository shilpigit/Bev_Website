(function () {
    'use strict';

    define(['jquery'], function () {

        return {

            //  Live            
             baseApiUrl: 'https://api.oildiversity.com/api/',
             baseUrl: 'https://api.oildiversity.com/',
             baseApiAppUrl: 'https://api.oildiversity.com/api/',
             baseAppUrl: 'https://app.oildiversity.com/',
             baseRedirectImageUrl: 'https://api.oildiversity.com/api/storage/redirect?id=',

            //  Development 
            //baseApiUrl: 'https://devapi.oildiversity.com/api/',
            //baseUrl: 'https://devapi.oildiversity.com/',
            //baseApiAppUrl: 'https://devapi.oildiversity.com/api/',
            //baseAppUrl: 'https://app.oildiversity.com/',
            //baseRedirectImageUrl: 'https://devapi.oildiversity.com/api/storage/redirect?id=',

            //  Local
            //baseApiUrl: 'http://localhost:7493/api/',
            //baseUrl: 'http://localhost:7493/',
            //baseApiAppUrl: 'http://localhost:7493/api/',
            //baseAppUrl: 'http://localhost:1056/',
            //baseRedirectImageUrl: 'http://localhost:7493/api/storage/redirect?id=',
            

            // content keys
            aWebSiteAboutUsContentKey: 'aWebSiteAboutUsContentKey',
            aWebSiteGraduateSchemesContentKey: 'aWebSiteGraduateSchemesContentKey',
            aWebSiteQuarterlyMagazineContentKey: 'aWebSiteQuarterlyMagazineContentKey',
            aWebSiteQuarterlyAwardsContentKey: 'aWebSiteQuarterlyAwardsContentKey',
            aWebSiteQuarterlyAwardFormContentKey: 'aWebSiteQuarterlyAwardFormContentKey',
            aWebSiteFAQContentKey: 'aWebSiteFAQContentKey',
            aWebSiteEfficiencySystemContentKey: 'aWebSiteEfficiencySystemContentKey',
            aWebSiteOurServicesContentKey: 'aWebSiteOurServicesContentKey',
            aWebSiteBusinessPackagesContentKey: 'aWebSiteBusinessPackagesContentKey',
            aWebSiteEntrepreneurialInnovationContentKey: 'aWebSiteEntrepreneurialInnovationContentKey',
            aWebSiteTechnologyShowcaseContentKey: 'aWebSiteTechnologyShowcaseContentKey',
            aWebSiteMentoringContentKey: 'aWebSiteMentoringContentKey',
            aWebSiteBusinessAdvertisingOpportunitiesContentKey: 'aWebSiteBusinessAdvertisingOpportunitiesContentKey',
            aWebSiteNonExecutiveBoardContentKey:'aWebSiteNonExecutiveBoardContentKey',

            // mail
            sendEmailTo: 'bev@oildiversity.com',
            keyMandrill: 'h5rNASp31Pq52ly495bLjw',

            // image default
            defaultImage: 'https://cdn.oildiversity.com/app/images/logo/logo-solo.png'
        };

    });

})();