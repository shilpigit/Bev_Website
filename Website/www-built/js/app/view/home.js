(function () {(function () {
    'use strict';

    define('service/config',['jquery'], function () {

        return {

            //  Live            
            // baseApiUrl: 'https://api.oildiversity.com/api/',
            // baseUrl: 'https://api.oildiversity.com/',
            // baseApiAppUrl: 'https://api.oildiversity.com/api/',
            // baseAppUrl: 'https://app.oildiversity.com/',
            // baseRedirectImageUrl: 'https://api.oildiversity.com/api/storage/redirect?id=',

            //  Development 
            //baseApiUrl: 'https://devapi.oildiversity.com/api/',
            //baseUrl: 'https://devapi.oildiversity.com/',
            //baseApiAppUrl: 'https://devapi.oildiversity.com/api/',
            //baseAppUrl: 'https://app.oildiversity.com/',
            //baseRedirectImageUrl: 'https://devapi.oildiversity.com/api/storage/redirect?id=',

            //  Local
            baseApiUrl: 'http://localhost:7493/api/',
            baseUrl: 'http://localhost:7493/',
            baseApiAppUrl: 'http://localhost:7493/api/',
            baseAppUrl: 'http://localhost:1056/',
            baseRedirectImageUrl: 'http://localhost:7493/api/storage/redirect?id=',
            

            // content keys
            aWebSiteAboutUsContentKey: 'aWebSiteAboutUsContentKey',
            aWebSiteGraduateSchemesContentKey: 'aWebSiteGraduateSchemesContentKey',
            aWebSiteQuarterlyMagazineContentKey: 'aWebSiteQuarterlyMagazineContentKey',
            aWebSiteQuarterlyAwardsContentKey: 'aWebSiteQuarterlyAwardsContentKey',
            aWebSiteQuarterlyAwardFormContentKey: 'aWebSiteQuarterlyAwardFormContentKey',
            aWebSiteFAQContentKey:'aWebSiteFAQContentKey',

            // mail
            sendEmailTo: 'bev@oildiversity.com',
            keyMandrill: 'h5rNASp31Pq52ly495bLjw',

            // image default
            defaultImage: 'https://cdn.oildiversity.com/app/images/logo/logo-solo.png'
        };

    });

})();
(function () {
    'use strict';

    define('service/utilities',[
        'jquery',
        'service/config',
        'waitMe',
        'moment',
        'nProgress'
    ], function ($, config, waitMe, moment, nProgress) {

        // all utilities and cool tools would come here

        // query strings
        function getParameterValues(param) {

            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < url.length; i++) {
                var urlparam = url[i].split('=');
                if (urlparam[0] === param) {
                    return decodeURI(urlparam[1]);
                }
            }
        }

        // show progress bar
        function showProgressBar() {
            nProgress.configure({ showSpinner: false });
            nProgress.start();
        }

        // hide progress bar
        function hideProgressBar() {
            nProgress.done();
        }

        // rout getter
        function isValidRout(rout) {

            var url = window.location.href.slice(window.location.href.indexOf('#!') + 1);

            if (url.indexOf('?') > -1) {
                url = url.split('?')[0];
            }

            return !!(url && (url === '!' + rout || url === '!' + rout + '/'));
        }

        // enable form
        function enableForm(wrapper) {
            $(wrapper).waitMe("hide");
        }

        // disable form
        function disableForm(wrapper) {
            $(wrapper).waitMe({
                effect : 'win8_linear',
                text : '',
                bg : 'rgba(255,255,255,0.8)',
                color : '#80bd01',
                maxSize : '',
                source : ''
            });
        }

        // get words
        function getWords(string, count) {
            string = $(string.toLocaleString()).text();
            var stringArray = string.split(/\s+/);
            var total = stringArray.length;
            var newString = stringArray.slice(0,count).join(" ");
            return total > count ? newString + '...' : newString;
        }

        // String.prototype.replaceAll = function(search, replacement) {
        //     var target = this;
        //     return target.replace(new RegExp(search, 'g'), replacement);
        // };

        String.prototype.replaceAll = function (str1, str2, ignore) {
            return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
        };

        function encodeUrl(queryString) {

            return queryString.replaceAll('-', '-dash-')
                .replaceAll('&', '-ampersand-')
                .replaceAll('/', '-forward-slash-')
                .replaceAll('=', '-equals-')
                .replaceAll('?', '-question-mark-')
                .replaceAll('.', '-dot-')
                .replaceAll('#', '-sharp-')
                .replaceAll('\'', '-grave-accent-')
                .replaceAll(' ', '-');
        }


        function decodeUrl(queryString) {

            return queryString.replaceAll('-dash-', '-')
                .replaceAll('-ampersand-' , '&')
                .replaceAll('-forward-slash-', '/')
                .replaceAll('-equals-', '=')
                .replaceAll('-question-mark-', '?')
                .replaceAll('-dot-', '.')
                .replaceAll('-sharp-', '#')
                .replaceAll('-grave-accent-', '\'')
                .replaceAll('-', ' ');
        }
        
        function getTimeAgo(dateTime) {
            return moment(dateTime).fromNow();
        }

        // scroll window to top
        function scrollToTop() {

            $('body,html').animate({
                scrollTop: 0
            });
            return false;
        }

        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };

        function sortByKey(array, subArray, key) {
            return array.sort(function(a, b) {
                var x = a[subArray][key];
                var y = b[subArray][key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        // set meta tag
        function setMetaTags4FB(type, title, description, image) {

            description = $(description).text();
            image = image ? image : 'https://cdn.oildiversity.com/app/images/logo/logo-solo.png';

            $('meta[property="og:url"]').attr('content', window.location.href);
            $('meta[property="og:type"]').attr('content', type);
            $('meta[property="og:title"]').attr('content', title);
            $('meta[property="og:description"]').attr('content', description);
            $('meta[property="og:image"]').attr('content', image);
        }

        // remove li in string without tag li
        function removeLi(string) {

            string = string.toLocaleString();

            // formats
            var pattern1 = /[0-9a-zA-Z•-]{1,2}.\t/g;
            var pattern2 = /[0-9]{1,2}.[ \t]?/g;
            var pattern3 = /[•-]{1,2}[. \t]?/g;

            // check exit li phrase
            var li = pattern1.exec(string) || pattern2.exec(string) || pattern3.exec(string);

            // remove li
            return string.replace(li, '');

        }

        // remove active nav bar
        function removeActiveNaveBar() {
            $('.nav li').removeClass('active');
        }

        // active nav bar
        function activeNavBar(item) {
            if (item.length) {

                removeActiveNaveBar();
                item.addClass('active');
            }
        }

        // get company image
        function getCompanyLogoImageId(logoImageId) {            
            var test = config['baseRedirectImageUrl'] + logoImageId;
            return logoImageId ? config['baseRedirectImageUrl'] + logoImageId : config['defaultImage'];
        }
        
        return {

            getParameterValues: getParameterValues,
            isValidRout: isValidRout,
            enableForm: enableForm,
            disableForm: disableForm,
            getWords: getWords,
            getTimeAgo: getTimeAgo,
            scrollToTop: scrollToTop,
            encodeUrl: encodeUrl,
            decodeUrl: decodeUrl,
            sortByKey: sortByKey,
            setMetaTags4FB: setMetaTags4FB,
            showProgressBar: showProgressBar,
            hideProgressBar: hideProgressBar,
            removeLi: removeLi,
            activeNavBar: activeNavBar,
            getCompanyLogoImageId: getCompanyLogoImageId
        };

    });

})();

(function () {
    'use strict';

    define(
        'model/model.modelQuote',[],function () {

            var model = function (options) {

                this.quote = options.quote;
                this.author = options.author;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelInvitation',[],function () {

            var model = function (options) {

                this.uniquePin = options.uniquePin;
                this.changeLastEventLog = options.changeLastEventLog;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelJobsSearch',[],function () {

            var model = function (options) {

                this.searchPhrase = options.searchPhrase;
                this.orderByCodeValue = options.orderByCodeValue;
                this.countryCodeValue = options.countryCodeValue;
                this.industryExperienceCodeValue = options.industryExperienceCodeValue;
                this.employmentTypeCodeValue = options.employmentTypeCodeValue;
                this.salarySoughtCurrencyCodeValue = options.salarySoughtCurrencyCodeValue;
                this.salarySoughtAmount = options.salarySoughtAmount;
                this.educationCodeValue = options.educationCodeValue;
                this.summaryOfExperienceCategoryCodeValue = options.summaryOfExperienceCategoryCodeValue;
                this.experienceDisciplineFirstLevelCodeValue = options.experienceDisciplineFirstLevelCodeValue;
                this.experienceDisciplineSecondLevelCodeValue = options.experienceDisciplineSecondLevelCodeValue;
                this.token = options.token;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelSponsor',[],function () {

            var model = function (options) {

                this.companies = options.companies;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelCompany',[],function () {

            var model = function (options) {

                this.info = options.info;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelContent',[],function () {

            var model = function (options) {

                this.info = options.info;
                this.value = options.value;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelTranslation',[],function () {

            var model = function (options) {

                this.info = options.info;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define(
        'model/model.modelQuarterlyMagazine',[],function () {

            var model = function (options) {

                this.info = options.info;
            };

            return model;
        });
})();
(function () {
    'use strict';

    define('model/model',[         
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
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataSponsor',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getLogos: getLogos
        };

        function init() {
            
            amplify.request.define('getLogos', 'ajax', {
                url: config.baseApiAppUrl + 'company/CompanyContainer/getLogos',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getLogos(callbacks) {
            return amplify.request({
                resourceId: 'getLogos',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataQuote',['service/config', 'model/model', 'amplify'], function (config, model) {


        var service = {
            newItem: newItem,
            getQuoteData: getQuoteData
        };

        function init() {

        }

        function newItem(options) {
            return new model.ModelQuote(options);
        }

        function getQuoteData() {

            var models = [];
                models.push(this.newItem({quote: 'Our ability to reach unity in diversity will be the beauty and the test of our civilisation.', author: 'Mahatma Gandhi'}));
                models.push(this.newItem({quote: 'All the diversity, all the charm, and all the beauty of life are made up of light and shade.', author: 'Leo Tolstoy, Anna Karenin'}));
                models.push(this.newItem({quote: 'Recognize yourself in he and she who are not like you and me.', author: 'Carlos Fuentes'}));
                models.push(this.newItem({quote: 'The only difference between you and the person you admire is their perspective on life.', author: 'Shannon L. Alder'}));
                models.push(this.newItem({quote: 'We are all the same and we are all different. What great friends we will be.', author: 'Kelly Moran'}));
                models.push(this.newItem({quote: 'Diversity creates dimension in the world.', author: 'Elizabeth Ann Lawless'}));
                models.push(this.newItem({quote: 'Amazing how eye and skin colour come in many shades yet many think sexuality is just gay or straight.', author: 'DaShanne Stokes'}));
                models.push(this.newItem({quote: 'So far there\'ll always be some thrive for perfection, there should be no shame in imperfection.', author: 'Aniekee Tochukwu'}));
                models.push(this.newItem({quote: 'Diversity cannot swim in a world flooding with clones.', author: 'Hiba Fatima Ahmad'}));
                models.push(this.newItem({quote: 'Channeled correctly and integrated properly, our diversity can be our greatest strength.', author: 'Max DePree'}));
                models.push(this.newItem({quote: 'Look what we\'ve done so far. We\'re pretty good at the impossible.', author: 'Richelle Mead, Soundless'}));
                models.push(this.newItem({quote: 'The acknowledgement of a single possibility can change everything.', author: 'Aberjhani, Splendid Literarium'}));
                models.push(this.newItem({quote: 'The strength of every individual is the grace for great work.', author: 'Lailah Gifty Akita, Think Great: Be Great!'}));
                models.push(this.newItem({quote: 'Without empathy, there\'d be no harmony in diversity.', author: 'Jennifer Tindugan-Adoviso'}));
                models.push(this.newItem({quote: 'Cultural heritage define the uniqueness of individuals. Appreciate cultural diversity.', author: 'Lailah Gifty Akita, Think Great: Be Great!'}));
                models.push(this.newItem({quote: 'When we respect our humanity, we can embrace our diversity.', author: 'Liza M. Wiemer'}));
            return models;
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataInvitation',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            postCheck: postCheck,
            newItem: newItem
        };

        function init() {

            amplify.request.define('postCheck', 'ajax', {
                url: config.baseApiUrl + 'invitation/check',
                dataType: 'json',
                type: 'POST',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function postCheck(callbacks, data) {
            return amplify.request({
                resourceId: 'postCheck',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function newItem(options) {
            return new model.ModelInvitation(options);
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataCompany',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {

        
        var service = {
            getCompaniesPublicInfo: getCompaniesPublicInfo,
            getLogosAndIds: getLogosAndIds
        };

        function init() {
            
            amplify.request.define('getCompanyPublicInfo', 'ajax', {
                url: config.baseApiAppUrl + 'company/CompanyContainer/GetCompanyPublicInfo',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });

            amplify.request.define('getLogosAndIds', 'ajax', {
                url: config.baseApiAppUrl + 'company/CompanyContainer/GetLogosAndIds',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getCompaniesPublicInfo(callbacks) {
            return amplify.request({
                resourceId: 'getCompanyPublicInfo',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function getLogosAndIds(callbacks) {
            return amplify.request({
                resourceId: 'getLogosAndIds',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataJobsSearch',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getSearch: getSearch,
            getCountries: getCountries,
            getOrderBy: getOrderBy,
            newItem: newItem
        };

        function init() {
            debugger
            amplify.request.define('getSearch', 'ajax', {
                url: config.baseApiAppUrl + 'vacancy/search/advanced?searchPhrase={searchPhrase}&orderByCodeValue={orderByCodeValue}&countryCodeValue={countryCodeValue}&industryExperienceCodeValue={industryExperienceCodeValue}&employmentTypeCodeValue={employmentTypeCodeValue}&salarySoughtCurrencyCodeValue={salarySoughtCurrencyCodeValue}&salarySoughtAmount={salarySoughtAmount}&educationCodeValue={educationCodeValue}&summaryOfExperienceCategoryCodeValue={summaryOfExperienceCategoryCodeValue}&experienceDisciplineFirstLevelCodeValue={experienceDisciplineFirstLevelCodeValue}&experienceDisciplineSecondLevelCodeValue={experienceDisciplineSecondLevelCodeValue}&token={token}',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });

            amplify.request.define('getCountries', 'ajax', {
                url: config.baseApiAppUrl + 'code/codeset?id=country',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {                        
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });

            amplify.request.define('getOrderBy', 'ajax', {
                url: config.baseApiAppUrl + 'code/codeset?id=vacancySearchOrderBy',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getSearch(callbacks, data) {
            debugger
            return amplify.request({
                resourceId: 'getSearch',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        }


        function getCountries(callbacks) {
            return amplify.request({
                resourceId: 'getCountries',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function getOrderBy(callbacks) {
            return amplify.request({
                resourceId: 'getOrderBy',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function newItem(options) {
            return new model.ModelJobsSearch(options);
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataTranslation',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getTranslation: getTranslation
        };

        function init() {
            
            amplify.request.define('getTranslation', 'ajax', {
                url: config.baseApiAppUrl + 'language/en',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getTranslation(callbacks) {
            return amplify.request({
                resourceId: 'getTranslation',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataContent',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            newItem: newItem,
            getAllEnglishWebsite: getAllEnglishWebsite
        };

        function init() {

            amplify.request.define('getAllEnglishWebsite', 'ajax', {
                url: config.baseApiAppUrl + 'content/GetAllWebsiteContent/en',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getAllEnglishWebsite(callbacks, data) {
            return amplify.request({
                resourceId: 'getAllEnglishWebsite',
                data: data,
                success: callbacks.success,
                error: callbacks.error
            });
        }

        function newItem(options) {
            return new model.ModelContent(options);
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess.dataQuarterlyMagazine',['service/config', 'model/model', 'amplify'], function (config, model, amplify) {


        var service = {
            getCurrentQuarterlyMagazine: getCurrentQuarterlyMagazine
        };

        function init() {
            
            amplify.request.define('getCurrentQuarterlyMagazine', 'ajax', {
                url: config.baseApiAppUrl + 'quarterlyMagazine/QuarterlyMagazineContainer/current',
                dataType: 'json',
                type: 'GET',
                decoder: function (data, status, xhr, success, error) {
                    if (status === "success") {
                        success(data, status);
                    } else if (status === "fail" || status === "error") {
                        try {
                            error(JSON.parse(xhr.responseText), status);
                        } catch (er) {
                            error(xhr.responseText, status);
                        }
                    }
                }
            });
        }

        function getCurrentQuarterlyMagazine(callbacks) {
            return amplify.request({
                resourceId: 'getCurrentQuarterlyMagazine',
                success: callbacks.success,
                error: callbacks.error
            });
        }

        init();

        return service;

    });

})();
(function () {
    'use strict';

    define('dataAccess/dataAccess',[         
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
/**
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
 define, window, process, Packages,
 java, location, Components, FileUtils */

define('text',['module'], function (module) {
    'use strict';

    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    function useDefault(value, defaultValue) {
        return value === undefined || value === '' ? defaultValue : value;
    }

    //Allow for default ports for http and https.
    function isSamePort(protocol1, port1, protocol2, port2) {
        if (port1 === port2) {
            return true;
        } else if (protocol1 === protocol2) {
            if (protocol1 === 'http') {
                return useDefault(port1, '80') === useDefault(port2, '80');
            } else if (protocol1 === 'https') {
                return useDefault(port1, '443') === useDefault(port2, '443');
            }
        }
        return false;
    }

    text = {
        version: '2.0.15',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.lastIndexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                    name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                ((!uPort && !uHostName) || isSamePort(uProtocol, uPort, protocol, port));
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                    text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                        parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                    "define(function () { return '" +
                    content +
                    "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
            //Use a '.js' file name so that it indicates it is a
            //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
        typeof process !== "undefined" &&
        process.versions &&
        !!process.versions.node &&
        !process.versions['node-webkit'] &&
        !process.versions['atom-shell'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file[0] === '\uFEFF') {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
        text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
        typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
        typeof Components !== 'undefined' && Components.classes &&
        Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                    .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                    .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                    Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});

define('text!template/global/quick-sign-up-partial-view.html',[],function () { return '<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 remove-padding pull-left">\r\n    <a href="#!/show/?key=sign-up" class="btn btn-success btn-block remove-margin">Client Sign Up</a>\r\n</div>\r\n<div class="hidden-lg hidden-md col-sm-12 col-xs-12 spacer"></div>\r\n<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 remove-padding pull-right">\r\n    <a href="*|base-app-url|*#/signup" class="btn btn-default btn-block remove-margin">Register Your CV</a>\r\n</div>';});

(function () {
    'use strict';

    define('service/quick.sign.up',[
        'jquery',
        'service/config',
        'text!template/global/quick-sign-up-partial-view.html'
    ], function ($, config, quickSignUpPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // show
        function show() {

            var wrapper = $(document).find('#quick-sign-up-wrapper');
            var partial = quickSignUpPartial.replace('*|base-app-url|*', config.baseAppUrl);
            wrapper.empty().append(partial);

        }

        return {
            show: show
        };

    });

})();

define('text!template/global/content-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n\r\n    <div class="row"><h1>*|title|*</h1></div>\r\n    <div class="row">*|text|*</div>\r\n    <div id="quick-sign-up-wrapper" class="row"></div>\r\n\r\n</div>';});

(function () {
    'use strict';

    define('service/contents',[
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
(function () {
    'use strict';

    define('service/companies',[
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
(function () {
    'use strict';

    define('service/translations',[
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

define('text!template/magazine/wrapper-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n\r\n    <div class="row"><h1>Quarterly Magazine</h1></div>\r\n    <div class="row">*|items|*</div>\r\n\r\n</div>';});


define('text!template/magazine/item-partial-view.html',[],function () { return '<div class="row well text-left">\r\n\r\n    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12 remove-padding">\r\n        <img src="*|file-location|*" alt="" class="img img-responsive img-thumbnail center-block" />\r\n        <div class="spacer hidden-lg hidden-md"></div>\r\n    </div>\r\n\r\n    <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 remove-padding-right remove-padding-xs">\r\n\r\n        <div class="row">\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <h3 class="remove-margin">*|title|*</h3>\r\n            </div>\r\n        </div>\r\n\r\n        <div class="row">\r\n            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 remove-padding">\r\n                <code>*|quarter|*</code>\r\n            </div>\r\n            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 remove-padding">\r\n                <a href="*|file-reference|*" class="btn btn-default btn-xs pull-right" target="_blank">\r\n                    <span>Download</span>&nbsp;<i class="fa fa-download"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n\r\n        <div class="row">\r\n\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <p class="small remove-margin text-justify">*|text|*</p>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>';});

(function () {
    'use strict';

    define('service/quarterly.magazines',[
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

define('text!template/global/header-partial-view.html',[],function () { return '<style>\r\n    .dropdown:hover .dropdown-menu {\r\n        display: block;\r\n        position: relative;\r\n        width: 100%;\r\n    }\r\n    .navbar-fixed-top .navbar-collapse{ max-height:100%;}\r\n</style>\r\n\r\n<!--Fixed Navigation -->\r\n<div id="navigation" class="navbar-default navbar-fixed-top">\r\n    <div class="container">\r\n        <div class="navbar-header">\r\n\r\n            <!-- Logo -->\r\n            <a href="#!" class="navbar-brand">\r\n                <img src="https://cdn.oildiversity.com/app/images/logo/logo.svg" class="img img-responsive hidden-sm hidden-xs" />\r\n                <img src="https://cdn.oildiversity.com/app/images/logo/logo-solo.svg" class="img img-responsive hidden-lg hidden-md" />\r\n            </a>\r\n            <!-- End Logo -->\r\n            <!-- Responsive Nav Button -->\r\n            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\r\n                <span class="sr-only">Toggle navigation</span>\r\n                <span class="icon-bar"></span>\r\n                <span class="icon-bar"></span>\r\n                <span class="icon-bar"></span>\r\n            </button>\r\n            <!-- End Responsive Nav Button -->\r\n\r\n\r\n            <!-- Banner-->\r\n            <!-- <div style="background:#ccc; border:1px solid #808080; height:90px; width:728px; float:right;"></div>-->\r\n            <!-- End Banner-->\r\n        </div>\r\n\r\n        <!-- Main Nav -->\r\n        <nav id="navbar" class="collapse navbar-collapse navbar-right" role="navigation">\r\n            <ul id="nav" class="nav navbar-nav"></ul>\r\n        </nav>\r\n        <!-- End Main Nav -->\r\n    </div>\r\n</div>\r\n<!--End Fixed Navigation -->';});


define('text!template/global/footer-partial-view.html',[],function () { return '<!-- Social Network -->\r\n<div id="social-network-wrapper" class="row">\r\n    <div class="container">\r\n\r\n        <!--<div class="col-lg-offset-2 col-lg-2 col-md-offset-2 col-md-2 col-sm-3 col-xs-3">-->\r\n        <!--<a href="//blog.oildiversity.com" target="_blank">-->\r\n        <!--<i class="fa fa-rss social-icon"></i><span class="hidden-sm hidden-xs">Blog</span>-->\r\n        <!--</a>-->\r\n        <!--</div>-->\r\n        <div class="col-lg-offset-3 col-lg-2 col-md-offset-3 col-md-2 col-sm-offset-3 col-sm-2 col-xs-4">\r\n            <a href="https://www.facebook.com/oildiversity/" target="_blank">\r\n                <i class="fa fa-facebook social-icon"></i><span class="hidden-sm hidden-xs">Facebook</span>\r\n            </a>\r\n        </div>\r\n        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">\r\n            <a href="https://twitter.com/oildiversity" target="_blank">\r\n                <i class="fa fa-twitter social-icon"></i><span class="hidden-sm hidden-xs">Twitter</span>\r\n            </a>\r\n        </div>\r\n        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">\r\n            <a href="https://www.linkedin.com/company/oil-diversity-global-ltd.?trk=prof-following-company-logo" target="_blank">\r\n                <i class="fa fa-linkedin social-icon"></i><span class="hidden-sm hidden-xs">Linkedin</span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- End Social Network -->\r\n\r\n<!-- Footer -->\r\n<div class="footer">\r\n    <div class="container">\r\n        <img class="desaturate brand-footer" src="https://cdn.oildiversity.com/app/images/logo/logo-horizontal.svg">\r\n        <br>\r\n        <a href="#!/show/?key=privacy-policy">Privacy Policy</a> | <a href="#!/show/?key=terms-of-service">Terms of Service</a>\r\n        <br>\r\n        <span>\r\n            Copyright © 2016 B.E.V Oil & Gas. All Rights Reserved.\r\n            <br>\r\n            OilDiversityGlobal® is a registered trademark of the B.E.V Oil & Gas Group.\r\n        </span>\r\n    </div>\r\n</div>\r\n<!-- End Footer -->\r\n\r\n<!-- Job Search Button -->\r\n<div id="job-search-button-right" class="" style="display: none">\r\n    <button class="btn btn-success quick-job-search-btn"><i class="fa fa-search"></i><span class="hidden-xs">&nbsp;Search Jobs</span></button>\r\n</div>\r\n<!-- Job Search Button -->';});


define('text!template/global/main-navbar-partial-view.html',[],function () { return '<li><a href="#!">Home</a></li>\r\n<li><a href="#!/show/?key=about-us">About Us</a></li>\r\n<li><a href="#!/show/?key=contact-us">Contact Us</a></li>\r\n<li><a href="/news">Industry News</a></li>\r\n<li><a href="#!/show/?key=graduate-recruitment">Graduate Recruitment</a></li>\r\n<li><a href="#!/show/?key=community-network">Community Network</a></li>\r\n<li class="dropdown">\r\n    <a class="dropdown-toggle" data-toggle="dropdown" href="#!/show/?key=quarterly">Current Initiatives<span class="caret"></span></a>\r\n    <ul class="dropdown-menu">\r\n        <li><a href="#!/show/?key=quarterly-awards">Awards</a></li>\r\n    </ul>\r\n</li>\r\n<li><a href="#!/show/?key=frequently-asked-questions">FAQ\'s</a></li>';});


define('text!template/global/nomination-navbar-partial-view.html',[],function () { return '<li><a href="#!">Home</a></li>\r\n<li><a href="*|base-app-url|*">Back To User Area (Panel)</a></li>';});

(function () {
    'use strict';

    define('service/header.footer',[
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'service/utilities',
        'text!template/global/header-partial-view.html',
        'text!template/global/footer-partial-view.html',
        'text!template/global/main-navbar-partial-view.html',
        'text!template/global/nomination-navbar-partial-view.html'
    ], function ($, config, dataAccess, utilities, headerPartial, footerPartial, mainMenu, nominationMenu) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var headerWrapper = $('header');
        var footerWrapper = $('footer');

        // private functions
        // header
        function loadHeader() {

            headerWrapper.empty().append(headerPartial);
            var nav = $(document).find('#nav');
            var key = utilities.getParameterValues('key');
            
            switch (key) {

                case 'quarterly-awards-nomination' :
                    var menu = nominationMenu.replace('*|base-app-url|*', config.baseAppUrl);
                    nav.empty().append(menu).fadeIn('slow');
                    break;

                default:
                    nav.empty().append(mainMenu).fadeIn('slow');
                    break;

            }
        }

        // footer
        function loadFooter() {

            footerWrapper.empty().append(footerPartial);
            var searchJobBtn = $(document).find('#job-search-button-right');
            var key = utilities.getParameterValues('key');
            
            // not show in vacancy or job search
            if(key == 'quick-jobs-search' || key == 'view-vacancy' || key == 'view-company-profile'){
                searchJobBtn.fadeOut('slow');
            }
            else{
                searchJobBtn.fadeIn('slow');
            }

        }

        // show
        function show() {
            loadHeader();
            loadFooter();
        }
        
        // event

        // close nav bar in mobile view
        $(document).on('click', '.nav a', function(){
            $('.navbar-collapse').removeClass('in');
        });
        
        // active nave bar and close menu in mobile view
        $(document).find('.nav').find('li').on('click', function () {

            // active nave bar
            utilities.activeNavBar($(this));

            // close menu in mobile view
            if (!$(this).find('a').hasClass('dropdown-toggle')) {
                console.log('ok');
                $('#navbar').removeClass('in');
            }
            
        });

        // quick job search btn
        $(document).on('click', '.quick-job-search-btn', function(){
            window.location.href = '#!/show/?key=quick-jobs-search';
        });

        return {
            show: show
        };

    });

})();

define('text!template/home/quote-partial-view.html',[],function () { return '<div class="row-fluid">\r\n    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\r\n        <blockquote><p>*|quote|*</p></blockquote>\r\n    </div>\r\n    <div class="authority-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">\r\n        <span class="authority-container pull-right">*|author|*</span>\r\n    </div>\r\n</div>';});

(function () {
    'use strict';

    define('service/quotes',[
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'service/utilities',
        'text!template/home/quote-partial-view.html',
        'owlCarousel'
    ], function ($, config, dataAccess, utilities, quotePartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        function show() {

            // quote data
            var quoteData = dataAccess.DataQuote.getQuoteData();
            var quoteWrapper = $(document).find('#quotes-container');
            var quotes = '';

            for (var i = 0; i < quoteData.length; i++) {
                quotes += quotePartial.replace('*|quote|*', quoteData[i]['quote']).replace('*|author|*', quoteData[i]['author']);
            }

            quoteWrapper.empty().append(quotes);

            // quotes owl carousel
            quoteWrapper.owlCarousel(
                {
                    items:1,
                    loop:true,
                    nav:true,
                    margin:10,
                    center: true,
                    autoplay:true,
                    responsiveClass:true,
                    autoplayTimeout:5000,
                    animateIn: 'fadeIn',
                    animateOut: 'fadeOut',
                    navText: ['<i class="fa fa-angle-left fa-lg"></i>','<i class="fa fa-angle-right fa-lg"></i>']
                }
            );

        }

        return {
            show: show
        };

    });

})();

define('text!template/home/main-content-partial-view.html',[],function () { return '<!-- Header Background -->\r\n<div id="header-background" class="row">\r\n    <div id="title-wrapper">\r\n        <div class="container">\r\n            <div id="title-container" class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 remove-padding">\r\n                <img src="https://cdn.oildiversity.com/app/images/logo/logo-type-horizontal-white.svg" class="hidden-sm hidden-xs">\r\n                <div class="col-lg-12">\r\n                    <h3>The New Era of Global Business Collaboration and Workforce Efficiency</h3>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id="login-wrapper">\r\n        <div class="container">\r\n            <div class="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 remove-padding">\r\n                <h1>Sign In</h1>\r\n                <a href="*|base-app-url|*#/troubleloggingin?l=en"><small>Trouble logging in?</small></a>\r\n                <!--<a id="trouble-logging-in-link" href="javascript:void(0)"><small>Trouble logging in?</small></a>-->\r\n                <div id="job-seeker-login-wrapper" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <button id="job-seeker-login-btn" class="btn btn-block btn-success">JOB SEEKER LOGIN</button>\r\n                </div>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <button id="client-login-btn" class="btn btn-block btn-success">CLIENT LOGIN</button>\r\n                </div>\r\n                <small id="first-time-user-login">\r\n                    <span class="pull-left"><a href="#!/show/?key=sign-up">Client Sign Up</a></span>\r\n                    <span class="pull-right"><a href="*|base-app-url|*#/signup">Job Seeker Sign Up</a></span>\r\n                </small>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- End Header Background -->\r\n\r\n<!-- Sponsor -->\r\n<form id="sponsor-wrapper" class="row">\r\n    <div class="container">\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n            <h1>Our Business Collaboration Partners</h1>\r\n            <div id="logos-container" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding owl-carousel owl-theme container-fluid"></div>\r\n            <!--<div id="logos-container" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding text-center">-->\r\n            <!--<span>-->\r\n            <!--<h3>Launching in August 2016</h3>-->\r\n            <!--<h4>Our Clients are busy loading their vacancies onto the system, please revisit us in August</h4>-->\r\n            <!--</span>-->\r\n            <!--</div>-->\r\n            <!--<div id="visit-all-link" class="col-lg-12 text-right remove-padding">-->\r\n            <!--<a href="javascript:void(0)">Visit All Clients Here</a>-->\r\n            <!--</div>-->\r\n        </div>\r\n    </div>\r\n</form>\r\n<!-- End Sponsor -->\r\n\r\n<!-- JOIN -->\r\n<div class="row equal">\r\n\r\n    <div id="join-wrapper" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n        <div id="right-side">\r\n            <!--<div class="col-lg-9 col-lg-offset-2 col-md-9 col-md-offset-2 col-sm-12 col-xs-12 remove-padding">-->\r\n            <div class="row">\r\n                <h1>Join us as an affiliated Partner</h1>\r\n            </div>\r\n            <div id="join-description" class="row">\r\n                <p>\r\n                    Every company seeks to gain competitive advantage, and in our rapidly\r\n                    changing industry, Business Collaboration, Workforce Efficiency and \r\n                    Smart Tool technologies are becoming ever more recognised as a key \r\n                    route to success.\r\n                </p>\r\n                <p>\r\n                    Oil Diversity Global has been built for companies of all sizes around\r\n                    the globe to bring these tools onto one global platform to take action\r\n                    and provide solutions for some of our industry&#39s biggest challenges,\r\n                    helping us all to evolve as a collective.\r\n                </p>\r\n            </div>\r\n            <div id="lets-start-today-wrapper" class="row">\r\n                <a href="#!/show/?key=sign-up" class="btn btn-white col-lg-4 pull-right">LETS START TODAY</a>\r\n            </div>\r\n            <!--</div>-->\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div id="job-search-wrapper" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n        <div id="left-side">\r\n            <div id="job-search-container" class="row">\r\n                <div class="col-lg-9 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-12 col-xs-12 remove-padding-xs">\r\n                    <button class="btn btn-success btn-block quick-job-search-btn">Quick Jobs Search</button>\r\n                    <div class="row">\r\n                        <h3>We connect you straight to the employer</h3>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>\r\n<!-- End JOIN -->\r\n\r\n<!-- Quotes Background -->\r\n<div id="quotes-background" class="row">\r\n    <div class="container">\r\n        <div id="quotes-container" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 owl-carousel owl-theme container-fluid remove-padding"></div>\r\n    </div>\r\n</div>\r\n<!-- End Quotes Background -->';});

(function () {
    'use strict';

    define('service/main',[
        'jquery',
        'service/config',
        'service/utilities',
        'service/quotes',
        'text!template/home/main-content-partial-view.html'
    ], function ($, config, utilities, quotes, mainPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $('#home-content-wrapper');

        // private functions
        // go to app url
        function goToAppUrl() {            
            window.location.href = config['baseAppUrl'];
        }

        // set height for quick job search
        function setHeight4QuickJobSearch() {

            // set height
            var doc = $(document);
            var jobSearchWrapper = doc.find('#job-search-wrapper');
            var jobSearchContainer = doc.find('#job-search-container');
            var jobSearchHeight = jobSearchWrapper.height();

            jobSearchContainer.css('margin-top', (jobSearchHeight/2) - 35);

        }

        // main info
        function show() {

            // load main content
            var main = mainPartial.replace('*|base-app-url|*', config.baseAppUrl).replace('*|base-app-url|*', config.baseAppUrl);
            wrapper.empty().append(main);

            // set meta tags
            // utilities.setMetaTags4FB('Home', 'Oil Diversity Global® HR Portal.', 'Welcome to Oil Diversity®');
            utilities.activeNavBar($('a[href$="#!"]').parent('li'));

            // load quotes
            quotes.show();

            // set height
            setHeight4QuickJobSearch();
        }

        // event
        // job seeker login btn
        $(document).on('click', '#job-seeker-login-btn', function(){
            goToAppUrl();
        });

        // client login btn
        $(document).on('click', '#client-login-btn', function(){
            goToAppUrl();
        });

        return {
            show: show
        };

    });

})();

define('text!template/home/sponsor-partial-view.html',[],function () { return '<div class="item"><img src="*|image-url|*" class="img img-responsive center-block" /></div>';});

(function () {
    'use strict';

    define('service/sponsors',[
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'text!template/home/sponsor-partial-view.html',
        'owlCarousel'
    ], function ($, config, model, utilities, sponsorPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        function show() {

            var logos = '';
            var wrapper = $(document).find('#logos-container');
            var companies = model.ModelCompany['info'];
            
            utilities.disableForm(wrapper);

            // get logos            
            $.each(companies, function (index, company) {
                if (company['logoImageId']) {                    
                    logos += sponsorPartial.replace('*|image-url|*', utilities.getCompanyLogoImageId(company['logoImageId']));
                }
            });

            wrapper.empty().append(logos);
            wrapper.owlCarousel(
                {
                    loop: true,
                    nav: false,
                    margin: 10,
                    center: true,
                    autoplay: true,
                    responsiveClass: true,
                    autoplayTimeout: 2000,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 3
                        },
                        1000: {
                            items: 5
                        }
                    }
                }
            );

            utilities.enableForm(wrapper);
        }

        return {
            show: show
        };

    });

})();
(function () {
    'use strict';

    define('service/about.us',[
        'jquery',
        'service/config',
        'service/utilities',
        'service/contents'
    ], function ($, config, utilities, contents) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // show
        function show() {
            contents.getByKey(config['aWebSiteAboutUsContentKey'], 'About Us');
        }

        return {
            show: show
        };

    });

})();
(function () {
    'use strict';

    define('service/logger',['toastr'],
        function (toastr) {
            var logger = {
                init: init,
                log: log,
                logSuccess: logSuccess,
                logWarning: logWarning,
                logError: logError,
                logInfo: logInfo,
                qLog: qLog,
                qLogSuccess: qLogSuccess,
                qLogWarning: qLogWarning,
                qLogError: qLogError,
                qLogInfo: qLogInfo
            };

            init();

            return logger;


            function init() {
                toastr.options = {
                    "newestOnTop": true,
                    "progressBar": true,
                    "timeOut": "3000"
                };
            }
            function qLog(message) {
                logIt(message, null, null);
            }

            function log(message, data, source) {
                logIt(message.message, data, source);
            }

            function logError(message, data, source) {
                logIt(message.message, data, source);

                toastr.error(message.message, message.title);
            }

            function qLogError(message) {
                logIt(message, null, null);

                toastr.error(message);
            }

            function logSuccess(message, data, source) {
                logIt(message.message, data, source);

                toastr.success(message.message, message.title);
            }


            function qLogSuccess(message) {
                logIt(message, null, null);

                toastr.success(message);
            }

            function logWarning(message, data, source) {
                logIt(message.message, data, source);

                toastr.warning(message.message, message.title);
            }


            function qLogWarning(message) {
                logIt(message, null, null);

                toastr.warning(message);
            }

            function logInfo(message, data, source) {
                logIt(message.message, data, source);

                toastr.info(message.message, message.title);
            }

            function qLogInfo(message) {
                logIt(message, null, null);

                toastr.info(message);
            }

            function logIt(message, data, source) {
                source = source ? '[' + source + '] ' : '';

                if (data) {
                    console.log(source, message, data);
                } else {
                    console.log(source, message);
                }
            }
        });
})();


define('text!template/contact-us-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n    <div class="row">\r\n        <h1 id="title-contact-us">Contact Us</h1>\r\n    </div>\r\n    <div class="row">\r\n        <div class="col-lg-offset-4 col-md-offset-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 remove-padding-xs">\r\n            <form id="contact-us-form" class="general-forms-form">\r\n                <div class="row">\r\n                    <input id="name" name="name" placeholder="Name" class="form-control input-box"/>\r\n                </div>\r\n                <div class="row">\r\n                    <input id="email" name="email" placeholder="Email" class="form-control input-box "/>\r\n                </div>\r\n                <div class="row">\r\n                    <input id="company" name="company" placeholder="Company" class="form-control"/>\r\n                </div>\r\n                <div class="row">\r\n                    <input id="job-title" name="jobTitle" placeholder="Job Title" class="form-control"/>\r\n                </div>\r\n                <div class="row">\r\n                    <input id="contact-number" name="contactNumber" placeholder="Contact Number" class="form-control"/>\r\n                </div>\r\n                <div class="row">\r\n                    <textarea id="message" name="message" placeholder="Message" class="form-control textarea-box "/>\r\n                </div>\r\n                <div class="row">\r\n                    <button id="contact-us-send-btn" class="btn btn-block btn-success" type="submit">SEND</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>';});


define('text!template/email/contact-us-partial-view.html',[],function () { return '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <title></title>\r\n    <style>\r\n        body{\r\n            margin: 0 auto;\r\n            font-family: Helvetica,serif;\r\n            padding: 40px;\r\n        }\r\n        a,a:hover,a:active,a:focus{\r\n            color: #6c9d05 !important;\r\n            text-decoration: none !important;\r\n        }\r\n        table{\r\n            min-width: 100%;\r\n            border-collapse: collapse;\r\n        }\r\n        #table-info caption strong{\r\n            background-color: #f5fbe7;\r\n            padding: 10px;\r\n            border-radius: 5px;\r\n            font-size: 14px;\r\n            font-weight: normal;\r\n        }\r\n        #table-info caption span{\r\n            border: none !important;\r\n        }\r\n        #table-info .caption{\r\n            font-weight: normal;\r\n            background-color: #56565a;\r\n            color: #ffffff;\r\n            padding: 15px;\r\n        }\r\n        #table-info td, th {\r\n            border: 1px solid #f9fcf3;\r\n            text-align: left;\r\n            color: #56565a;\r\n            padding: 10px;\r\n        }\r\n        #table-info td{\r\n            white-space:pre;\r\n            color: #80bd01;\r\n        }\r\n        #table-info .standard-color td{\r\n            color: #56565a;\r\n        }\r\n        #table-info .odd {\r\n            background-color: #f9fcf3;\r\n        }\r\n        img{\r\n            max-width:200px;\r\n            padding-bottom:0;\r\n            display:inline!important;\r\n            vertical-align:bottom;\r\n        }\r\n    </style>\r\n</head>\r\n<body>\r\n<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">\r\n    <tbody>\r\n    <tr>\r\n        <td align="center" valign="top">\r\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                <tbody>\r\n\r\n                <!-- logo -->\r\n                <tr>\r\n                    <td valign="top">\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td valign="top" style="padding:30px 15px;">\r\n                                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0">\r\n                                        <tbody>\r\n                                        <tr>\r\n                                            <td valign="top" style="padding: 0 9px;text-align:center">\r\n\r\n                                                <a href="http://oildiversity.com" target="_blank">\r\n                                                    <img align="center" alt="" src="https://ci5.googleusercontent.com/proxy/0b6mCBPZA7A2LDOg2LbG-J9CGcaGzjZJnUO4vb72_ZekHa5zTTjHs2oLu0BY1e3HYcSv4P3iL92YP7cZyK6OLKB6D_H2DoVShk6ZsM1DqEGgt08xrOPXh8uq2ygJVOaoDT4Tng9LAazTkRpa6CdX4S-kLVEFNwqoGX5JH40=s0-d-e1-ft#https://gallery.mailchimp.com/ac897b9a23628041713c7db2d/images/acbd5844-134e-4113-ad48-78cbecdb3ea4.png" width="200">\r\n                                                </a>\r\n\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </td>\r\n                </tr>\r\n                <!-- /logo -->\r\n\r\n                <!-- info -->\r\n                <tr>\r\n                    <td valign="top">\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td valign="top" style="padding:0 15px;">\r\n                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                                        <tbody>\r\n                                        <tr>\r\n                                            <td valign="top" style="padding: 20px;">\r\n\r\n                                                <table id="table-info" border="0" cellpadding="0" cellspacing="0" width="100%">\r\n\r\n                                                    <caption><strong>Date Submitted: *|date-submitted|*</strong></caption>\r\n                                                    <!-- Info -->\r\n                                                    <tr>\r\n                                                        <th class="caption" colspan="2">New Contact Request</th>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Name</th>\r\n                                                        <td>*|name|*</td>\r\n                                                    </tr>\r\n                                                    <tr class="odd">\r\n                                                        <th>Email</th>\r\n                                                        <td>*|email|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Company</th>\r\n                                                        <td>*|company|*</td>\r\n                                                    </tr>\r\n                                                    <tr class="odd">\r\n                                                        <th>Job Title</th>\r\n                                                        <td>*|job-title|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Contact Number</th>\r\n                                                        <td>*|contact-number|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Message:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|message|*</td>\r\n                                                    </tr>\r\n                                                    <!-- /info -->\r\n\r\n                                                </table>\r\n\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </td>\r\n                </tr>\r\n                <!-- /info -->\r\n\r\n                <!-- footer -->\r\n                <tr>\r\n                    <td valign="top">\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td style="padding:20px 35px">\r\n                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #56565a;">\r\n                                        <tbody><tr>\r\n                                            <td>\r\n                                                <span></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td valign="top"  style="padding-top:9px">\r\n                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;color: #656565;text-align: center;" width="100%">\r\n                                        <tbody>\r\n                                        <tr>\r\n                                            <td valign="top" style="padding: 0 18px 9px;">\r\n                                                Copyright © 2016 <span>Oil</span> Diversity Global. All Rights Reserved.<br>\r\n                                                OilDiversityGlobal® is a registered trademark of the <span>Oil</span> Diversity Global Group.\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </td>\r\n                </tr>\r\n                <!-- /footer -->\r\n                </tbody>\r\n            </table>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n</body>\r\n</html>';});

(function () {
    'use strict';

    define('service/contact.us',[
        'jquery',
        'service/config',
        'service/utilities',
        'service/logger',
        'text!template/contact-us-partial-view.html',
        'text!template/email/contact-us-partial-view.html',
        'momentTimezone',
        'moment',
        'mandrill',
        'validate'
    ], function ($, config, utilities, logger, contactUsPartial, emailPartial, moment) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // private functions
        // send mail
        function sendMail(form) {

            var htmlEmail = '';
            var nameInput = $('#name');
            var emailInput = $('#email');
            var messageInput = $('#message');
            var companyInput = $('#company');
            var jobTitleInput = $('#job-title');
            var contactNumberInput = $('#contact-number');
            var dateSubmitted = moment.tz('Asia/Kuala_Lumpur').format('YYYY/MM/DD');
            
            // template mail
            htmlEmail += emailPartial
                .replace('*|date-submitted|*', dateSubmitted)
                .replace('*|name|*', nameInput.val())
                .replace('*|email|*', emailInput.val())
                .replace('*|company|*', companyInput.val())
                .replace('*|job-title|*', jobTitleInput.val())
                .replace('*|contact-number|*', contactNumberInput.val())
                .replace('*|message|*', messageInput.val());

            // send mail
            var mandrill_client = new mandrill.Mandrill(config['keyMandrill']);
            var message = {
                    html: htmlEmail,

                    text: 'Name: ' + nameInput.val() +
                    ' | EMail: ' + emailInput.val() +
                    ' | Company: ' + companyInput.val() +
                    ' | Job Title: ' + jobTitleInput.val() +
                    ' | Contact Number: ' + contactNumberInput.val() +
                    ' | Message: ' + messageInput.val(),

                    subject: 'New Contact Request',
                    from_email: 'no-reply@oildiversity.com',
                    from_name: 'Landing Page: Contact Us',
                    to: [{
                        email: config['sendEmailTo'],
                        name: 'Oil Diversity',
                        type: 'to'
                    }],
                    headers: {
                        'Reply-To': 'no-reply@oildiversity.com'
                    },
                    important: !1,
                    track_opens: null,
                    track_clicks: null,
                    auto_text: null,
                    auto_html: null,
                    inline_css: null,
                    url_strip_qs: null,
                    preserve_recipients: null,
                    view_content_link: null,
                    bcc_address: null,
                    tracking_domain: null,
                    signing_domain: null,
                    return_path_domain: null,
                    merge: !0,
                    tags: ['contact-us'],
                    metadata: {
                        website: 'www.oildiversity.com'
                    }
                },
                async = !1,
                ip_pool = 'Main Pool';

            mandrill_client.messages.send({
                message: message,
                async: async,
                ip_pool: ip_pool,
                send_at: new Date
            }, function () {

                logger.qLogSuccess('Your Contact Request has been sent successfully.');

                // empty controls
                nameInput.val('');
                emailInput.val('');
                messageInput.val('');
                companyInput.val('');
                jobTitleInput.val('');
                contactNumberInput.val('');

                utilities.enableForm(form);

            }, function (error) {

                logger.qLogError('A mandrill error occurred: ' + error.name + ' - ' + error.message);
                utilities.enableForm(form);

            });

        }

        // show
        function show() {

            // set meta tags
            // utilities.setMetaTags4FB('Contact Us', 'Contact Us', '');

            wrapper.empty().append(contactUsPartial);

            var form = '#contact-us-form';
            $(form)
                .validate({
                    rules: {
                        name: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        company: {
                            required: true
                        },
                        jobTitle: {
                            required: true
                        },
                        contactNumber: {
                            required: true
                        },
                        message: {
                            required: true
                        }
                    },
                    submitHandler: function() {

                        utilities.disableForm(form);
                        sendMail(form);
                    }
                });
        }

        return {
            show: show
        };

    });

})();

define('text!template/sign-up-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n    <h1>Sign Up</h1>\r\n    <div class="row">\r\n        <div class="table-responsive">\r\n            <table id="table-sign-up" class="table table-striped">\r\n                <tbody>\r\n                    <tr class="gray-row">\r\n                        <!--<th scope="row">-->\r\n                        <!--</th>-->\r\n                        <td class="title-row" rowspan="2">\r\n                            <div id="image-container">\r\n                                <img src="https://cdn.oildiversity.com/app/images/logo/logo-solo.svg" class="img-responsive logo-solo">\r\n                                <img src="https://cdn.oildiversity.com/app/images/logo/logo-type-horizontal.svg" class="img-responsive logo-type-horizontal">\r\n                                <span>Services & Corporate</span>\r\n                            </div>\r\n                        </td>\r\n                        <th>PLATINUM PACKAGE</th>\r\n                        <th>GOLD PACKAGE</th>\r\n                        <th>SILVER PACKAGE</th>\r\n                        <!--<th>BRONZE</th>-->\r\n                    </tr>\r\n\r\n                    <tr class="green-row">\r\n                        <th>(Price on Request)</th>\r\n                        <th>(Price on Request)</th>\r\n                        <th>(Price on Request)</th>\r\n                        <!--<th>(Price on Request)</th>-->\r\n                    </tr>\r\n                    <tr scope="row">\r\n                        <th scope="row">COMPANY TYPE</th>\r\n                        <td>\r\n                            <b>\r\n                                OILFIELD,NATIONAL<br />\r\n                                AND MULTI-NATIONAL OIL COMPANIES\r\n                            </b>\r\n                        </td>\r\n                        <td>\r\n                            <b> SME’S </b><br />\r\n                            companies with < 100 personnel<br />  with an annual turnover <br /> of less than 50 million USD per annum.\r\n                        </td>\r\n                        <td>\r\n                            <b> BUSINESS START UPS </b><br />\r\n                            Companies within their<br /> 1st year in business.\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">COMMUNITY NETWORK</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">EMPLOYEE INTERNATIONALISATION PROGRAMME</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">GRADUATE RECRUITMENT</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">MENTORING PROGRAMME</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">REDUNDANCY/SHARED WORKFORCE RESOURCE</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">BUSINESS COLLABORATION</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">RIG/VESSEL AVAILABILITY</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">ACCESS & PARTICIPATION WITH INDUSTRY STATISTICS</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">LOGO FEATURE – WEBSITE, PROMOTIONAL MEDIA & LITERATURE</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">PARTICIPATION TO ALL ODG INDUSTRY EVENTS</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">INDUSTRY AWARDS</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">GLOBAL RECRUITMENT</th>\r\n                        <td>Unlimited</td>\r\n                        <td>\r\n                            Unlimited Adverts<br />\r\n                            \r\n                        </td>\r\n                        <td>\r\n                            200 Adverts<br />\r\n                            \r\n                        </td>\r\n                        <!--<td>\r\n            100 Adverts<br/>\r\n            2 x Users<br/>\r\n            Unlimited Search\r\n        </td>-->\r\n                    </tr>\r\n                 \r\n                    <tr>\r\n                        <th scope="row">BANNER ADVERTISING ON WEBSITE</th>\r\n                        <td>2 x Month</td>\r\n                        <td>1 x Month</td>\r\n                        <td>1 x Month</td>\r\n                        <!--<td></td>-->\r\n                    </tr>\r\n                    <!--<tr>\r\n                        <th scope="row">HR DOCUMENT LIBRARY</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td><i class="fa fa-check"></i></td>-->\r\n                        <!--<td><i class="fa fa-check"></i></td>-->\r\n                    <!--</tr>-->\r\n                    <tr>\r\n                        <th scope="row">\r\n                            USERS<br />\r\n                            <small>\r\n                                National<br />\r\n                                Regional<br />\r\n                                Global<br />\r\n                            </small>\r\n                        </th>\r\n                        <td>5<br/>10<br/>15<br/></td>\r\n                        <td>2<br/>5<br/>10<br/></td>\r\n                        <td>2<br/>5<br/><br/></td>\r\n                    </tr>\r\n                    <!--<tr>\r\n                        <th scope="row">\r\n                            TRAINING<br />\r\n                            <small>\r\n                                Leadership<br />\r\n                                Change Management<br />\r\n                                Diversity and Inclusion\r\n                            </small>\r\n                        </th>\r\n                        <td></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                    </tr>-->\r\n                    <!--<tr>\r\n                        <th scope="row">CONTINUED SUPPORT THROUGH TRAINING IMPLEMENTATION</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                    </tr>-->\r\n                    <tr>\r\n                        <th scope="row">NOMINATED JUDGING REPRESENTATIVES FOR AWARDS</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                        <!--<td></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">SPONSORSHIP OF AN AWARD</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                        <!--<td></td>-->\r\n                    </tr>\r\n                    <tr>\r\n                        <th scope="row">ODG COLLABORATIVE PANNEL</th>\r\n                        <td><i class="fa fa-check"></i></td>\r\n                        <td></td>\r\n                        <td></td>\r\n                        <!--<td></td>-->\r\n                    </tr>\r\n                    <tr id="button-wrapper">\r\n                        <th></th>\r\n                        <td>\r\n                            <a href="*|base-app-url|*#/signup?l=en&pc=platinumPlan">Sign Up</a>\r\n                        </td>\r\n                        <td>\r\n                            <a href="*|base-app-url|*#/signup?l=en&pc=goldPlan">Sign Up</a>\r\n                        </td>\r\n                        <td>\r\n                            <a href="*|base-app-url|*#/signup?l=en&pc=silverPlan">Sign Up</a>\r\n                        </td>\r\n                        <!--<td>\r\n            <a href="*|base-app-url|*#/signup?l=en&pc=bronzePlan">Sign Up</a>\r\n        </td>-->\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>';});


define('text!template/services-partial-view.html',[],function () { return '<div class="row">\r\n    <div class="table-responsive">\r\n        <table id="table-green" class="table table-striped">\r\n            <thead class="green-row">\r\n            <tr>\r\n                <th>SERVICES</th>\r\n                <th>DESCRIPTION</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr>\r\n                <td>COMMUNITY NETWORK</td>\r\n                <td>Function allowing partners to promote their business and services to all other affiliated partners, search for Suppliers, Products, and Services.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>GRADUATE SHARE SCHEME</td>\r\n                <td>An inter-company initiative to encourage companies to multi train their graduate candidates and encourage business collaboration.  This gives graduates the chance to gain International exposure and multi-discipline training.  These journeys will be followed through our website and magazine to promote the advantages of Business Collaboration.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>GRADUATE RECRUITMENT</td>\r\n                <td>Advertise all your yearly graduate campaigns</td>\r\n            </tr>\r\n            <tr>\r\n                <td>MENTORING PROGRAMME</td>\r\n                <td>Join our Global mentoring platform, fast track your personnel with first class mentoring from Internationally recognised leaders in the industry around the globe.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>REDUNDANCY PORTAL</td>\r\n                <td>A Business Collaboration initiative to assist personnel or contractors whom are to be made redundant, or; coming to the end of their contract to be viewed, verified, and recruited by all partners.\r\n                    This is a new initiative to reduce partners costs, encourage business collaboration and keep our highly skilled personnel in the workforce.\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>BUSINESS COLLABORATION</td>\r\n                <td>Partners can list any tender, non-tender requirement(s), procure suppliers, equipment, products, services and know how within the\r\n                    Oil Diversity community.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>RIG/VESSEL AVAILABILITY</td>\r\n                <td>View all Rig/Vessel specifications and availability around the world.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>ACCESS & PARTICIPATION WITH INDUSTRY STATISTICS</td>\r\n                <td>Active participation in all Global Industry Statistics and access to all statistics on-line.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>LOGO FEATURE – WEBSITE, PROMOTIONAL MEDIA & LITERATURE</td>\r\n                <td>All participating Partners logos will be featured on the Oil Diversity Global website and all our promotional media and literature associated\r\n                    with supporting Diversity & Inclusion within the Oil & Energy Industry.  Premier affiliated companies will also be contacted monthly for all\r\n                    D&I, Business Collaboration, New Employees/On the Move and PR for print online and in our Quarterly magazines.  Please note we will\r\n                    also add a click through to your website from the logo to a page of your choosing.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>INDUSTRY AWARDS</td>\r\n                <td>Entry of all employees into all Oil Diversity Global Quarterly Awards and associated press. (Sponsorship included in some packages which\r\n                    gives a company dedicated sponsorship of an industry award of their choice throughout the year).</td>\r\n            </tr>\r\n            <tr>\r\n                <td>GLOBAL RECRUITMENT</td>\r\n                <td>Post vacancies, search candidates and manage applications in our online management system. All positions advertised across our Global social media & press.  Also marketed directly to relevant candidates.\r\n\r\n\r\n                    (Please note to maintain the integrity of the site and attract top quality personnel this site will only be open to affiliated partners\r\n                    and will not be accessible to any recruitment Companies or 3rd parties).\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>QUARTERLY MAGAZINE</td>\r\n                <td>Access to Advertising in our Quarterly Magazine.  Magazine is currently distributed to 3000 companies Globally and is growing monthly.\r\n                    Please see attached partnership tiers for more information.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>BANNER ADVERTISING ON WEBSITE</td>\r\n                <td>Have a Banner Advertisement on our website to promote your company, promotions, and campaigns.  These can be changed monthly.\r\n                    Please see attached partnership tiers for more information.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>HR DOCUMENT LIBRARY</td>\r\n                <td>Access a full Global library of Diversity & Inclusion, Change Management and Leadership strategy documents and processes.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>\r\n                    TRAINING<br/>\r\n                    <small>\r\n                        Leadership<br/>\r\n                        Change Management<br/>\r\n                        Diversity and Inclusion\r\n                    </small>\r\n                </td>\r\n                <td>One of our dedicated Oil Diversity Global Consultants will evaluate where your company is currently at regarding Leadership, Change\r\n                    Management and Diversity & Inclusion strategy.  They will then work with your management team to assess what you would like to achieve\r\n                    and help you train your personnel and implement processes and strategy in line with your company strategy.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>SUPPORT THROUGH STRATEGY IMPLEMENTATION</td>\r\n                <td>We will offer telephone support and guidance through the process and strategy implementation phase of your company.\r\n                    (Partnership Tier dependent)</td>\r\n            </tr>\r\n            <tr>\r\n                <td>NOMINATED JUDGING REPRESENTATIVES FOR AWARDS</td>\r\n                <td>Nominated judging representatives for all Oil Diversity Global Awards.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>SPONSORSHIP OF AN AWARD</td>\r\n                <td>Full sponsorship of an award of your choice throughout the year.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>PARTICIPATION TO ALL ODG INDUSTRY EVENTS</td>\r\n                <td>Oil Diversity Global will be organising events around the world for both affiliated and non-affiliated companies discussing Diversity & Inclusion,\r\n                    Change Management & Leadership and Business Collaboration.  We will be asking our Partners for representation, speakers and\r\n                    collaboration at these events.</td>\r\n            </tr>\r\n            <tr>\r\n                <td>ODG COLLABORATIVE PANNEL</td>\r\n                <td>ODG will be forming its own non-typical ‘non-executive’ board.  This will consist of representation from our Platinum sponsors and we will\r\n                    discuss regularly new initiatives, products, and services we can continue to add to the site to ensure the most cost effective, efficient system\r\n                    for all our users.\r\n\r\n                    We will also be looking at ‘best practice’ for Business Collaboration and bringing our partners together.</td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>';});

(function () {
    'use strict';

    define('service/sign.up',[
        'jquery',
        'service/config',
        'text!template/sign-up-partial-view.html',
        'text!template/services-partial-view.html'
    ], function ($, config, signUpPartial, servicesPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // show
        function show() {
            wrapper.empty().append(signUpPartial.replaceAll('*|base-app-url|*', config['baseAppUrl']));

            // var partialWrapper = $(document).find('#partial-wrapper');
            // partialWrapper.append(servicesPartial);
        }

        return {
            show: show
        };

    });

})();

define('text!template/company-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n\r\n    <div class="row"><h1>*|title|*</h1></div>\r\n    <div id="companies-wrapper" class="row"></div>\r\n\r\n</div>';});


define('text!template/list/tile-partial-view.html',[],function () { return '<div class="row well text-left">\r\n\r\n    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12 remove-padding">\r\n        <img src="*|image-url|*" alt="" class="img img-responsive img-thumbnail center-block" />\r\n        <div class="spacer hidden-lg hidden-md"></div>\r\n    </div>\r\n\r\n    <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 remove-padding-right remove-padding-xs">\r\n\r\n        <div class="row">\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <h3 class="remove-margin">*|title|*</h3>\r\n            </div>\r\n        </div>\r\n\r\n        <div class="row *|description-hidden|*">\r\n\r\n            <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 remove-padding">\r\n                <p class="small remove-margin">*|short-description|*</p>\r\n            </div>\r\n\r\n            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 remove-padding">\r\n                <a href="#!/show/?key=*|key|*&t=*|encode-title|*" class="btn btn-default btn-xs pull-right">\r\n                    <span>Read More</span>&nbsp;<i class="fa fa-arrow-circle-o-right"></i>\r\n                </a>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class="col-md-12 col-xs-12 col-sm-12 remove-padding *|inner-hidden|*">\r\n        <div class="spacer"></div>\r\n        *|inner-tile|*\r\n    </div>\r\n</div>';});


define('text!template/list/inner-tile-partial-view.html',[],function () { return '<div class="row inner-tile">\r\n\r\n    <div class="col-md-12 remove-padding">\r\n        <div class="small pull-right">\r\n            <span>Intake Date: </span><code>*|date-of-intake|*</code>\r\n        </div>\r\n        <span>*|title|*</span>\r\n    </div>\r\n    <div class="col-md-12 remove-padding"><span class="small">*|position|*</span></div>\r\n\r\n</div>';});

(function () {
    'use strict';

    define('service/graduate.recruitment',[
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'service/contents',
        'text!template/company-partial-view.html',
        'text!template/list/tile-partial-view.html',
        'text!template/list/inner-tile-partial-view.html'
    ], function ($, config, model, utilities, contents, companyPartial, tileListPartial, innerTileListPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // show
        function show() {
            
            var title = 'Graduate Recruitment';

            // partial
            wrapper.empty().append(companyPartial.replace('*|title|*', title));

            // companies
            var partial = '';
            var companies = model.ModelCompany['info'];
            var companiesWrapper = $('#companies-wrapper');
            var isEmpty = true;

            if(companies.length > 0){

                $.each(companies, function (index, company) {

                    var graduate = company['graduateRecruitmentPublicInfos'];

                    if (graduate && graduate.length > 0) {

                        isEmpty = false;

                        var graduatesRecruitment = '';
                        $.each(graduate, function (index, graduateRecruitment) {

                            var position = graduateRecruitment['availablePositions'];
                            graduatesRecruitment += innerTileListPartial
                                .replace('*|date-of-intake|*', utilities.getTimeAgo(graduateRecruitment['dateOfIntake']))
                                .replace('*|title|*', graduateRecruitment['campaignTitle'])
                                .replace('*|position|*', position ? position : '');

                        });

                        partial += tileListPartial
                            .replace('*|image-url|*', utilities.getCompanyLogoImageId(company['logoImageId']))
                            .replace('*|title|*', company['companyName'])
                            .replace('*|description-hidden|*', 'hidden')
                            .replace('*|inner-hidden|*', '')
                            .replace('*|inner-tile|*', graduatesRecruitment);

                    }
                });

                if(isEmpty === false){
                    $(partial).hide().appendTo(companiesWrapper.empty()).fadeIn('slow');
                }
                else{
                    contents.getByKey(config['aWebSiteGraduateSchemesContentKey'], title);
                }

            }
            else{
                contents.getByKey(config['aWebSiteGraduateSchemesContentKey'], title);
            }

            utilities.enableForm(wrapper);

        }

        return {
            show: show
        };

    });

})();

define('text!template/quarterly-awards-nomination-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n    <h1>Oil Diversity Global Quarterly Awards Nomination Form</h1>\r\n    <small id="nomination-description-wrapper">*|description|*</small>\r\n    <div class="spacer"></div>\r\n    <form id="quarterly-awards-nomination-form" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n\r\n        <!-- Choose The Award -->\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n\r\n            <div class="title-bar">Choose The Award</div>\r\n\r\n            <div class="radio">\r\n                <label><input type="radio" name="award" value="Women of the Quarter" />Women of the Quarter</label>\r\n            </div>\r\n            <div class="radio">\r\n                <label><input type="radio" name="award" value="Graduate of the Quarter" />Graduate of the Quarter</label>\r\n            </div>\r\n            <div class="radio">\r\n                <label><input type="radio" name="award" value="Indigenous Employee of the Quarter" />Indigenous Employee of the Quarter</label>\r\n            </div>\r\n            <div class="radio">\r\n                <label><input type="radio" name="award" value="Rising Superstar of the Quarter" />Rising Superstar of the Quarter</label>\r\n            </div>\r\n            <div class="radio">\r\n                <label><input type="radio" name="award" value="Oil Industry Veteran" />Oil Industry Veteran</label>\r\n            </div>\r\n\r\n        </div>\r\n        <!-- End Choose The Award -->\r\n\r\n        <!-- Nominee Information -->\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n\r\n            <div class="title-bar">Nominee Information</div>\r\n\r\n            <!-- Nominee’s Name End-->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Nominee’s Name</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="firstNameNominee" placeholder="First Name" class="form-control"/>\r\n                    </div>\r\n                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="lastNameNominee" placeholder="Last Name" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Nominee’s Name -->\r\n\r\n            <!-- Current Position held within Company -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Current Position held within Company</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="currentPosition" placeholder="Current Position" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Current Position held within Company-->\r\n\r\n            <!-- Length of Employment with current Company -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Length of Employment with current Company</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="from" placeholder="From" class="form-control"/>\r\n                    </div>\r\n                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="to" placeholder="To" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Length of Employment with current Company -->\r\n\r\n            <!-- Nominee’s Contact Number -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Nominee’s Contact Number</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="areaCodeNominee" placeholder="Area Code" class="form-control"/>\r\n                    </div>\r\n                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="phoneNumberNominee" placeholder="Phone Number" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Nominee’s Contact Number -->\r\n\r\n            <!-- Nominee’s Email Address -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Nominee’s Email Address</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="emailNominee" placeholder="Email" class="form-control "/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Nominee’s Email Address -->\r\n\r\n        </div>\r\n        <!-- End Nominee Information -->\r\n\r\n        <!-- Nominator’s Details -->\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n\r\n            <div class="spacer"></div>\r\n            <div class="title-bar">Nominator’s Details</div>\r\n\r\n            <!-- Your (Nominator’s) Name -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Your (Nominator’s) Name</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="firstNameNominator" placeholder="First Name" class="form-control"/>\r\n                    </div>\r\n                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="lastNameNominator" placeholder="Last Name" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Your (Nominator’s) Name -->\r\n\r\n            <!-- Company Name -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Company Name</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="companyName" placeholder="Company Name" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Company Name-->\r\n\r\n            <!-- Address -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Address</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                        <textarea name="address" placeholder="Address" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Address -->\r\n\r\n            <!-- Nominator’s Contact Number -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Nominator’s Contact Number</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="areaCodeNominator" placeholder="Area Code" class="form-control"/>\r\n                    </div>\r\n                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="phoneNumberNominator" placeholder="Phone Number" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Nominator’s Contact Number -->\r\n\r\n            <!-- Nominator’s Email Address -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Nominator’s Email Address</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                        <input name="emailNominator" placeholder="Email" class="form-control"/>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- End Nominator’s Email Address -->\r\n\r\n        </div>\r\n        <!-- End Nominator’s Details  -->\r\n\r\n        <!-- Nomination Form -->\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n\r\n            <div class="spacer"></div>\r\n            <div class="title-bar">Nomination Form</div>\r\n\r\n            <!-- Personal Criteria -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Personal Criteria</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="personalCriteria" placeholder="Describe the nominee’s personal achievements and background" class="form-control large-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Personal Criteria -->\r\n\r\n            <!-- Professional Criteria -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Professional Criteria</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="professionalCriteria" placeholder="Describe the Nominees most significant contributions to your organisation" class="form-control large-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Professional Criteria -->\r\n\r\n            <!-- Leadership & Integrity -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Leadership & Integrity</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="leadershipAndIntegrity" placeholder="Describe how the nominee leads with high professional standards, ethics and integrity" class="form-control large-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Leadership & Integrity -->\r\n\r\n            <!-- Innovation -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Innovation</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="innovation" placeholder="Describe the nominee’s most significant innovations." class="form-control large-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Innovation -->\r\n\r\n            <!-- Results -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Results</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="results" placeholder="Describe the nominee’s most significant results for the organisation." class="form-control large-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Results -->\r\n\r\n            <!-- Impact -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Impact</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="impact" placeholder="Describe the nominee’s impact on your organisation" class="form-control large-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Impact -->\r\n\r\n            <!-- Any other Information you would like to include about your Nominee -->\r\n            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Any other Information you would like to include about your Nominee</label>\r\n                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n                    <textarea name="additionalInformation" placeholder="Please provide any additional information" class="form-control extra-textarea-box"/>\r\n                </div>\r\n            </div>\r\n            <!-- End Any other Information you would like to include about your Nominee -->\r\n\r\n        </div>\r\n        <!-- End Nomination Form  -->\r\n\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding">\r\n            <button id="contact-us-send-btn" class="btn btn-block btn-success" type="submit">SEND</button>\r\n        </div>\r\n    </form>\r\n</div>';});


define('text!template/email/quarterly-awards-nomination-partial-view.html',[],function () { return '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <title></title>\r\n    <style>\r\n        body{\r\n            margin: 0 auto;\r\n            font-family: Helvetica,serif;\r\n            padding: 40px;\r\n        }\r\n        a,a:hover,a:active,a:focus{\r\n            color: #6c9d05 !important;\r\n            text-decoration: none !important;\r\n        }\r\n        table{\r\n            min-width: 100%;\r\n            border-collapse: collapse;\r\n        }\r\n        #table-info caption strong{\r\n            background-color: #f5fbe7;\r\n            padding: 10px;\r\n            border-radius: 5px;\r\n            font-size: 14px;\r\n            font-weight: normal;\r\n        }\r\n        #table-info caption span{\r\n            border: none !important;\r\n        }\r\n        #table-info .caption{\r\n            font-weight: normal;\r\n            background-color: #56565a;\r\n            color: #ffffff;\r\n            padding: 15px;\r\n        }\r\n        #table-info td, th {\r\n            border: 1px solid #f9fcf3;\r\n            text-align: left;\r\n            color: #56565a;\r\n            padding: 10px;\r\n        }\r\n        #table-info td{\r\n            white-space:pre;\r\n            color: #80bd01;\r\n        }\r\n        #table-info .standard-color td{\r\n            color: #56565a;\r\n        }\r\n        #table-info .odd {\r\n            background-color: #f9fcf3;\r\n        }\r\n        img{\r\n            max-width:200px;\r\n            padding-bottom:0;\r\n            display:inline!important;\r\n            vertical-align:bottom;\r\n        }\r\n    </style>\r\n</head>\r\n<body>\r\n<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">\r\n    <tbody>\r\n    <tr>\r\n        <td align="center" valign="top">\r\n            <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                <tbody>\r\n\r\n                <!-- logo -->\r\n                <tr>\r\n                    <td valign="top">\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td valign="top" style="padding:30px 15px;">\r\n                                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0">\r\n                                        <tbody>\r\n                                        <tr>\r\n                                            <td valign="top" style="padding: 0 9px;text-align:center">\r\n\r\n                                                <a href="http://oildiversity.com" target="_blank">\r\n                                                    <img align="center" alt="" src="https://ci5.googleusercontent.com/proxy/0b6mCBPZA7A2LDOg2LbG-J9CGcaGzjZJnUO4vb72_ZekHa5zTTjHs2oLu0BY1e3HYcSv4P3iL92YP7cZyK6OLKB6D_H2DoVShk6ZsM1DqEGgt08xrOPXh8uq2ygJVOaoDT4Tng9LAazTkRpa6CdX4S-kLVEFNwqoGX5JH40=s0-d-e1-ft#https://gallery.mailchimp.com/ac897b9a23628041713c7db2d/images/acbd5844-134e-4113-ad48-78cbecdb3ea4.png" width="200">\r\n                                                </a>\r\n\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </td>\r\n                </tr>\r\n                <!-- /logo -->\r\n\r\n                <!-- info -->\r\n                <tr>\r\n                    <td valign="top">\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td valign="top" style="padding:0 15px;">\r\n                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                                        <tbody>\r\n                                        <tr>\r\n                                            <td valign="top" style="padding: 20px;">\r\n\r\n                                                <table id="table-info" border="0" cellpadding="0" cellspacing="0" width="100%">\r\n\r\n                                                    <caption><strong>Date Submitted: *|date-submitted|*</strong></caption>\r\n                                                    <!-- Award -->\r\n                                                    <tr>\r\n                                                        <th class="caption" colspan="2">Award</th>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <td colspan="2">*|award|*</td>\r\n                                                    </tr>\r\n                                                    <!-- /Award -->\r\n\r\n                                                    <!-- Nominee Information -->\r\n                                                    <tr>\r\n                                                        <th class="caption" colspan="2">Nominee Information</th>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Nominee’s Name</th>\r\n                                                        <td>*|nominees-name|*</td>\r\n                                                    </tr>\r\n                                                    <tr class="odd">\r\n                                                        <th>Current Position held within Company</th>\r\n                                                        <td>*|current-position|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Length of Employment with current Company</th>\r\n                                                        <td>*|from|* - *|to|*</td>\r\n                                                    </tr>\r\n                                                    <tr class="odd">\r\n                                                        <th>Nominee’s Contact Number</th>\r\n                                                        <td>(*|nominees-area-code|*) *|nominees-phone-number|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Nominee’s Email Address</th>\r\n                                                        <td>*|nominees-email|*</td>\r\n                                                    </tr>\r\n                                                    <!-- /Nominee Information -->\r\n\r\n                                                    <!-- Nominator’s Details -->\r\n                                                    <tr>\r\n                                                        <th class="caption" colspan="2">Nominator’s Details</th>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Your (Nominator’s) Name</th>\r\n                                                        <td>*|nominators-name|*</td>\r\n                                                    </tr>\r\n                                                    <tr class="odd">\r\n                                                        <th>Company Name</th>\r\n                                                        <td>*|company-name|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Address</th>\r\n                                                        <td>*|address|*</td>\r\n                                                    </tr>\r\n                                                    <tr class="odd">\r\n                                                        <th>Nominator’s Contact Number</th>\r\n                                                        <td>(*|nominators-area-code|*) *|nominators-phone-number|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th>Nominator’s Email Address</th>\r\n                                                        <td>*|nominators-email|*</td>\r\n                                                    </tr>\r\n                                                    <!-- /Nominator’s Details -->\r\n\r\n                                                    <!-- Nomination Form -->\r\n                                                    <tr>\r\n                                                        <th class="caption" colspan="2">Nomination Form</th>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Personal Criteria:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|personal-criteria|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Professional Criteria:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|professional-criteria|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Leadership & Integrity:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|leadership-integrity|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Innovation:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|innovation|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Results:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|results|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Impact:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|impact|*</td>\r\n                                                    </tr>\r\n                                                    <tr>\r\n                                                        <th colspan="2">Any other Information you would like to include about your Nominee:</th>\r\n                                                    </tr>\r\n                                                    <tr class="odd standard-color">\r\n                                                        <td colspan="2">*|other-information|*</td>\r\n                                                    </tr>\r\n                                                    <!-- /Nomination Form -->\r\n\r\n                                                </table>\r\n\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </td>\r\n                </tr>\r\n                <!-- /info -->\r\n\r\n                <!-- footer -->\r\n                <tr>\r\n                    <td valign="top">\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td style="padding:20px 35px">\r\n                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 2px solid #56565a;">\r\n                                        <tbody><tr>\r\n                                            <td>\r\n                                                <span></span>\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\r\n                            <tbody>\r\n                            <tr>\r\n                                <td valign="top"  style="padding-top:9px">\r\n                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;color: #656565;text-align: center;" width="100%">\r\n                                        <tbody>\r\n                                        <tr>\r\n                                            <td valign="top" style="padding: 0 18px 9px;">\r\n                                                Copyright © 2016 <span>Oil</span> Diversity Global. All Rights Reserved.<br>\r\n                                                OilDiversityGlobal® is a registered trademark of the <span>Oil</span> Diversity Global Group.\r\n                                            </td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </td>\r\n                </tr>\r\n                <!-- /footer -->\r\n                </tbody>\r\n            </table>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n</body>\r\n</html>';});

(function () {
    'use strict';

    define('service/quarterly.awards.nomination',[
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'service/contents',
        'service/logger',
        'text!template/quarterly-awards-nomination-partial-view.html',
        'text!template/email/quarterly-awards-nomination-partial-view.html',
        'momentTimezone',
        'moment',
        'mandrill',
        'validate'
    ], function ($, config, model, utilities, contents, logger, nominationPartial, emailPartial, moment) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // private functions
        // send mail
        function sendMail(form) {

            var htmlEmail = '';
            var awardRadio = $('input:radio[name="award"]:checked');
            var firstNameNomineeInput = $('input[name="firstNameNominee"]');
            var lastNameNomineeInput = $('input[name="lastNameNominee"]');
            var currentPositionInput = $('input[name="currentPosition"]');
            var fromInput = $('input[name="from"]');
            var toInput = $('input[name="to"]');
            var areaCodeNomineeInput = $('input[name="areaCodeNominee"]');
            var phoneNumberNomineeInput = $('input[name="phoneNumberNominee"]');
            var emailNomineeInput = $('input[name="emailNominee"]');
            var firstNameNominatorInput = $('input[name="firstNameNominator"]');
            var lastNameNominatorInput = $('input[name="lastNameNominator"]');
            var companyNameInput = $('input[name="companyName"]');
            var addressInput = $('textarea[name="address"]');
            var areaCodeNominatorInput = $('input[name="areaCodeNominator"]');
            var phoneNumberNominatorInput = $('input[name="phoneNumberNominator"]');
            var emailNominatorInput = $('input[name="emailNominator"]');
            var personalCriteriaInput = $('textarea[name="personalCriteria"]');
            var professionalCriteriaInput = $('textarea[name="professionalCriteria"]');
            var leadershipAndIntegrityInput = $('textarea[name="leadershipAndIntegrity"]');
            var innovationInput = $('textarea[name="innovation"]');
            var resultsInput = $('textarea[name="results"]');
            var impactInput = $('textarea[name="impact"]');
            var additionalInformationInput = $('textarea[name="additionalInformation"]');

            var award = awardRadio.length ? awardRadio.val() : '-';
            var nameNominee = firstNameNomineeInput.val() + ' ' + lastNameNomineeInput.val();
            var currentPosition = currentPositionInput.val().length ? currentPositionInput.val() : '-';
            var from = fromInput.val().length ? fromInput.val() : '-';
            var to = toInput.val().length ? toInput.val() : '-';
            var areaCodeNominee = areaCodeNomineeInput.val().length ? areaCodeNomineeInput.val() : '-';
            var phoneNumberNominee = phoneNumberNomineeInput.val().length ? phoneNumberNomineeInput.val() : '-';
            var emailNominee = emailNomineeInput.val().length ? emailNomineeInput.val() : '-';
            var nameNominator = firstNameNominatorInput.val() + ' ' + lastNameNominatorInput.val();
            var companyName = companyNameInput.val().length ? companyNameInput.val() : '-';
            var address = addressInput.val().length ? addressInput.val() : '-';
            var areaCodeNominator = areaCodeNominatorInput.val().length ? areaCodeNominatorInput.val() : '-';
            var phoneNumberNominator = phoneNumberNominatorInput.val().length ? phoneNumberNominatorInput.val() : '-';
            var emailNominator = emailNominatorInput.val().length ? emailNominatorInput.val() : '-';
            var personalCriteria = personalCriteriaInput.val().length ? personalCriteriaInput.val() : '-';
            var professionalCriteria = professionalCriteriaInput.val().length ? professionalCriteriaInput.val() : '-';
            var leadershipAndIntegrity = leadershipAndIntegrityInput.val().length ? leadershipAndIntegrityInput.val() : '-';
            var innovation = innovationInput.val().length ? innovationInput.val() : '-';
            var results = resultsInput.val().length ? resultsInput.val() : '-';
            var impact = impactInput.val().length ? impactInput.val() : '-';
            var additionalInformation = additionalInformationInput.val().length ? additionalInformationInput.val() : '-';
            var dateSubmitted = moment.tz('Asia/Kuala_Lumpur').format('YYYY/MM/DD');

            // template mail
            htmlEmail += emailPartial
                .replace('*|date-submitted|*', dateSubmitted)
                .replace('*|award|*', award)
                .replace('*|nominees-name|*', nameNominee)
                .replace('*|current-position|*', currentPosition)
                .replace('*|from|*', from)
                .replace('*|to|*', to)
                .replace('*|nominees-area-code|*', areaCodeNominee)
                .replace('*|nominees-phone-number|*', phoneNumberNominee)
                .replace('*|nominees-email|*', emailNominee)
                .replace('*|nominators-name|*', nameNominator)
                .replace('*|company-name|*', companyName)
                .replace('*|address|*', address)
                .replace('*|nominators-area-code|*', areaCodeNominator)
                .replace('*|nominators-phone-number|*', phoneNumberNominator)
                .replace('*|nominators-email|*', emailNominator)
                .replace('*|personal-criteria|*', personalCriteria)
                .replace('*|professional-criteria|*', professionalCriteria)
                .replace('*|leadership-integrity|*', leadershipAndIntegrity)
                .replace('*|innovation|*', innovation)
                .replace('*|results|*', results)
                .replace('*|impact|*', impact)
                .replace('*|other-information|*', additionalInformation);

            // send mail
            var mandrill_client = new mandrill.Mandrill(config['keyMandrill']);
            var message = {
                    html: htmlEmail,
                    text: 'Award: ' + award +
                    ' | Nominee’s Name: ' + nameNominee +
                    ' | Current Position held within Company: ' + currentPosition +
                    ' | Length of Employment with current Company: | From: ' + from + ' | To: ' + to +
                    ' | Nominee’s Contact Number: | Area Code: ' + areaCodeNominee + ' | Phone Number : ' + phoneNumberNominee +
                    ' | Nominee’s Email Address: ' + emailNominee +
                    ' | Your (Nominator’s) Name: ' + nameNominator +
                    ' | Company Name: ' + companyName +
                    ' | Address: ' + address +
                    ' | Nominator’s Contact Number: | Area Code: ' + areaCodeNominator + ' | Phone Number : ' + phoneNumberNominator +
                    ' | Nominator’s Email Address: ' + emailNominator +
                    ' | Personal Criteria: ' + personalCriteria +
                    ' | Professional Criteria: ' + professionalCriteria +
                    ' | Leadership & Integrity: ' + leadershipAndIntegrity +
                    ' | Innovation: ' + innovation +
                    ' | Results: ' + results +
                    ' | Impact: ' + impact +
                    ' | Any other Information you would like to include about your Nominee: ' + additionalInformation +
                    ' | Date Submitted: ' + dateSubmitted,
                    subject: 'New Quarterly Awards Nomination Form',
                    from_email: 'no-reply@oildiversity.com',
                    from_name: 'Landing Page: Quarterly Awards Nomination Form',
                    to: [{
                        email: config['sendEmailTo'],
                        name: 'Oil Diversity',
                        type: 'to'
                    }],
                    headers: {
                        'Reply-To': 'no-reply@oildiversity.com'
                    },
                    important: !1,
                    track_opens: null,
                    track_clicks: null,
                    auto_text: null,
                    auto_html: null,
                    inline_css: null,
                    url_strip_qs: null,
                    preserve_recipients: null,
                    view_content_link: null,
                    bcc_address: null,
                    tracking_domain: null,
                    signing_domain: null,
                    return_path_domain: null,
                    merge: !0,
                    tags: ['quarterly-awards-nomination'],
                    metadata: {
                        website: 'www.oildiversity.com'
                    }
                },
                async = !1,
                ip_pool = 'Main Pool';

            mandrill_client.messages.send({
                message: message,
                async: async,
                ip_pool: ip_pool,
                send_at: new Date
            }, function () {

                utilities.scrollToTop();
                logger.qLogSuccess('Your Quarterly Awards Nomination has been sent successfully.');

                // empty controls
                $('input:radio[name="award"]').each(function () {
                    $(this).checked = false;
                });

                firstNameNomineeInput.val('');
                lastNameNomineeInput.val('');
                currentPositionInput.val('');
                fromInput.val('');
                toInput.val('');
                areaCodeNomineeInput.val('');
                phoneNumberNomineeInput.val('');
                emailNomineeInput.val('');
                firstNameNominatorInput.val('');
                lastNameNominatorInput.val('');
                companyNameInput.val('');
                addressInput.val('');
                areaCodeNominatorInput.val('');
                phoneNumberNominatorInput.val('');
                emailNominatorInput.val('');
                personalCriteriaInput.val('');
                professionalCriteriaInput.val('');
                leadershipAndIntegrityInput.val('');
                innovationInput.val('');
                resultsInput.val('');
                impactInput.val('');
                additionalInformationInput.val('');

                utilities.enableForm(form);

            }, function (error) {

                utilities.scrollToTop();
                logger.qLogError('A mandrill error occurred: ' + error.name + ' - ' + error.message);
                utilities.enableForm(form);

            });
        }
        
        // show
        function show() {

            contents.getValueByKey(config['aWebSiteQuarterlyAwardFormContentKey']).done(function () {

            var description = model.ModelContent['value'];
            wrapper.empty().append(nominationPartial.replaceAll('*|description|*', description));
            var form = '#quarterly-awards-nomination-form';
            
            $(form)
                .validate({
                    rules: {
                        firstNameNominee: {
                            required: true
                        },
                        lastNameNominee: {
                            required: true
                        },
                        emailNominee: {
                            email: true
                        },
                        firstNameNominator: {
                            required: true
                        },
                        lastNameNominator: {
                            required: true
                        },
                        emailNominator: {
                            email: true
                        }
                    },
                    submitHandler: function () {

                        utilities.disableForm(form);
                        sendMail(form);
                    }
                });

            });

        }

        return {
            show: show
        };

    });

})();
(function () {
    'use strict';

    define('service/quarterly.awards',[
        'jquery',
        'service/config',
        'service/utilities',
        'service/contents'
    ], function ($, config, utilities, contents) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // show
        function show() {
            contents.getByKey(config['aWebSiteQuarterlyAwardsContentKey'], 'Quarterly Awards');
            
        }

        return {
            show: show
        };

    });

})();

define('text!template/list/details-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n    <div class="row">\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\r\n            <h1>*|title|*</h1></div>\r\n    </div>\r\n\r\n    <div class="row *|image-hidden|*">\r\n        <div class="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 text-center">\r\n            <img src="*|image-url|*" alt="" class="img-responsive center-block"><div class="spacer"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row">\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\r\n            *|description|*\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row">\r\n        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right remove-padding">\r\n            <a href="#!/show/?key=*|key|*" class="btn btn-default pull-right" title="Back">\r\n                <i class="fa fa-arrow-left" aria-hidden="true"></i>\r\n            </a>\r\n        </div>\r\n    </div>\r\n\r\n</div>';});

(function () {
    'use strict';

    define('service/community.network',[
        'jquery',
        'service/config',
        'model/model',
        'service/utilities',
        'service/contents',
        'text!template/company-partial-view.html',
        'text!template/list/tile-partial-view.html',
        'text!template/list/details-partial-view.html'
    ], function ($, config, model, utilities, contents, companyPartial, tileListPartial, detailsPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // details
        function getByTitle(title) {

            var details = '';
            var companies = model.ModelCompany['info'];

            $.each(companies, function (index, company) {

                var imageUrl = utilities.getCompanyLogoImageId(company['logoImageId']);
                var companyName = company['companyName'];
                var lowerCompanyName = companyName.toLocaleString().toLocaleLowerCase();
                title = utilities.decodeUrl(title).toLocaleString().toLocaleLowerCase();

                if (lowerCompanyName == title) {

                    // set meta tags
                    // utilities.setMetaTags4FB(companyName, companyName, company['description'], imageUrl);

                    return details += detailsPartial
                        .replace('*|title|*', companyName)
                        // .replace('*|image-hidden|*', imageUrl == config['defaultImage'] ? 'hidden' : '')
                        .replace('*|image-url|*', imageUrl)
                        .replace('*|description|*', company['description'])
                        .replace('*|key|*', 'community-network');
                }

            });
            
            $(details).hide().appendTo(wrapper.empty()).fadeIn('slow');
            utilities.enableForm(wrapper);
        }
        
        // show
        function show() {
            
            var title = 'Community Network';

            // partial
            wrapper.empty().append(companyPartial.replace('*|title|*', title));

            // companies
            var partial = '';
            var companies = model.ModelCompany['info'];
            var companiesWrapper = $('#companies-wrapper');

            $.each(companies, function (index, company) {

                var description = company['description'];
                if(description){

                    var companyName = company['companyName'];
                    var encodeCompanyName = utilities.encodeUrl(companyName);
                    var shortDescription = utilities.getWords(description, 12).replace(/(<([^>]+)>)/ig, "");

                    partial += tileListPartial
                        .replace('*|image-url|*', utilities.getCompanyLogoImageId(company['logoImageId']))
                        .replace('*|title|*', companyName)
                        .replace('*|description-hidden|*', '')
                        .replace('*|short-description|*', shortDescription)
                        .replace('*|key|*', 'community-network')
                        .replace('*|encode-title|*', encodeCompanyName)
                        .replace('*|inner-hidden|*', 'hidden');
                }

            });

            $(partial).hide().appendTo(companiesWrapper.empty()).fadeIn('slow');

            utilities.enableForm(wrapper);

        }

        return {
            show: show,
            getByTitle: getByTitle
        };

    });

})();

define('text!template/global/privacy-policy-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n    <div class="row">\r\n        <h1>PRIVACY POLICY</h1>\r\n    </div>\r\n    <div class="row">\r\n        <p>In order for us to deliver our services to you we need to know certain personal information about you. Otherwise Oil Diversity Global Website (<a href="//www.oildiversity.com">www.oildiversity.com</a>) wouldn’t work.</p>\r\n        <p>Indeed, if you are unwilling to provide us with the required personal information then we won’t be able to offer you our service.</p>\r\n        <p>We appreciate that you are trusting us with some of your most personal details. We won’t abuse that trust.</p>\r\n        <p>It is important for you to know how we will use and protect your personal information.  In addition, you may be protected by specific privacy laws.</p>\r\n        <p>If you have any questions about how Oil Diversity Global collects personal information, what information we have about you, how we use or share that information, you can contact our Privacy Manager at:</p>\r\n        <p><strong>Email:</strong>&nbsp;<a href="mailto:privacy@oildiversity.com">privacy@oildiversity.com</a></p>\r\n        <h3>What personal information do we need to collect?</h3>\r\n        <p>At a minimum we need to collect the following from you about you and professional profile:</p>\r\n        <ul>\r\n            <li>Name</li>\r\n            <li>Gender</li>\r\n            <li>Date of birth</li>\r\n            <li>Contact details such as phone numbers, email and social network</li>\r\n            <li>Personal text and instant chat message content</li>\r\n            <li>Photographs</li>\r\n            <li>Education</li>\r\n            <li>Email Address</li>\r\n            <li>Current Job Information</li>\r\n            <li>Professional Preferences</li>\r\n            <li>Resume / CV</li>\r\n        </ul>\r\n        <p>Depending upon the features of our service that you use, there may be other personal information collected.</p>\r\n        <h3>How do we collect your personal information?</h3>\r\n        <p>All personal and other information we need to offer our service will be collected by us directly from you.</p>\r\n        <p>We will also collect personal information about your professional preferences directly from you.</p>\r\n        <p>Your information will be collected online via our web properties and may also be collected from you via paperwork or in your phone and face to face discussions with our team.</p>\r\n        <p><em>Information that may be automatically collected</em></p>\r\n        <p>Some information will be collected automatically whenever you visit our website (or any other website). For instance, the IP address of your computer which is unique to your computer and which can be used to identify your general geographic location.</p>\r\n        <p>We won’t keep a copy of your IP address and you may browse the web properties we own and manage with anonymity.</p>\r\n        <p>We will only store your IP address for security purposes where you have actively engaged to use our services.</p>\r\n        <p>We use ‘cookies’ to give you a better experience when browsing on our web properties. A cookie is a small piece of data sent from our website and stored in your browser while you are browsing. Every time you load our website, your browser will send a cookie back to our server to notify us of your previous activity.</p>\r\n        <p>General website usage information such as the number of visitors, the webpages visited and how long visitors viewed each page will be collected automatically and in the aggregate.  This means your general website usage may be included in total numbers showing how you and other categories of visitors browse and use our services. Your individual general usage information will always remain anonymous.</p>\r\n        <p>Please note that third-party websites like Facebook and Twitter have their own rules for privacy. Even though you may be on a website with Oil Diversity Global branding, this doesn’t mean we own and manage that site. Our Privacy Policy only applies to the websites which we own and control such as <a href="//www.OilDiversity.com">www.OilDiversity.com</a>.</p>\r\n        <h3>How secure is my personal information?</h3>\r\n        <p>We do everything reasonably within our power to protect the privacy of your personal information. This includes what are widely-adopted and accepted best-practice processes and online protocols.</p>\r\n        <p>Each user is authenticated using his/her own credentials. Usernames and passwords are not shared and you fave full visibility and control over who accesses your personal information.</p>\r\n        <p>The communication channels with our websites are secured in terms of message confidentiality, integrity and are protected against being tampered with.</p>\r\n        <p>Event audit logging enables investigation of all user access, photo and video transmission, and password delivery.</p>\r\n        <p>Despite the commitment we make to protect your privacy and best efforts we make, you need to know that it is still possible for a variety of reasons beyond our control that your personal information may not be kept private.</p>\r\n        <p>No system is perfect. There is always a risk that your personal information may be somehow released without our intention.</p>\r\n        <h3>How do we use your personal information and will it be shared?</h3>\r\n        <p>We use the personal information we collect from you for one general purpose and that is to deliver the best possible experience that we can for you.</p>\r\n        <p>We are not interested in selling your data or giving it to third parties in any way that would jeopardise your privacy.  The service you want is the service we deliver for you and not uninvited SPAM.</p>\r\n        <p>Of course it may be that we can deliver a better service to you by working with third parties, and we do in fact work with a variety of third parties to bring our service to life for you. If we need to share your personal information with anyone in these circumstances then we will only share the minimum data, on express condition that those parties also honour the privacy of your information, and we will always ask your permission first.</p>\r\n        <p>Please note if we are under a legal obligation to release your information we must do so, or if we determine it is otherwise necessary to protect property or the safety of persons we may also do so.  In these cases, we will endeavour to contact you first.</p>\r\n        <h3>What if I want to check or remove my personal data?</h3>\r\n        <p>By definition to us your personal information is always yours.  We thank you for trusting us and we will treat it as we would our own team’s individual personal information.</p>\r\n        <p>If you need to know what information we have about you, or if you want it updated, changed or returned, it will be done at your request with no questions asked.</p>\r\n        <p>You can use the following:</p>\r\n        <ul>\r\n            <li>Functionality within our website for your account; or</li>\r\n            <li><a href="#!/show/?key=contact-us">Contact us</a> to telephone or email our privacy manager.</li>\r\n        </ul>\r\n        <h3>What privacy laws apply?</h3>\r\n        <p>Depending on where you live and use our service there may be specific privacy laws to govern how we collect, use and share your personal information</p>\r\n        <p>We comply with all applicable laws.  We encourage you to review those laws and the different advice resources available to you via the relevant government agencies.</p>\r\n        <p>Regardless of legal obligations, the protection of privacy is a core principle of how we do business.</p>\r\n        <p>Even if there are no specific privacy laws that are applicable to your situation, we will honour your personal information as if there was and in accordance with the legislated protection afforded to our customers in other countries where we offer Oil Diversity Global.</p>\r\n        <p>In other words, wherever we are bound by the strictest legal requirements to protect customers we will afford that protection to all our customers.</p>\r\n        <h3>Consent and changes to this Privacy Policy</h3>\r\n        <p>Before you agree to join our websites and provide your personal information you will be presented with option to review our Privacy Policy and Terms of Use.  By joining our websites you are consenting to this Privacy Policy and agreeing to the <a href="#!/show/?key=terms-of-service">Terms of Services</a></p>\r\n        <p>We are not a static business.  We are always evolving to best serve you as our customer.</p>\r\n        <p>From time to time there may be changes to this Privacy Policy, either because we have a better way of doing things or sometimes because of changes to applicable laws.</p>\r\n        <p>Information that we collect, use and share is governed by the Privacy Policy in force as at that time.</p>\r\n        <p>If there is an amendment to our Privacy Policy that affects you then we will let you know either via our website or an email.</p>\r\n        <p>Your continuing use of our service will be deemed acceptance of our Privacy Policy and <a href="#!/show/?key=terms-of-service">Terms of Services</a> at that point in time.</p>\r\n    </div>\r\n</div>';});

(function () {
    'use strict';

    define('service/privacy.policy',[
        'jquery',
        'text!template/global/privacy-policy-partial-view.html'
    ], function ($, privacyPolicyPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');
        
        // show
        function show() {
            wrapper.empty().append(privacyPolicyPartial);
        }

        return {
            show: show
        };

    });

})();

define('text!template/global/terms-of-service-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n    <div class="row">\r\n        <h1>TERMS OF SERVICE</h1>\r\n    </div>\r\n    <div class="row">\r\n        <strong>Acceptance of Terms</strong>\r\n        <p>The web pages available at www.oildiversity.com and all linked pages and related services ("Web Site") are owned and operated by Oil Diversity Global Ltd, Malaysia, and its related bodies corporate and are accessed by you under these Terms of Service ("Terms of Service").  Under no circumstances is any of the material or code contained within this site to be republished or printed without prior written permission from our Company.  </p>\r\n        <p><strong>PLEASE READ THIS CONTRACT CAREFULLY.</strong> The services and materials offered through or in association with the Web Site are offered to you subject to your acceptance of these Terms of Service and by accessing the Web Site you accept all the terms and conditions of the Terms of Service, including in particular the limitations on use, liability and warranty described below.</p>\r\n        <strong>Modifications of Terms of Service</strong>\r\n        <p>We reserve the right, in our sole discretion, to modify or replace the Terms of Service at any time. Your continued use of the Web Site after any such changes constitutes your acceptance of the new Terms of Service. Further, these Terms of Service apply exclusively to your access and use of the Web Site and are in addition to the terms or conditions of any other agreement you may have with us for products, services or otherwise.</p>\r\n        <strong>Privacy and Personal Information</strong>\r\n        <p>Please refer to our <a href="#!/show/?key=privacy-policy">Privacy Policy</a> which forms part of these Terms of Service.</p>\r\n        <strong>Use of Web Site and related services</strong>\r\n        <p>You will not access or use the Web Site or related services for any unlawful purpose, or in any manner or for any purpose that is prohibited by these Terms of Service.</p>\r\n        <p>In using the Web Site, you will not: (a) Disrupt or interfere with any other user\'s enjoyment of the Web Site (b) Upload, post or otherwise transmit any viruses or other harmful, disruptive or destructive files, (c) Create a false identity, (d) Use or attempt to use another\'s account, password, service or system, (e) Access or attempt to access any service or content which you are not authorized to access, (f) Disrupt or interfere with the security of, or otherwise cause harm to, any system resources, accounts, passwords, servers or networks connected to or accessible through such feature or any affiliated or linked sites, (g) Conduct any surveys, contests, pyramid schemes, chain letters, junk email, spamming or any duplication or unsolicited messages (commercial or otherwise), (h) Threaten, defame, abuse, harass, stalk or otherwise violate the legal rights (such as rights of privacy and publicity) of others, (i) Publish, post, upload, distribute or disseminate any defamatory, obscene, or unlawful topic, name, material or information; (j) Upload or otherwise make available files that contain images, photographs, software or other material protected by intellectual property laws, including, without limitation, copyright, trademark, privacy and publicity laws unless you own or control the rights thereto or have received all necessary consents to do the same, (k) Advertise or offer to sell or buy any goods or services for any purpose, (l) Violate any applicable laws or regulations.</p>\r\n        <strong>International Usage</strong>\r\n        <p>International users agree to comply with their own local rules regarding online conduct and acceptable content, including laws regulating the export of data to your country of residence. Users agree to follow their ‘in country’ legislation in regards to Employment Law when accessing the Recruitment Site and posting job advertisements.  Users understand that their access may be disabled should they be found to be not following proper legislation.</p>\r\n        <strong>Language Translation</strong>\r\n        <p>It is the express wish of the parties that the Terms of Service and all related documents have been drawn up in English. The English version of these Terms of Service Use will be the version used when interpreting or construing these Terms of Service.</p>\r\n        <strong>Copyright</strong>\r\n        <p>You acknowledge that you are receiving a limited license to use the Web Site and that you shall obtain no ownership, title nor any other rights in or to the Web Site or any materials related to the Web Site or your access thereto.</p>\r\n        <p>All and any portion of which title and rights shall remain with us.</p>\r\n        <p>The Web Site and related services are protected by copyright and other intellectual property laws and by international treaties.</p>\r\n        <strong>Liability limitation and Indemnity</strong>\r\n        <p>Oil Diversity Global is not responsible for the actions, content, information, or data of third parties and you release us, our Directors, Employees and Agents from any claims and damages, known and unknown, arising out of or in any way connected with any claim you have against any such third party from liability for any damages, including without limitation any indirect, consequential, special, incidental or punitive damages arising out of your access or any related use of the Web Site or related services to the extent that this is allowable by law.</p>\r\n        <p>You agree to indemnify and hold us and our subsidiaries, affiliates, officers, agents, co-branders, facilities from where our services are delivered or other partners, employees and suppliers harmless from any claim or demand, including reasonable legal fees, made by any third party due to or arising out of the following without limitation: (a) your access to the Web Site or use of related services; (b) files or other material containing images, photographs, video, words or other material you see, download, upload, submit or otherwise receive or transmit; (c) your violation of these Terms of Service, including without limitation, any intellectual property right, confidentiality, property or privacy right; (d) your violation of any law, rule or regulation or the rights of any other person or entity; (e) any misrepresentation made by you; (f) the Oil Diversity content; (g) User Content (h) your use of, inability to use, or the performance of our services; (i) any errors or omissions in the services operation; or, (j) any damage to any users computer, mobile device, or other equipment or technology including, without limitation, damage from any security breach or from any virus, bugs, tampering, fraud, error, omission, interruption, defect, delay in operation or transmission, computer line or network failure or any other technical or other malfunction, including without limitation, damages for lost profits, loss of goodwill, loss of data, work stoppage, accuracy of results, or computer failure or malfunction, even if foreseeable or even if the Oil Diversity Global Team have been advised or should have known of the possibility of such damages, whether in action of contract, negligence, strict liability or tort (including, without limitation, whether caused in whole or in part by negligence, acts of god, or theft or destruction of the services.)</p>\r\n        <strong>Content, Video and Other Media</strong>\r\n        <p>You may not copy, reverse engineer, decompile, disassemble, translate, modify or make derivative works of any content, video or photographic or other media, in whole or in part from the Web Site.  You will not rent, disclose, publish, sell, assign, lease, sublicense, market, or transfer any media from the Web Site, or any part thereof, or use it in any manner not expressly authorised by these Terms of Service.</p>\r\n        <strong>Content Delay, Loss and Defects</strong>\r\n        <p>Depending on numerous factors beyond our control, any content (data/information) provided to you by accessing or using the Web Site may not be instantaneous and you may lose some. The image content that you view on your screen travels through a number of servers, Internet and cellular networks, some of which are not our property, and by accessing the Web Site you agree that we cannot be held liable for any delay or loss in delivery of the content.</p>\r\n        <p>In no event do we warrant that the Web Site and services are error free or that you will be able to access the Web Site without problems or interruptions.</p>\r\n        <strong>Governing Law and Jurisdiction</strong>\r\n        <p>These Terms of Use will be governed by and construed in accordance with the laws in force in Malaysia.</p>\r\n        <p>These Terms of Service will not be governed by the conflict of law rules of any jurisdiction or the United Nations Convention on Contracts for the International Sale of Goods, the application of which is expressly excluded.</p>\r\n    </div>\r\n</div>';});

(function () {
    'use strict';

    define('service/terms.of.service',[
        'jquery',
        'text!template/global/terms-of-service-partial-view.html'
    ], function ($, termsOfServicePartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var wrapper = $(document).find('#other-content-wrapper');

        // show
        function show() {
            wrapper.empty().append(termsOfServicePartial);
        }

        return {
            show: show
        };

    });

})();

define('text!template/search/quick-jobs-search-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn">\r\n\r\n    <h1>QUICK JOBS SEARCH</h1>\r\n    <div class="spacer"></div>\r\n\r\n    <form id="quick-jobs-search-form" class="row">\r\n        <div class="row">\r\n            <div class="form-group col-md-4 col-sm-12 col-xs-12 remove-padding">\r\n                <label>Country:</label>\r\n                <label for="inputCountry"></label><select id="inputCountry" name="inputCountry" class="form-control"></select>\r\n            </div>\r\n            <div class="form-group col-md-2 col-sm-12 col-xs-12 pull-right remove-padding">\r\n                <label>Order By:</label>\r\n                <label for="inputOrderBy"></label><select id="inputOrderBy" name="inputOrderBy" class="form-control"></select>\r\n            </div>\r\n        </div>\r\n        <div class="row">\r\n            <div class="form-group col-md-12 remove-padding">\r\n                <label class="control-label">Enter Search Phrase and click "Search"</label>\r\n                <div class="input-group merged">\r\n                    <input id="inputSearchPhrase" name="inputSearchPhrase" class="form-control" placeholder="Type a part of what are you looking for..." type="text">\r\n                    <span class="input-group-btn">\r\n                        <button class="btn btn-success" type="submit"><span>Search</span>&nbsp;<i class="fa fa-search"></i></button>\r\n                    </span>\r\n                </div>\r\n                <label id="inputSearchPhrase-error" class="error" for="inputSearchPhrase" style="display: none;"></label>\r\n            </div>\r\n        </div>\r\n    </form>\r\n\r\n    <!-- not found alert -->\r\n    <div id="not-found-jobs-wrapper" class="row" style="display: none;">\r\n        <div class="col-md-12 remove-padding">\r\n            <div class="alert alert-danger">Sorry! No vacancy found with this criteria. Please choose a better keyword or leave it empty.</div>\r\n        </div>\r\n    </div>\r\n    <!-- /not found alert -->\r\n\r\n    <!-- result search-->\r\n    <div class="row jobs-pagination"></div>\r\n    <div class="row" id="find-jobs-wrapper"></div>\r\n    <div class="row jobs-pagination"></div>\r\n    <!-- /result search-->\r\n\r\n</div>';});


define('text!template/search/find-jobs-partial-view.html',[],function () { return '<div class="well row text-left animated fadeIn x-slow-animated">\r\n    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12 remove-padding">\r\n        <img src="*|company-logo-url|*" alt="" class="img img-responsive img-thumbnail center-block">\r\n        <div class="spacer hidden-lg hidden-md"></div>\r\n    </div>\r\n    <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 remove-padding-right remove-padding-xs">\r\n        <div class="row">\r\n            <span class="help-text small pull-right">*|created-date-time|*</span>\r\n            <p class="small">*|company-name|*</p>\r\n            <h3>*|job-title|*</h3>\r\n        </div>\r\n        <div class="row">\r\n            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                <code class="pull-left small">*|country|**|city|*</code>\r\n                <div class="spacer col-sm-12 col-xs-12 hidden-lg hidden-md"></div>\r\n            </div>\r\n            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 remove-padding">\r\n                <a target="_blank" href="#!/show/?key=view-company-profile&t=*|token|*&vc=*|vacancy-id|*&r=*|count|*&s=*|search-phrase|*&c=*|country-code-value|*&o=*|order-by-code-value|*" class="btn btn-default btn-xs pull-right">\r\n                    <span>Read More</span>&nbsp;<i class="fa fa-arrow-circle-o-right"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';});


define('text!template/search/pagination.html',[],function () { return '<div class="col-md-2 remove-padding">\r\n    <button class="btn-previous btn btn-default btn-block *|previous-disabled|*">\r\n        <span>Previous</span>\r\n    </button>\r\n</div>\r\n\r\n<div class="col-md-8 text-center animated fadeIn" style="">\r\n    <span>Page</span>\r\n    <span>*|index|*</span>\r\n    <span>Of</span>\r\n    <span>*|page|*</span>\r\n    <br>\r\n    <span>*|count|*</span>\r\n    <span></span>\r\n    <span>Items Found</span>\r\n</div>\r\n\r\n<div class="col-md-2 remove-padding pull-right">\r\n    <button class="btn-next btn btn-default btn-block pull-right *|next-disabled|*">\r\n        <span>Next</span>\r\n    </button>\r\n</div>';});


define('text!template/search/details-partial-view.html',[],function () { return '<div id="partial-wrapper" class="container animated fadeIn job-search-details-wrapper">\r\n\r\n    <!-- company -->\r\n    <div class="row title-row">\r\n        <h1 class="panel-title">*|company-name|*</h1>\r\n    </div>\r\n\r\n    <div class="row composer-plate">\r\n        <div class="row inner-tile">\r\n            <div class="row">\r\n                <div class="col-md-offset-4 col-md-4">\r\n                    <div class="form-group text-center">\r\n                        <img class="img img-responsive user-photo-thumb" src="*|company-logo-url|*">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="row">\r\n                <div class="form-group">\r\n                    <code class="pull-left small">*|country|**|city|*</code>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- end company -->\r\n\r\n    <div class="spacer"></div>\r\n\r\n    <!-- vacancy -->\r\n    <div class="row title-row">\r\n        <h1 class="panel-title">*|job-title|*</h1>\r\n    </div>\r\n    <div class="row composer-plate">\r\n        <div class="row inner-tile">\r\n\r\n            <div class="row">\r\n                <span class="help-text small pull-right">*|created-date-time|*</span>\r\n            </div>\r\n\r\n            <div class="row *|hidden-responsibilities|*">\r\n                <h4>Responsibilities</h4>\r\n                <div><ul>*|responsibilities|*</ul></div>\r\n            </div>\r\n\r\n            <div class="row *|hidden-scope-of-responsibilities|*">\r\n                <h4>Scope of Responsibilities</h4>\r\n                <div><ul>*|scope-of-responsibilities|*</ul></div>\r\n            </div>\r\n\r\n            <div class="row *|hidden-entry-requirements|*">\r\n                <h4>Entry Requirements</h4>\r\n                <div><ul>*|entry-requirements|*</ul></div>\r\n            </div>\r\n\r\n            <div class="row *|hidden-additional-information|*">\r\n                <h4>Additional Information</h4>\r\n                <div><ul>*|additional-information|*</ul></div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <h4>Require Visa</h4>\r\n                <div>*|require-visa|*</div>\r\n            </div>\r\n\r\n            <div class="row top-pad-10">\r\n\r\n                <div class="col-lg-12 col-md-12 col-sm-4 col-xs-12 remove-padding pull-left">\r\n                    <a href="*|apply-now-url|*" target="_blank" type="button" class="col-lg-4 col-md-4 col-sm-4 col-xs-12 btn btn-block btn-success">Login to apply</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- end vacancy -->\r\n\r\n    <!--<div class="row">-->\r\n        <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-right remove-padding">-->\r\n            <!--<a href="#!/show/?key=quick-jobs-search&s=*|search-phrase|*&c=*|country-code-value|*&o=*|order-by-code-value|*" class="btn btn-default pull-right" title="Back">-->\r\n                <!--<i class="fa fa-arrow-left" aria-hidden="true"></i>-->\r\n            <!--</a>-->\r\n        <!--</div>-->\r\n    <!--</div>-->\r\n\r\n</div>';});

(function () {
    'use strict';

    define('service/jobs.search',[
        'jquery',
        'service/config',
        'dataAccess/dataAccess',
        'model/model',
        'service/utilities',
        'text!template/search/quick-jobs-search-partial-view.html',
        'text!template/search/find-jobs-partial-view.html',
        'text!template/search/pagination.html',
        'text!template/search/details-partial-view.html'
    ], function ($, config, dataAccess, model, utilities, jobSearchPartial, resultPartial, paginationPartial, detailsPartial) {

        // this class is a view class so feel free to do what you need !
        // DOM objects
        var translations = null;
        var countries = [];
        var orderBys = null;
        var vacancySearchResult = null;
        var tempToken = {};
        var currentToken = '';
        var nextToken = '';
        var recordsCount = null;
        var pageIndex = 1;
        var page = null;
        var isSearchButton = false;
        var isPreviousButton = false;
        var isNextButton = false;
        var wrapper = $(document).find('#other-content-wrapper');

        // countries
        function getCountries() {

            // translations
            translations = model.ModelTranslation['info'];

            return $.Deferred(function (def) {

                if(countries.length <= 0){

                    dataAccess.DataJobsSearch.getCountries({

                        success: function (data) {
                            debugger
                            var item = { 'value' : '', 'text' : 'All' };
                            countries.push(item);

                            for (var i = 0; i < data['codes'].length; i++) {

                                var country = data['codes'][i];
                                var codeValue = country['codeValue'];
                                var dataDefinitionId = country['dataDefinitionId'];
                                var dataDefinitionString = translations[dataDefinitionId];

                                item = { 'value' : codeValue, 'text' : dataDefinitionString };
                                countries.push(item);

                            }

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

        // drop down countries
        function fullDropDownCountries(wrapper, countryCodeValue) {
            debugger
            wrapper.empty();
            $.each(countries, function (index, country) {
                wrapper.append($('<option>', {value: country['value'], text: country['text']}));
            });

            if (countryCodeValue) {                
                wrapper.val(countryCodeValue);
            }
        }

        // text
        function getCountryText(codeValue) {
            debugger
            var text = '';
            $.each(countries, function (index, country) {
                if (countries.hasOwnProperty(index)) {
                    if (country['value'] == codeValue) {
                        text = country['text'];
                    }
                }
            });
            return text;
        }

        // orderBys
        function getOrderBys() {

            // await
            return $.Deferred(function (def) {

                if(orderBys == null){
                    // call search
                    dataAccess.DataJobsSearch.getOrderBy({

                        // if action call was successful
                        success: function (data) {
                            orderBys = data;
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

        // drop down order by
        function fullDropDownOrderBys(wrapper, orderByCodeValue) {            
            var codes = orderBys['codes'];
            if (codes.length > 0) {

                var options = '';
                for (var i = 0; i < codes.length; i++) {
                    var orderByd = codes[i];
                    if (orderByd != null) {
                        var codeValue = orderByd['codeValue'];
                        var dataDefinitionId = orderByd['dataDefinitionId'];
                        var dataDefinitionString = translations[dataDefinitionId];
                        options += '<option value="' + codeValue + '">' + dataDefinitionString + '</option>';
                    }
                }
                wrapper.empty().append(options);
                wrapper.val(orderByCodeValue ? orderByCodeValue : 'jobTitle');
            }

        }

        // change url
        function changeUrl(searchPhrase, countryCodeValue, orderByCodeValue) {
            history.pushState(null, '','/#!/show/?key=quick-jobs-search&s=' + searchPhrase +'&c=' + countryCodeValue + '&o=' + orderByCodeValue);
        }

        // get search
        function getSearch(searchPhrase, countryCodeValue, orderByCodeValue) {

            // await
            return $.Deferred(function (def) {

                if(vacancySearchResult == null || isSearchButton || isPreviousButton || isNextButton){

                    // new model data
                    var modelJobSearch = dataAccess.DataJobsSearch.newItem({
                        searchPhrase: searchPhrase ?  searchPhrase : '',
                        countryCodeValue: countryCodeValue,
                        orderByCodeValue: orderByCodeValue,
                        industryExperienceCodeValue: '',
                        employmentTypeCodeValue: '',
                        salarySoughtCurrencyCodeValue: '',
                        salarySoughtAmount: '',
                        educationCodeValue: '',
                        summaryOfExperienceCategoryCodeValue: '',
                        experienceDisciplineFirstLevelCodeValue: '',
                        experienceDisciplineSecondLevelCodeValue: '',
                        token: encodeURI(currentToken)
                    });

                    if(pageIndex==1){
                        tempToken[pageIndex] = currentToken;
                    }

                    // call search
                    dataAccess.DataJobsSearch.getSearch({

                        // if action call was successful
                        success: function (data) {

                            vacancySearchResult = data['vacancySearchResult'];
                            nextToken = data['continuationToken'];

                            if(recordsCount == null || pageIndex==1){
                                recordsCount = data['recordsCount'];
                            }

                            page = Math.ceil(recordsCount / 10);
                            def.resolve();
                        },
                        // if any Unhanded error accrues
                        error: function () {

                            def.reject();

                        }
                    }, modelJobSearch);
                }else{
                    def.resolve();
                }

            }).promise();
        }

        // job search
        function jobsSearch(quickJobsSearchForm, searchPhrase, countryCodeValue, orderByCodeValue) {

            var findJobsWrapper = $('#find-jobs-wrapper');
            var jobsPagination = $('.jobs-pagination');
            var notFound = $('#not-found-jobs-wrapper').fadeOut('slow');

            if (!(isPreviousButton || isNextButton)) {
                utilities.disableForm(quickJobsSearchForm);
            }
            else {
                utilities.disableForm(jobsPagination);
            }

            if (isSearchButton) {
                currentToken = '';
                pageIndex = 1;
                findJobsWrapper.empty();
                jobsPagination.empty();
            }

            getSearch(searchPhrase, countryCodeValue, orderByCodeValue).done(function () {

                // back to default value
                isSearchButton = isPreviousButton = isNextButton = false;

                // url
                changeUrl(searchPhrase, countryCodeValue, orderByCodeValue);

                if (vacancySearchResult.length > 0) {

                    var htmlCompany = '';
                    $.each(vacancySearchResult, function (index, result) {

                        if (result != null) {

                            var company = result['companyContainer']['company'];
                            var vacancy = result['vacancy'];
                            var country = getCountryText(vacancy['countryCode']);
                            var city = vacancy['cityName'];

                            htmlCompany += resultPartial
                                .replace('*|company-logo-url|*', utilities.getCompanyLogoImageId(company['logoImageId']))
                                .replace('*|created-date-time|*', utilities.getTimeAgo(vacancy['createdDateTime']))
                                .replace('*|company-name|*', company['name'])
                                .replace('*|job-title|*', vacancy['jobTitle'])
                                .replace('*|country|*', country)
                                .replace('*|city|*', country && city ? '/' + city : city ? city : '')
                                .replace('*|search-phrase|*', searchPhrase)
                                .replace('*|country-code-value|*', countryCodeValue)
                                .replace('*|order-by-code-value|*', orderByCodeValue)
                                .replace('*|token|*', currentToken)
                                .replace('*|count|*', recordsCount)
                                .replace('*|vacancy-id|*', vacancy['id']);
                        }

                    });

                    if(recordsCount > 10){
                        var paginationHtml = paginationPartial
                            .replaceAll('*|previous-disabled|*', pageIndex == 1 ? 'disabled' : '')
                            .replaceAll('*|next-disabled|*', pageIndex == page ? 'disabled' : '')
                            .replaceAll('*|index|*', pageIndex)
                            .replaceAll('*|page|*', page)
                            .replaceAll('*|count|*', recordsCount);

                        $(paginationHtml).hide().appendTo(jobsPagination.empty()).fadeIn('slow');
                    }

                    $(htmlCompany).hide().appendTo(findJobsWrapper.empty()).fadeIn('slow');

                    utilities.enableForm(jobsPagination);
                    utilities.enableForm(quickJobsSearchForm);
                }
                else {
                    notFound.fadeIn('slow');
                    utilities.enableForm(quickJobsSearchForm);
                }
            });
        }

        // show
        function show() {
            var searchPhrase = utilities.getParameterValues('s');
            var countryCodeValue = utilities.getParameterValues('c');
            var orderByCodeValue = utilities.getParameterValues('o');
            
            // show partial
            wrapper.empty().append(jobSearchPartial);

            // find controls
            var inputCountry = $('#inputCountry');
            var inputOrderBy = $('#inputOrderBy');
            var inputSearchPhrase = $('#inputSearchPhrase');
            var quickJobsSearchForm = '#quick-jobs-search-form';

            inputSearchPhrase.val(searchPhrase ? searchPhrase : '');
            fullDropDownCountries(inputCountry, countryCodeValue);
            fullDropDownOrderBys(inputOrderBy, orderByCodeValue);

            if (orderByCodeValue) {
                jobsSearch(quickJobsSearchForm, searchPhrase, countryCodeValue, orderByCodeValue);
            }

            utilities.enableForm(wrapper);

            // event
            // search form
            $(quickJobsSearchForm)
                .validate({
                    rules: {},
                    submitHandler: function () {
                        isSearchButton = true;
                        jobsSearch(quickJobsSearchForm, inputSearchPhrase.val(), inputCountry.val(), inputOrderBy.val());
                    }
                });
        }

        // details
        function getCompanyProfile() {

            var details = '';
            var searchPhrase = utilities.getParameterValues('s');
            var countryCodeValue = utilities.getParameterValues('c');
            var orderByCodeValue = utilities.getParameterValues('o');
            var vacancyId = utilities.getParameterValues('vc');
            currentToken = utilities.getParameterValues('t');
            recordsCount = utilities.getParameterValues('r');
            
            getSearch(searchPhrase, countryCodeValue, orderByCodeValue).done(function () {

                $.each(vacancySearchResult, function (index, result) {

                    var company = result['companyContainer']['company'];
                    if (company != null) {

                        var vacancy = result['vacancy'];

                        if (vacancy['id'] == vacancyId) {

                            var companyName = company['name'];
                            var jobTitle = vacancy['jobTitle'];
                            var companyLogoUrl = utilities.getCompanyLogoImageId(company['logoImageId']);
                            // var titlePage = companyName + '-' + jobTitle;
                            var responsibilities = vacancy['responsibilities'];
                            var scopeOfResponsibilities = vacancy['scopeOfResponsibilities'];
                            var entryRequirements = vacancy['entryRequirements'];
                            var additionalInformation = vacancy['additionalInformation'];

                            var country = getCountryText(vacancy['countryCode']);
                            var city = vacancy['cityName'];

                            // set meta tags
                            // utilities.setMetaTags4FB(titlePage, titlePage, company['description'], companyLogoUrl);

                            // responsibilities
                            // split and create lis
                            var responsibilitiesLis = '';
                            var responsibilitiesArray = responsibilities ? responsibilities.split('\n') : [];
                            for (var counter in responsibilitiesArray) {

                                var current = responsibilitiesArray[counter].trim();
                                if (current) {
                                    responsibilitiesLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // scopeOfResponsibilities
                            var scopeOfResponsibilitiesLis = '';
                            var scopeOfResponsibilitiesArray = scopeOfResponsibilities ? scopeOfResponsibilities.split('\n') : [];
                            for (counter in scopeOfResponsibilitiesArray) {

                                current = scopeOfResponsibilitiesArray[counter].trim();
                                if (current) {
                                    scopeOfResponsibilitiesLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // entryRequirements
                            var entryRequirementsLis = '';
                            var entryRequirementsArray = entryRequirements ? entryRequirements.split('\n') : [];
                            for (counter in entryRequirementsArray) {

                                current = entryRequirementsArray[counter].trim();
                                if (current) {
                                    entryRequirementsLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // additionalInformation
                            var additionalInformationLis = '';
                            var additionalInformationArray = additionalInformation ? additionalInformation.split('\n') : [];
                            for (counter in additionalInformationArray) {

                                current = additionalInformationArray[counter].trim();
                                if (current) {
                                    additionalInformationLis += '<li>' + utilities.removeLi(current) + '</li>';
                                }

                            }

                            // details
                            return details += detailsPartial
                                .replace('*|company-name|*', companyName)
                                .replace('*|company-logo-url|*', companyLogoUrl)
                                .replace('*|country|*', country)
                                .replace('*|city|*', country && city ? '/' + city : city ? city : '')
                                .replace('*|job-title|*', jobTitle)
                                .replace('*|created-date-time|*', utilities.getTimeAgo(vacancy['createdDateTime']))
                                .replace('*|hidden-responsibilities|*', responsibilities ? '' : 'hidden')
                                .replace('*|responsibilities|*', responsibilitiesLis)
                                .replace('*|hidden-scope-of-responsibilities|*', scopeOfResponsibilities ? '' : 'hidden')
                                .replace('*|scope-of-responsibilities|*', scopeOfResponsibilitiesLis)
                                .replace('*|hidden-entry-requirements|*', entryRequirements ? '' : 'hidden')
                                .replace('*|entry-requirements|*', entryRequirementsLis)
                                .replace('*|hidden-additional-information|*', additionalInformation ? '' : 'hidden')
                                .replace('*|additional-information|*', additionalInformationLis)
                                .replace('*|require-visa|*', vacancy['requireVisa'] ? 'Yes' : 'No')
                                .replace('*|search-phrase|*', searchPhrase)
                                .replace('*|country-code-value|*', countryCodeValue)
                                .replace('*|order-by-code-value|*', orderByCodeValue)
                                .replace('*|apply-now-url|*', config.baseAppUrl + '#/signin/home?vc=' + vacancyId);

                        }
                    }

                });

                $(details).hide().appendTo(wrapper.empty()).fadeIn('slow');
                utilities.enableForm(wrapper);

            });
        }

        // event
        $(document).on('click', '.btn-previous', function () {

            if(pageIndex == 1){
                return false;
            }
            var inputCountry = $('#inputCountry');
            var inputOrderBy = $('#inputOrderBy');
            var inputSearchPhrase = $('#inputSearchPhrase');
            var quickJobsSearchForm = '#quick-jobs-search-form';

            // get previous token
            currentToken = tempToken[pageIndex];
            delete tempToken[pageIndex];

            pageIndex--;
            isPreviousButton = true;

            jobsSearch(quickJobsSearchForm, inputSearchPhrase.val(), inputCountry.val(), inputOrderBy.val());
        });

        // event
        $(document).on('click', '.btn-next', function () {

            if(pageIndex == page){
                return false;
            }

            var inputCountry = $('#inputCountry');
            var inputOrderBy = $('#inputOrderBy');
            var inputSearchPhrase = $('#inputSearchPhrase');
            var quickJobsSearchForm = '#quick-jobs-search-form';

            pageIndex++;
            isNextButton = true;

            // add current token in temp token
            tempToken[pageIndex] = currentToken;
            currentToken = nextToken;

            jobsSearch(quickJobsSearchForm, inputSearchPhrase.val(), inputCountry.val(), inputOrderBy.val());

        });

        return {
            show: show,
            getCompanyProfile: getCompanyProfile,
            getCountries: getCountries,
            getOrderBys: getOrderBys
        };

    });

})();
(function () {
    'use strict';

    define('service/frequently.asked.question',[
        'jquery',
        'service/config',
        'service/utilities',
        'service/contents'
    ], function ($, config, utilities, contents) {

        // this class is a view class so feel free to do what you need !
        // DOM objects

        // show
        function show() {
            contents.getByKey(config['aWebSiteFAQContentKey'], 'Frequently Asked Question');
        }

        return {
            show: show
        };

    });

})();


//(function () {
//    'use strict';

//    define([
//        'jquery',
//        'text!template/global/frequently-asked-questions-partial-view.html'
//    ], function ($, frequentlyaskedquestionSpartial) {

//        // this class is a view class so feel free to do what you need !
//        // DOM objects
//        var wrapper = $(document).find('#other-content-wrapper');

//        // show
//        function show() {
//            wrapper.empty().append(frequentlyaskedquestionSpartial);
//        }

//        return {
//            show: show
//        };

//    });

//})();
(function () {
    'use strict';

    define('app/view/home',[
            'jquery',
            'service/utilities',
            'service/contents',
            'service/companies',
            'service/translations',
            'service/quarterly.magazines',
            'service/header.footer',
            'service/main',
            'service/sponsors',
            'service/about.us',
            'service/contact.us',
            'service/sign.up',
            'service/graduate.recruitment',
            'service/quarterly.awards.nomination',
            'service/quarterly.awards',
            'service/community.network',
            'service/privacy.policy',
            'service/terms.of.service',
            'service/jobs.search',
            'service/frequently.asked.question',
            'bootstrap' //we have not added this as parameters because we don't use it in the home view (this view)
        ],
        function (
            $,
            utilities,
            contents,
            companies,
            translations,
            quarterlyMagazines,
            headerFooter,
            main,
            sponsors,
            aboutUs,
            contactUs,
            signUp,
            graduateRecruitment,
            quarterlyAwardsNomination,
            quarterlyAwards,
            communityNetwork,
            privacyPolicy,
            termsOfService,
            jobsSearch,
            frequentlyAskedQuestion) {

            // this class is a view class so feel free to do what you need !
            // DOM objects
            var isHashChange = false;
            var homeContentWrapper = $('#home-content-wrapper');
            var otherContentWrapper = $('#other-content-wrapper');

            // private methods
            // active nav bar
            function activeNavBar(activeItem) {
                activeItem = $('a[href$="' + activeItem + '"]').parent('li');
                utilities.activeNavBar(activeItem);
            }

            // get info from server
            function getInfoFromServer() {

                // get companies                
                utilities.disableForm($(document).find('#_logos-container'));
                companies.getCompaniesPublicInfo().done(function () {
                    sponsors.show();
                });

                // get contents
                contents.getAllEnglishWebsite();

                // get translations
                translations.getAll();

                // magazine
                quarterlyMagazines.getAllCurrent();

            }

            // load home page
            function loadHomePage() {

                // fade out
                otherContentWrapper.fadeOut('slow');

                // home page
                homeContentWrapper.fadeIn('slow');
                main.show();

                // get info                
                getInfoFromServer();

            }

            // load pages by key
            function loadPagesByKey(key) {

                var activeItem = key;
                switch (key) {

                    // content
                    case 'about-us' :
                        utilities.disableForm(otherContentWrapper);
                        contents.getAllEnglishWebsite().done(function () {
                            aboutUs.show();
                        });
                        break;
                    case 'quarterly-awards' :
                        utilities.disableForm(otherContentWrapper);
                        contents.getAllEnglishWebsite().done(function () {
                            activeItem = 'quarterly';
                            quarterlyAwards.show();
                        });
                        break;
                    case 'frequently-asked-questions':
                        utilities.disableForm(otherContentWrapper);
                        contents.getAllEnglishWebsite().done(function () {
                            activeItem = 'FAQ&#39';
                            frequentlyAskedQuestion.show();
                        });
                        break;

                    // translations
                    case 'quarterly-magazine' :
                        activeItem = 'quarterly';
                        utilities.disableForm(otherContentWrapper);
                        translations.getAll().done(function () {
                            quarterlyMagazines.getAllCurrent().done(function () {
                                quarterlyMagazines.orderByQuarterCodeValue().done(function () {
                                    quarterlyMagazines.show();
                                });
                            });
                        });

                        break;
                    case 'quick-jobs-search' :
                        utilities.disableForm(otherContentWrapper);
                        translations.getAll().done(function () {
                            companies.getCompaniesPublicInfo().done(function () {
                                jobsSearch.getCountries().done(function () {
                                    jobsSearch.getOrderBys().done(function () {
                                        jobsSearch.show();
                                    });
                                });
                            });
                        });
                        break;

                    case 'view-vacancy' :
                    case 'view-company-profile':
                        utilities.disableForm(otherContentWrapper);
                        translations.getAll().done(function () {
                            companies.getCompaniesPublicInfo().done(function () {
                                jobsSearch.getCountries().done(function () {
                                    jobsSearch.getCompanyProfile();
                                });
                            });
                        });
                        break;

                    // company
                    case 'graduate-schemes' :
                    case 'graduate-recruitment' :
                        utilities.disableForm(otherContentWrapper);
                        companies.getCompaniesPublicInfo().done(function () {
                            graduateRecruitment.show();
                        });
                        break;
                    case 'community-network' :
                        utilities.disableForm(otherContentWrapper);
                        companies.getCompaniesPublicInfo().done(function () {
                            var title = utilities.getParameterValues('t');
                            title ? communityNetwork.getByTitle(title) : communityNetwork.show();
                        });
                        break;

                    // independent info
                    case 'contact-us' :
                        contactUs.show();
                        break;
                    case 'sign-up' :
                        signUp.show();
                        break;
                    case 'quarterly-awards-nomination' :
                        activeItem = '#!';
                        quarterlyAwardsNomination.show();
                        break;
                    case 'privacy-policy' :
                        privacyPolicy.show();
                        break;
                    case 'terms-of-service' :
                        termsOfService.show();
                        break;
                    //case 'frequently-asked-questions':
                    //    frequentlyAskedQuestion.show();
                    //    break;
                    default:
                        loadHomePage();
                        return;
                }

                activeNavBar(activeItem);

            }

            // load pages
            function loadPages() {

                utilities.scrollToTop();

                // show progress bar
                if(!isHashChange) {
                    utilities.showProgressBar();
                }

                // show header & footer
                headerFooter.show();

                // other content
                if (utilities.isValidRout('/show')) {

                    // fade out
                    homeContentWrapper.fadeOut('slow');

                    // search for partial key & title
                    var key = utilities.getParameterValues('key');
                    key = key ? key : utilities.getParameterValues('t');

                    if (key) {

                        loadPagesByKey(key);

                        otherContentWrapper.fadeIn('slow');
                        return; // don't show home anymore

                    }
                }

                // home page
                loadHomePage();

            }

            // start
            loadPages();

            // event
            // stop loader
            $(document).ready(function () {
                // place code to be executed on completion of last outstanding ajax call here
                utilities.hideProgressBar();
            });

            // handlers
            $(window).on('hashchange', function () {
                isHashChange = true;
                loadPages();
            });

        });
})();
}());