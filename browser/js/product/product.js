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

app.controller('ProductCtrl', function($scope, product, reviews) {
    $scope.product = product;
    $scope.reviews = reviews;
    var range = function(start,end) {
        var result = [];
        for(var i = start; i <= end && i <= 30; i++) {
            result.push({
                name:i,
                val:i
            });
        }
        return result;
    }
    $scope.quantities = range(1,product.stock);
    $scope.amount = 1;

    $scope.addToCart = function() {
        console.log($scope.amount,$scope.product._id);
    }
})