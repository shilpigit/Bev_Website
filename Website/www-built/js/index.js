//Load common code that includes config, then load the app logic for this page.
requirejs(['./js/common'], function (common) {
    requirejs(['app/view/home']);
});
