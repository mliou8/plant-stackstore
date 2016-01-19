app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'CheckoutCtrl',
        templateUrl: 'js/checkout/checkout.html',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            cart: function(user, CartFactory) {
                return CartFactory.getCart(user)
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        }
    })
});

app.controller('CheckoutCtrl', function($scope, CartFactory, CheckoutFactory, cart, user) {
    $scope.user = {
        _id: user._id,
        address: user.address,
        email: user.email,
        name: user.name
    };
    $scope.cart = cart;
    $scope.total = CartFactory.totalCartPrice($scope.cart);
    $scope.invalidPromo = false;

    $scope.createOrder = function() {
        console.log($scope.user);
        console.log($scope.shippingInfo);
    }

    $scope.applyPromo = function() {
        CheckoutFactory.fetchPromo($scope.promoForm.code.$modelValue)
        .then(function(promo) {
            console.log(cart, promo);
            $scope.cart.promo = promo;
            return CheckoutFactory.applyPromo($scope.cart, user, $scope.promo);
        })
        .then(function(cart) {
            console.log(cart);
            $scope.cart = cart;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
});

app.factory('CheckoutFactory', function($http) {
    var createPromoCart = function(promo, cart) {
        //
    };
    
    return {
        applyPromo: function(cart, user, promo) {
            if(user !== null) {
                return $http.post('/api/user/'+user._id, { code: promo })
                    .then(function(res) {
                        //
                    })
            } else {
                
            }
        },
        fetchPromo: function(promo) {
            return $http.get('/api/promo/'+promo)
                .then(function(res) {
                    return res.data;
                })
        }
        // sendOrder: function(cart, user) {
        //     return $http.post('/api/order', {})
        //         .then(function(res) {
        //             return res.data;
        //         });
        // }
    };
})
