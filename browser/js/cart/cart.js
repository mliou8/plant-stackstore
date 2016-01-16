app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartCtrl',
        templateUrl: 'js/cart/cart.html',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            cart: function(user, CartFactory) {
                if(user !== null) {
                    return CartFactory.getServerCart(user._id);
                } else {
                    return CartFactory.getLocalCart();
                }
            }
        }
    })
});

app.controller('CartCtrl', function($scope, CartFactory, ProductFactory, cart, user) {
    $scope.username = user ? user.name : 'guest';
    $scope.cart = cart.items;
    $scope.total = CartFactory.totalCartPrice($scope.cart);

    $scope.updateCart = function() {
        if(user !== null) {
            CartFactory.updateServerCart($scope.cart, user._id)
                .then(function(cart) {
                    $scope.cart = cart.items;
                    $scope.total = CartFactory.totalCartPrice($scope.cart);
                });
        } else {
            $scope.cart = $scope.cart.filter(function(item) {
                return item.quantity > 0;
            });
            CartFactory.updateLocalCart($scope.cart);
            $scope.total = CartFactory.totalCartPrice($scope.cart);
        }
    }
});

app.factory('CartFactory', function($http) {
    return {
        getLocalCart: function() {
            var cart = JSON.parse(localStorage.getItem('cart'));

            return $http.post('/api/products/cartlookup', { items: cart })
                .then(function(res) {
                    return res.data.items.map(function(product, i) {
                        return {
                            product: product,
                            quantity: cart[i].quantity
                        };
                    });
                });
        },
        getServerCart: function(user) {
            return $http.get('/api/user/'+user+'/cart')
                .then(function(res) {
                    return res.data;
                })
        },
        addToLocalCart: function(product, quantity) {
            var itemIdx;
            var i = 0;
            var cart = JSON.parse(localStorage.getItem('cart'));
            cart = cart !== null ? cart : [];
            console.log(cart);

            while(itemIdx === undefined && i < cart.length) {
                if(cart[i].product === product) {
                    itemIdx = i;
                }
                i++;
            }

            if(itemIdx !== undefined) {
                // if item is already present in cart, add new quantity to quantity in cart (or add 1 if no quantity specified)
                cart[itemIdx].quantity += quantity;
            } else {
                // if item is not present in cart, push item id & quanitity
                cart.push({
                    product: product,
                    quantity: quantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        },
        addToServerCart: function(product, quantity, user) {
            return $http.post('/api/user/'+user+'/cart', {
                items: [{
                    product: product,
                    quantity: quantity
                }]
            })
                .then(function(res) {
                    return res.data;
                });
        },
        updateLocalCart: function(cart) {
            var localCart = cart.map(function(item) {
                return {
                    product: item.product._id,
                    quantity: item.quantity
                }
            })
            localStorage.setItem('cart', JSON.stringify(localCart));
        },
        updateServerCart: function(cart, user) {
            var items = cart.map(function(item) {
                return {
                    product: item.product._id,
                    quantity: item.quantity
                };
            });

            return $http({
                method: 'PUT',
                url: '/api/user/'+user+'/cart',
                data: {
                    items: items
                }
            })
                .then(function(res) {
                    return res.data;
                });
        },
        totalCartPrice: function(cart) {
            console.log(cart);
            return cart.reduce(function(prev,cur) {
                return prev+(cur.product.price*cur.quantity);
            },0);
        }
    }
})