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

    //logic for making the button show and disappear
    $scope.showButton = true;

    //logic for star ratings
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    };

    //logic for review submit form
    $scope.list = [];
      $scope.text = 'Write your review here';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }
    }
})