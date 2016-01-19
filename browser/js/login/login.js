app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, $uibModal, AuthService, CartFactory, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.open = function (id) {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'js/login/reset.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve:  {
                user: function (UserFactory ){
                    return UserFactory.fetchById(id).then(function(user){
                        console.log("found something", user)
                        user.password = null;
                        return user
                    });
                }
          }
        });

    };

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function (user) {
            if(user.reset ===true){
                $scope.open(user._id)
            }
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

app.controller('ModalInstanceCtrl', function ($scope,AuthService, $state, CartFactory, $uibModalInstance,AdminFactory, user) {

    $scope.user = user

    $scope.resetPW = function(inputtedUser){
        AdminFactory.updateUser(inputtedUser._id, { password: inputtedUser.password, reset: false} )
            .then(function(user){
                var loginInfo = { email: user.email, password: inputtedUser.password}
                AuthService.login(loginInfo).then(function (user) {
                return CartFactory.addLocalCartToServerCart(user);
            })
            .then(function(cart) {
                localStorage.setItem('cart','[]');
                $uibModalInstance.close()
                $state.go('home');
            }).catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
            })
    }


});