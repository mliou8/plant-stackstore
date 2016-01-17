app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
<<<<<<< Updated upstream
||||||| merged common ancestors
            },
            allReviews: function(ProductFactory) {
                return ProductFactory.fetchAllReviews();
=======
            },
            allReviews: function(ProductFactory) {
                return ProductFactory.fetchAllReviews();
            },
            allCategories: function(ProductFactory) {
                return ProductFactory.fetchAllCategories();
>>>>>>> Stashed changes
            }
            // },
            // searchDB: function(SearchFactory) {
            //     return SearchFactory.searchDB();
            // }
        }
    });
});

<<<<<<< Updated upstream
app.controller('ProductsCtrl', function($scope, allProducts, ProductFactory) {
    $scope.products = allProducts;
||||||| merged common ancestors
app.controller('ProductsCtrl', function($scope, allProducts, ProductFactory, allReviews) {
    //Returns the products scope object and maps onto it
    //two new properties. The average of the reviews, and how many there are
=======
app.controller('ProductsCtrl', function($scope, allCategories, allProducts, ProductFactory, allReviews) {
    //Returns the products scope object and maps onto it
    //two new properties. The average of the reviews, and how many there are
>>>>>>> Stashed changes

<<<<<<< Updated upstream
    $scope.filterFunc = function (data) {

    }

    $scope.criteriaMatch = function( criteria ) {
        ProductFactory.fetchAll().
        then(function () {
            return function( item ) {
                return item.name === criteria.name;
            };
||||||| merged common ancestors
    $scope.products = allProducts.map(function (product) {
        product.reviews = allReviews.filter(function (review) {
            return review.product._id === product._id
        })
        var sum = 0;
        product.reviewLength = product.reviews.length;
        product.reviews.forEach(function (review) {
            sum = sum + review.rating
=======
    $scope.products = allProducts.map(function (product) {
        product.reviews = allReviews.filter(function (review) {
            return review.product._id === product._id
        })
        product.categories = "";
        //Roundabout way to map product category into "names" instead of
        // ids
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
>>>>>>> Stashed changes
        })
    };
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
        fetchReviewsById: function(id) {
            return $http.get('api/products/' + id + '/reviews')
            .then(function(response){
                return response.data;
            });
        },
        createReview: function(data) {
            return $http.post('api/review', data)
            .then(function(response){
                return response.data;
<<<<<<< Updated upstream
            })
||||||| merged common ancestors
            });
=======
            });
        },
        fetchAllCategories: function() {
            return $http.get('api/categories')
            .then (function (response) {
                return response.data;
            });
>>>>>>> Stashed changes
        }
        // getallProducts: function (name) {
        //     return $http.post('api/products', name)
        // }

    }
<<<<<<< Updated upstream
});

// app.factory('SearchFactory', function ($http) {
//     return {
//         //Returns an array with all products names
//         //passed in as strings. Serves as the "database"
//         searchDB: function (searchStr) {
//             var results = [];
//             return $http.post('api/products')
//             .then(function (response) {
//                 response.forEach(function (data) {
//                     results.push(data.name)
//                 })
//                 console.log(results);
//             })
//         }
//     }
// })
||||||| merged common ancestors
})
=======
})

>>>>>>> Stashed changes
