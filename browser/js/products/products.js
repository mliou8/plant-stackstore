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
            }
        }
    });
});

app.controller('ProductsCtrl', function($scope, allProducts, ProductFactory, allReviews) {
    //Returns the products scope object and maps onto it
    //two new properties. The average of the reviews, and how many there are

    $scope.products = allProducts.map(function (product) {
        product.reviews = allReviews.filter(function (review) {
            return review.product._id === product._id
        })
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
        }
    }
})