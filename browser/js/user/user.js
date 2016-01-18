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

     UserFactory.fetchOrders($scope.user._id)
        .then(function(orders){
            console.log("orders", orders)
            $scope.user.orders =orders;
        })

     UserFactory.fetchReviews($scope.user._id)
    .then(function(reviews){
        console.log("REVIEWS", reviews)
        $scope.user.reviews =reviews;
    })

    $scope.updateReview = function(id, data, type) {
        console.log("type is:", type);
        //console.log("data is: ", data);
        var submitObj = {};
        submitObj[type] = data;
        UserFactory.updateReview(id, submitObj)
        .then(function(reviews){
            console.log("updated!", reviews);
        })
    }

    // UserFactory.updateReview()
    //update a user's review
    // UserFactory.updateReview()

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
        }
    }
});