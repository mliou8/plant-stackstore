app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        templateUrl: 'js/user/user.html',
        controller: 'UserCtrl',
        resolve: {
            allUsers: function(UserFactory) {
                return UserFactory.fetchAll();
            }
        }    });

});

app.controller('UserCtrl', function ($scope, $state, UserFactory, allUsers) {

    $scope.users = allUsers
    console.log("all users", $scope.users)
    $scope.user = $scope.users[0]
    console.log("current user", $scope.user)


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
    }
});