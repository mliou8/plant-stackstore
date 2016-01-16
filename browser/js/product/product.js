app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/product.html',
        resolve: {
            product: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.productId);
            },
            reviews: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchReviewsById($stateParams.productId);
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('ProductCtrl', function($scope, CartFactory, ProductFactory, product, reviews, user) {
    $scope.product = product;
    $scope.reviews = reviews;
    $scope.username = user ? user.name : 'guest';
    $scope.amount = 1;

    $scope.addToCart = function() {
        if(user) {
            CartFactory.addToServerCart($scope.product._id,$scope.amount,user._id);
        } else {
            CartFactory.addToLocalCart($scope.product._id,$scope.amount);
        }
    }
});