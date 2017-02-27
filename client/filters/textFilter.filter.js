var myApp = angular.module('App');

myApp.filter('newlines', function () {
    return function(text) {
        return text.replace(/\n/g, '<br/>');
    }
});
