(function () {
    'use strict';

    define([
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
