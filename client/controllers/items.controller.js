var myApp = angular.module('App');

myApp.controller('ItemsController', [
    '$scope',
    '$http',
    '$location',
    '$routeParams',
    function($scope, $http, $location, $routeParams) {

        // Asking for evry item on server
        $scope.getItems = function() {
            $http.get('/api/items')
              .then(fulfilled, rejected);
            function fulfilled(response) {
                $scope.items = response.data.items;
            };
            function rejected(error) {
                console.error(error.status);
                console.error(error.statusText);
            };
        }

        //initital launch
        $scope.getItems();


        // adding item
        $scope.addItem = function() {
            $http.post('/api/items/', $scope.item)
              .then(fulfilled, rejected);
            function fulfilled(response) {
                window.location.href = '#!/items';

            };
            function rejected(error) {
                console.error(error);
            };
        }



        //Cut string if its larger than 'n'
        String.prototype.trunc = String.prototype.trunc || function(n) {
            return this.length > n
                ? this.substr(0, n - 1) + '...'
                : this.toString();
        };

    }
]);
