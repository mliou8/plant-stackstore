app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
        	allOrders: function (OrderFactory) {
        		return OrderFactory.fetchAllOrders();
        	}
        }
    });
});



app.controller('AdminCtrl', function ($scope, $state, OrderFactory, allOrders) {

	$scope.orders = allOrders;

	$scope.showOrder = false;
	$scope.toggleShow = function () {
		if ($scope.showOrder) {
			$scope.showOrder = false;
		} else {
			$scope.showOrder = true;
		}
	}
	$scope.oneOrder = OrderFactory.fetchOrderbyId();

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
		fetchOrderbyId: function (id) {
			return $http.get('/api/orders/' + id)
			.then(function(response) {
				return response.data;
			});
		},
		editOrders: function (data) {
			return $http.put('/api/orders', data)
			.then(function (response) {
				return response.data;
			})
		}
	}
})