app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        templateUrl: 'js/user/user.html',
        controller: 'UserCtrl',
        resolve: {
            allUsers: function(UserFactory) {
                return UserFactory.fetchAll();
            },
            currentUser: function(AuthService){
                console.log("HERE")
                return AuthService.getLoggedInUser();
            }

        }    });

});

app.controller('UserCtrl', function ($scope, $state, UserFactory, currentUser, allUsers) {

     $scope.user = currentUser;
     console.log("user", currentUser)
     $scope.users = allUsers

     //for star ratings
     $scope.max = 5;
     //$scope.isReadonly = true;
     $scope.rating;

     $scope.editing = false;
     var reviewId = 0;

     $scope.checkId = function(id) {
        return id === reviewId;
     }

     $scope.changeStatus = function(id) {
        reviewId = id;
        $scope.editing = !$scope.editing;
        //$scope.isReadonly = false;
        return $scope.editing;
     }

     $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below
    $(this).removeClass("btn-default").addClass("btn-primary");
});

     UserFactory.fetchOrders($scope.user._id)
        .then(function(orders){
            console.log("orders", orders[0])
            $scope.user.orders =orders;
        })

     UserFactory.fetchReviews($scope.user._id)
        .then(function(reviews){
        console.log("REVIEWS", reviews)
        $scope.user.reviews =reviews;
    })

    $scope.updateReview = function(id, text, rating) {
        var submitObj = {
            text: text,
            rating: rating
        };
        UserFactory.updateReview(id, submitObj)
        .then(function(reviews){
            console.log("updated!", reviews);
            $scope.editing = false;
        })
    }

    $scope.deleteReview = function(id){
        UserFactory.deleteReview(id)
        .then(function(review){
            console.log("deleted!", review);
        })
        .then(function(){
            UserFactory.fetchReviews($scope.user._id)
            .then(function(reviews){
            console.log("REVIEWS", reviews)
            $scope.user.reviews =reviews;
            })
        })
    }

});

app.factory('UserFactory', function($http) {
    return {
        fetchById: function(id) {
            return $http.get('/api/user/' + id)
                .then(function(response) {
                    console.log("response", response.data)
                    return response.data;
                });
        },
        fetchAll: function() {
            return $http.get('/api/user')
                .then(function(response) {
                    console.log("response", response.data)
                    return response.data;
                });
        },
        fetchOrders: function(id) {
            return $http.get('/api/user/' + id + '/orders')
                .then(function(response) {
                    console.log("response", response.data)
                    return response.data;
                });
        },
        fetchReviews: function(id) {
            return $http.get('/api/user/' + id + '/reviews')
                .then(function(response) {
                    console.log("response", response.data)
                    return response.data;
                });
        },
        updateReview: function(id, data) {
            console.log("the id", id);
            return $http.put('api/review/' + id, data)
            .then(function(response){
                return response.data;
            })
        },
        deleteReview: function(id) {
            return $http.delete('api/review/' +id)
            .then(function(response){
                return response.data;
            })
        }
    }
});