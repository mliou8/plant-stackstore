app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/product.html',
        resolve: {
            product: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.productId);
            }
        }
    });
});

app.controller('ProductCtrl', function($scope, product) {
    $scope.product = product;
})