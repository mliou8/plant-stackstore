app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            }
            // },
            // searchDB: function(SearchFactory) {
            //     return SearchFactory.searchDB();
            // }
        }
    });
});

app.controller('ProductsCtrl', function($scope, allProducts, ProductFactory) {
    $scope.products = allProducts;

    $scope.filterFunc = function (data) {

    }

    $scope.criteriaMatch = function( criteria ) {
        ProductFactory.fetchAll().
        then(function () {
            return function( item ) {
                return item.name === criteria.name;
            };
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
            })
        }
        // getallProducts: function (name) {
        //     return $http.post('api/products', name)
        // }

    }
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
