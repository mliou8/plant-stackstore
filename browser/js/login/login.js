app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, CartFactory, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;
        console.log("login info", loginInfo)

        AuthService.login(loginInfo).then(function (user) {
            console.log(CartFactory);
            return CartFactory.addLocalCartToServerCart(user);
        })
        .then(function(cart) {
            localStorage.setItem('cart','[]');
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };


});