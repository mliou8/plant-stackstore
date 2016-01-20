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
            },
            promo: function(cart, user, CheckoutFactory) {
                if(cart.promo) {
                    return CheckoutFactory.fetchPromo(cart.promo.code)
                        .catch(function(err) {
                            return {
                                code: err.data,
                                status: err.status
                            };
                        });
                } else {
                    return {
                        code: undefined,
                        status: undefined
                    };
                }
            }
        }
    })
});

app.controller('CheckoutCtrl', function($scope, CartFactory, CheckoutFactory, cart, promo, user) {
    if(user !== null) {
        $scope.user = {
            _id: user._id,
            address: user.address,
            email: user.email,
            name: user.name
        };
    }

    $scope.promo = promo.code !== undefined ? promo : undefined;
    $scope.invalidPromo = promo.status === 404 ? true : false;
    $scope.expiredPromo = promo.status === 410 ? true : false;
    $scope.cart = CheckoutFactory.addDiscounts(cart.items, $scope.promo);
    console.log($scope.cart, cart);
    $scope.total = CartFactory.totalCartPrice($scope.cart);
    console.log($scope.total);
    $scope.changePromo = false;
    console.log($scope.promo);

    $scope.createOrder = function() {
        var recipient = {
            name: $scope.shippingInfo.name.$modelValue,
            address: $scope.shippingInfo.address.$modelValue,
            email: $scope.shippingInfo.email.$modelValue
        }
        CheckoutFactory
            .sendOrder(cart, $scope.promo, recipient, user)
            .then(function(order) {
                console.log(order);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    $scope.applyPromo = function() {
        $scope.expiredPromo = false;
        $scope.invalidPromo = false;
        var newCode = $scope.promoCode;
        $scope.promoCode = undefined;
        CheckoutFactory.fetchPromo(newCode)
        .then(function(promo) {
            $scope.promo = promo;
            $scope.changePromo = false;
            return CheckoutFactory.setPromo(user, $scope.promo);
        })
        .then(function(promo) {
            $scope.cart = CheckoutFactory.addDiscounts(cart.items, $scope.promo);
            $scope.total = CartFactory.totalCartPrice($scope.cart);
        })
        .catch(function(err) {
            // promo code not found
            if(err.status === 404) {
                $scope.promo = {
                    code: err.data
                };
                $scope.invalidPromo = true;
            }
            // promo code has expired
            else if(err.status === 410) {
                $scope.promo = {
                    code: err.data
                };
                $scope.expiredPromo = true;
            } else {
                console.log(err);
            }
        });
    }

    $scope.newPromo = function() {
        console.log('change');
        $scope.changePromo = true;
    }

    $scope.cancelNewPromo = function() {
        console.log($scope.changePromo);
        $scope.changePromo = false;
        $scope.promoCode = undefined;
    }

    $scope.deletePromo = function() {
        CheckoutFactory.deletePromo(user)
            .then(function(info) {
                $scope.promo = undefined;
                $scope.expiredPromo = false;
                $scope.invalidPromo = false;
                $scope.cart = CheckoutFactory.addDiscounts(cart.items, $scope.promo);
                $scope.total = CartFactory.totalCartPrice($scope.cart);
                if(user === null) {
                    $scope.$digest();
                }
            })
            .catch(function(err) {
                console.log(err);
                $scope.promo = undefined;
                $scope.expiredPromo = false;
                $scope.invalidPromo = false;
                $scope.cart = CheckoutFactory.addDiscounts(cart.items, $scope.promo);
                $scope.total = CartFactory.totalCartPrice($scope.cart);
                if(user === null) {
                    $scope.$digest();
                }
            })
    }
});

app.factory('CheckoutFactory', function($http) {
    return {
        addDiscounts: function(cart, promo) {
            console.log('addDiscounts cart',cart);
            return cart.map(function(item) {
                if(promo && promo.appliesTo === 'product' && item.product._id === promo.product) {
                    console.log('product discount');
                    return {
                        product: item.product,
                        quantity: item.quantity,
                        discount: promo.discount
                    };
                } else if(promo && promo.appliesTo === 'category' && item.product.category.indexOf(promo.category)) {
                    console.log('category discount');
                    return {
                        product: item.product,
                        quantity: item.quantity,
                        discount: promo.discount
                    };
                } else if(promo && promo.appliesTo === 'all') {
                    console.log('all discount');
                    return {
                        product: item.product,
                        quantity: item.quantity,
                        discount: promo.discount
                    };
                } else {
                    console.log('no discount');
                    return {
                        product: item.product,
                        quantity: item.quantity,
                        discount: 0
                    }
                }
            })
        },
        deletePromo: function(user) {
            if(user !== null && user !== undefined) {
                return $http({
                    method: 'DELETE',
                    url: '/api/user/'+user._id+'/promo'
                })
            } else {
                localStorage.removeItem('promo');
                return Promise.resolve('ok');
            }
        },
        fetchPromo: function(code) {
            return $http.get('/api/promo/code/'+code)
                .then(function(res) {
                    return res.data;
                })
        },
        setPromo: function(user, promo) {
            console.log(promo);
            if(user !== null) {
                return $http.post('/api/user/'+user._id+'/promo', { code: promo.code })
                    .then(function(res) {
                        return res.data;
                    })
            } else {
                localStorage.setItem('promo', promo.code);
                return Promise.resolve(promo);
            }
        },
        sendOrder: function(cart, promo, recipient, user) {
            console.log('cart',cart,'promo',promo,'recipient',recipient,'user',user)
            return $http.post('/api/order',{
                user: user !== null ? user._id : undefined,
                cart: cart._id !== undefined ? cart._id : cart.items.map(function(item) {
                    return {
                        product: item.product._id,
                        quantity: item.quantity
                    }
                }),
                promo: promo._id,
                recipient: recipient
            })
                .then(function(res) {
                    return res.data;
                });
        }
    };
})
