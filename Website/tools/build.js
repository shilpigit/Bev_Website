{
    appDir: '../',
        mainConfigFile
:
    '../js/common.js',
        dir
:
    '../www-built',
        wrap
:
    true,
        fileExclusionRegExp
:
    /node_modules|tools/,
        removeCombined
:
    true,
        optimize
:
    'none',
        modules
:
    [
        {
            name: '../common',
            include: [
                'jquery',
                'amplify',
                'bootstrap',
                'toastr',
                'select2',
                'owlCarousel',
                'mandrill',
                'validate',
                'waitMe',
                'momentTimezone',
                'moment',
                'nProgress'
            ]
        },

        {
            name: 'app/view/home',
            exclude: ['../common']
        }

    ]
}