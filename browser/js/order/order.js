app.config(function($stateProvider) {
    $stateProvider.state('order', {
        url: '/order/:id',
        controller: 'OrderCtrl',
        templateUrl: 'js/order/order.html',
        resolve: {
            order: function($stateParams, OrderFactory) {
                return OrderFactory.fetchOne($stateParams.id);
            }
        }
    });
});

app.controller('OrderCtrl', function($scope, order) {
    $scope.order = order;
    console.log($scope.order);
});

//Factory to retrieve orders information
app.factory('OrderFactory', function ($http) {
    return {
        fetchAllOrders: function () {
            return $http.get('/api/orders')
            .then(function (response) {
                return response.data
            });
        },
        fetchOne: function (id) {
            return $http.get('/api/orders/' + id)
            .then(function(response) {
                return response.data;
            });
        },
        editOrder: function (id, body) {
            console.log("edit id ", id)
            console.log("edit body", body)
            return $http.put('/api/orders/' + id, body)
            .then(function (response) {
                return response.data;
            })
        },
        allProducts: function (){
            return $http.get('/api/products')
            .then(function (response) {
                return response.data;
            })
        }
    }
});