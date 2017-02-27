var app = angular.module('App');
app.controller('ReviewController', [
    '$scope',
    '$http',
    '$cookies',
    '$routeParams',
    function($scope, $http, $cookies, $routeParams) {

        $scope.stars = [5, 4, 3, 2, 1];
        $scope.selectedStars;
        $scope.getSelectedStars = function() {
            if ($scope.selectedStars !== undefined)
                return $scope.selectedStars;
            }

        $scope.getItem = function() {
            let id = $routeParams.id;
            $http.get('/api/items/' + id).then(fulfilled, rejected);
            function fulfilled(response) {
                $scope.item = response.data;
            };
            function rejected(error) {
                console.error(error.status);
                console.error(error.statusText);
            };
        }

        $scope.getReviews = function() {
            var id = $routeParams.id;
            $http.get('/api/reviews/' + id).then(fulfilled, rejected);
            function fulfilled(response) {

                $scope.checkReviews = function() {
                    if (response.data.length <= 0) {
                        return false
                    } else {
                        return true
                    }
                }
                $scope.revievs = response.data;
            };
            function rejected(error) {
                console.error(error.status);
                console.error(error.statusText);
            };
        }

        $scope.getReviews();

        $scope.reviewText;

        $scope.postReview = function() {
            var id = $routeParams.id;
            $http.post('/api/reviews/', {
                product: id,
                rating: $scope.selectedStars,
                text: $scope.reviewText,
                created_by: {
                    user_id: $cookies.get('user_id'),
                    username: $cookies.get('username')
                }
            }).then(fulfilled, rejected);
            function fulfilled(response) {
              $scope.getReviews();
            };

            function rejected(error) {
                console.error(error.status);
                console.error(error.statusText);
            };
        }

        $scope.currentUser = function() {
            $http.get('/api/users/me').then(fulfilled, rejected);

            function fulfilled(response) {
                $scope.user = response.data;
            };
            function rejected(error) {
                console.error(error);
            };
        }

    }
]);
