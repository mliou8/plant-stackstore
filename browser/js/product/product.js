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
            // currentUser: function(AuthService){
            //     console.log("HERE")
            //     return AuthService.getLoggedInUser();
            // }
        }
    });
});

app.controller('ProductCtrl', function($scope, reviews, product, ProductFactory, AuthService, $stateParams) {
    $scope.product = product;

    ProductFactory.fetchReviewsById($stateParams.productId)
    .then(function(reviews){
        $scope.reviews=reviews;
        // Keeping original review code here in case we want to use it
        // var sum = 0;
        // $scope.reviewsLength = reviews.length;
        // reviews.forEach(function (data) {
        //     sum = sum + data.rating
        // })
        // $scope.average = Math.floor(sum/($scope.reviewsLength));
    })

    AuthService.getLoggedInUser()
    .then(function(currentUser){
        $scope.user = currentUser;
    })

    //logic for making the button show and disappear
    $scope.showButton = true;

    //logic for making form show and disappear
    $scope.formSubmitted = false;

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
        // if ($scope.text) {
        //   $scope.list.push(this.text);
        //   $scope.text = '';
        // }

        $scope.submitObject = {};
        $scope.submitObject.rating = $scope.rate;
        $scope.submitObject.text = $scope.text;
        $scope.submitObject.product = $scope.product;
        $scope.submitObject.user = $scope.user._id;

        ProductFactory
        .createReview($scope.submitObject)
        .then(function(review){
            $scope.list.push(review);
            $scope.text = '';

            ProductFactory.fetchReviewsById($stateParams.productId)
            .then(function(reviews){
            $scope.reviews=reviews;
            $scope.formSubmitted = true;
            })
        })
    }
})