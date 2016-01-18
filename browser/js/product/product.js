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
        CartFactory.addToCart([{
            product: $scope.product._id,
            quantity: $scope.amount
        }],user);
    }
});