app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
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

app.controller('ProductsCtrl', function($scope, allProducts, allCategories, ProductFactory, allReviews) {
          //Returns the products scope object and maps onto it
          //two new properties. The average of the reviews, and how many there are
 console.log("all products", allProducts)
  console.log("all reviews", allReviews)

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

app.factory('ProductFactory', function($http) {
    return {
        fetchAll: function() {
            return $http.get('/api/products')
                .then(function(response) {
                    return response.data;
                });
        },
        fetchById: function(id) {
            return $http.get('/api/products/' + id)
                .then(function(response) {
                    return response.data;
                });
        },
        createReview: function(data) {
            return $http.post('api/review', data)
            .then(function(response){
                return response.data;
            })
        },
        fetchReviewsById: function(id) {
            return $http.get('api/products/reviews/' + id)
            .then(function(response){
                return response.data;
            });
        },
        fetchAllReviews: function() {
            return $http.get('api/review')
            .then (function (response) {
                return response.data;
            });
        },
        fetchAllCategories: function() {
            return $http.get('api/categories')
            .then (function (response) {
                return response.data;
            });
        }
    }
})