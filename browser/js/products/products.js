app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            }
        }
    });
});

app.controller('ProductsCtrl', function($scope, allProducts) {
    $scope.products = allProducts;
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
        quantityRange: function(start, end) {
            var result = [];
            for(var i = start; i <= end && i <= 30; i++) {
                result.push(i);
            }
            return result;
        }
    }
});