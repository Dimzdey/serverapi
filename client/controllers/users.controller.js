var app = angular.module('App');
app.controller('UsersController', [
    '$scope',
    '$http',
    '$location',
    '$cookies',
    '$rootScope',
    function($scope, $http, $location, $cookies, $rootScope) {

        $scope.badCredentials = false;
        $scope.login = function() {
            $http.post('/api/login/', $scope.userCredentials).then(fulfilled, rejected);

            function fulfilled(response) {
                $cookies.put('token', response.headers('x-auth'));
                $cookies.put('username', response.data.username);
                $cookies.put('user_id', response.data._id);

                window.location.href = '#!/items';

                $rootScope.user = response.data.username;
                $rootScope.token = response.headers('x-auth');
            };

            function rejected(error) {                
                $scope.badCredentials = true;
            };
        }

        $scope.register = function() {
            $http.post('/api/register/', $scope.userCredentials).then(fulfilled, rejected);

            function fulfilled(response) {
            };

            function rejected(error) {
              $scope.badCredentials = true;
            };
        }

    }
]);
