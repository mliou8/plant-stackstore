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
            }
        }
    });
});

app.controller('ProductCtrl', function($scope, product, reviews) {
    $scope.product = product;
    $scope.reviews = reviews;
})