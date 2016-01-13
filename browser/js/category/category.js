app.config(function($stateProvider) {
    $stateProvider.state('category', {
        url: '/categories/:categoryName',
        // controller: 'CategoryCtrl',
        templateUrl: 'js/category/category.html',
        controller: function($scope, $stateParams, product) {
            $scope.category = $stateParams.categoryName;
            $scope.product=product;
        },
        resolve: {
            product: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.productId);
            }
        }
    });
});

// app.controller('CategoryCtrl', function($scope, $stateParams) {
//     console.log($stateParams);
//     $scope.category = $stateParams.categoryName;
// })