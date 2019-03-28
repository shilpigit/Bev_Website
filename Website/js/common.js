//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'js/app',
    paths: {
        app: '../app',

        // plugin for text!
        text: '../lib/require-text',

        jquery: '../../bower_components/jquery/dist/jquery',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap.min',
        amplify: '../../bower_components/amplify/lib/amplify',
        toastr : '../../bower_components/toastr/toastr',
        select2 : '../../bower_components/select2/dist/js/select2.full.min',
        owlCarousel : '../../bower_components/owl.carousel/dist/owl.carousel.min',
        mandrill : '../../bower_components/mandrill-api/mandrill.min',
        validate : '../../bower_components/jquery-validation/dist/jquery.validate.min',
        waitMe : '../../bower_components/wait-me/dist/waitMe.min',
        momentTimezone : '../../bower_components/moment-timezone/builds/moment-timezone-with-data.min',
        moment : '../../bower_components/moment/min/moment.min',
        nProgress : '../../bower_components/nprogress/nprogress',

        template: '../../views',
        
        model: 'model',
        dataAccess: 'controller',
        service: 'service',
        view: 'view'

    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        amplify: {
            deps: ['jquery'],
            exports: 'amplify'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        toastr: {
            deps: ['jquery'],
            exports: 'toastr'
        },
        select2: {
            deps: ['jquery'],
            exports: 'select2'
        },
        owlCarousel: {
            deps: ['jquery'],
            exports: 'owlCarousel'
        },
        mandrill: {
            deps: ['jquery'],
            exports: 'mandrill'
        },
        validate: {
            deps: ['jquery'],
            exports: 'validate'
        },
        waitMe: {
            deps: ['jquery'],
            exports: 'waitMe'
        },
        momentTimezone:{
            deps: ['jquery'],
            exports: 'momentTimezone'
        },
        moment:{
            deps: ['jquery'],
            exports: 'moment'
        },
        nProgress: {
            deps: ['jquery'],
            exports: 'nProgress'
        },
        model: {
            deps: ['jquery'],
            exports: 'model'
        },
        dataAccess: {
            deps: ['jquery','amplify'],
            exports: 'dataAccess'
        },
        view: {
            deps: ['jquery'],
            exports: 'view'
        }
    }
});
