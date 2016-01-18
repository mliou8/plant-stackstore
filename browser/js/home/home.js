app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            },
            allReviews: function(ProductFactory) {
                return ProductFactory.fetchAllReviews();
            },
            allCategories: function(ProductFactory) {
                return ProductFactory.fetchAllCategories();
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, allProducts, allCategories, ProductFactory, allReviews) {
        //Returns the products scope object and maps onto it
          //two new properties. The average of the reviews, and how many there are
$scope.slides = allProducts;
console.log("slides", $scope.slides)
 $scope.products = allProducts.map(function (product) {
        product.reviews = allReviews.filter(function (review) {
            return review.product._id === product._id
        })
        product.categories = "";
        for (var i = 0; i < product.category.length; i++) {
            for (var j = 0; j < allCategories.length; j++) {
                if (allCategories[j]._id === product.category[i]) {
                    product.category[i] = allCategories[j].name;
                }
            }
        }
        var sum = 0;
        product.reviewLength = product.reviews.length;
        product.reviews.forEach(function (review) {
            sum = sum + review.rating
        })
        product.average = Math.floor((sum) / (product.reviewLength));
        return product;
    })
    console.log($scope.products);
});