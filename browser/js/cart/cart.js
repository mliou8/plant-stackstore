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
                return CartFactory.getCart(user)
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        }
    })
});

app.controller('CartCtrl', function($scope, $state, CartFactory, ProductFactory, cart, user) {
    console.log(cart);
    $scope.username = user !== null ? user.name : 'guest';
    $scope.cart = cart.items;
    console.log($scope.cart);
    $scope.total = CartFactory.totalCartPrice($scope.cart);

    $scope.updateCart = function() {
        CartFactory.updateCart($scope.cart,user)
        .then(function(cart) {
            console.log('new $scope.cart',cart);
            $scope.cart = cart;
            $scope.total = CartFactory.totalCartPrice($scope.cart);
        });
    }

    $scope.checkout = function() {
        $state.go('checkout');
    }
});

app.factory('CartFactory', function($http) {
    var addToLocalCart = function(items) {
        var itemIdx;
        var k;
        var cart = JSON.parse(localStorage.getItem('cart'));
        cart = cart !== null ? cart : [];

        for(var i = 0; i < items.length; i++) {
            k = 0;
            itemIdx = undefined;

            while(itemIdx === undefined && k < cart.length) {
                if(cart[k].product === items[i].product) {
                    itemIdx = k;
                }
                k++;
            }
    
            if(itemIdx !== undefined) {
                // if item is already present in cart, add new quantity to quantity in cart (or add 1 if no quantity specified)
                cart[itemIdx].quantity += quantity;
            } else if(items[i].quantity >= 0) {
                // if item is not present in cart, push item id & quanitity
                cart.push(items[i]);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    var addToServerCart = function(items, user) {
        return $http.post('/api/user/'+user+'/cart', { items: items })
            .then(function(res) {
                return res.data;
            });
    };
    var applyDiscount = function(price, discount) {

    };

    var getLocalCart = function() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var promoCode = localStorage.getItem('promo');
        if(cart === null) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        return $http.post('/api/products/cartlookup', { items: cart })
            .then(function(res) {
                res.data.items = res.data.items.map(function(item, i) {
                    return {
                        product: item,
                        quantity: cart[i].quantity
                    }
                })
                if(promoCode !== null) {
                    res.data.promo = {
                        code: promoCode
                    };
                }
                return res.data;
            });
    };

    var getServerCart = function(user) {
        return $http.get('/api/user/'+user+'/cart')
            .then(function(res) {
                return res.data;
            })
    };

    var updateLocalCart = function(cart) {
        cart = cart.filter(function(item) {
            return item.quantity !== 0;
        });
        
        var localCart = cart.map(function(item) {
            return {
                product: item.product._id,
                quantity: item.quantity
            }
        })
        localStorage.setItem('cart', JSON.stringify(localCart));

        return cart;
    };

    var updateServerCart = function(cart, user) {
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
                return res.data.items;
            });
    };

    return {
        getCart: function(user) {
            if(user !== null) {
                return getServerCart(user._id);
            } else {
                return getLocalCart();
            }
        },
        addToCart: function(items, user) {
            if(user !== null) {
                addToServerCart(items, user._id);
            } else {
                addToLocalCart(items);
            }
        },
        addLocalCartToServerCart: function(user) {
            var cart = JSON.parse(localStorage.getItem('cart'));
            if(cart === null) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            return $http.post('/api/user/'+user._id+'/cart', { items: cart })
                .then(function(res) {
                    return res.data;
                })
        },
        updateCart: function(cart, user) {
            if(user !== null) {
                return updateServerCart(cart,user._id)
                    .then(function (cart) {
                        return cart;
                    });
            } else {
                var p = Promise.resolve(updateLocalCart(cart));
                console.log(p);
                return p;
            }
        },
        totalCartPrice: function(cart) {
            console.log('totalprice cart',cart);
            var total = cart.reduce(function(prev,cur) {
                return prev+(cur.product.price*cur.quantity*((100-cur.discount)/100));
            },0);
            console.log('total',total);
            return total;
        }
    }
})