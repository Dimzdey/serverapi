var app = angular.module('App', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCookies', 'ngRateIt']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'ItemsController',
        templateUrl: 'views/items.view.html'
    }).when('/items', {
        controller: 'ItemsController',
        templateUrl: 'views/items.view.html'
    }).when('/items/details/:id', {
        controller: 'ReviewController',
        templateUrl: 'views/items_details.view.html'
    }).when('/items/add', {
        controller: 'ItemsController',
        templateUrl: 'views/add_item.view.html'
    }).when('/login', {
        controller: 'UsersController',
        templateUrl: 'views/login.view.html'
    }).otherwise({redirectTo: '/'});
});

app.run(function($rootScope, $cookies) {
    if ($cookies.get('token') && $cookies.get('username')) {
      $rootScope.token  = $cookies.get('token');
      $rootScope.user = $cookies.get('username');
    }
})
app.filter('nl2br', ['$sce', function ($sce) {
    return function (text) {
        return text ? $sce.trustAsHtml(text.replace(/\n/g, '<br/>')) : '';
    };
}]);
app.controller('MainController', [
    '$http',
    '$scope',
    '$location',
    '$routeParams',
    '$cookies',
    '$rootScope',
    function($http, $scope, $location, $routeParams, $cookies, $rootScope) {

        $scope.logout = function () {
          var config = {
            headers: {'x-auth': $cookies.get('token')}
          };
          $http.delete('/api/logout', config).then(fulfilled,rejected);
          function fulfilled(response) {
          };
          function rejected(error) {
            console.error(error);
          };

          $cookies.remove('username');
          $cookies.remove('token');
          $cookies.remove('user_id');
          $rootScope.user  = null;
          $rootScope.token = null;

        }

        $scope.locationAddChange; //Returns FALSE if location = main or items

        $scope.$on('$routeChangeStart', function(next, current) {
            if ($location.path() == '/' || $location.path() == '/items') {
                $scope.locationAddChange = false;
            } else {
                $scope.locationAddChange = true;
            }
        });

        $scope.$back = function() {
            window.history.back();
        };

    }
]);
