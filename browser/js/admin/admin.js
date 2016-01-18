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
	console.log($scope.orders)
	$scope.toggleShow = function (order) {
		console.log("order", order)
		if (order.showOrder) {
			console.log("setting to false")
			order.showOrder = false;
		} else {
			console.log("setting to true");
			order.showOrder = true;
		}
	}
	// $scope.EditOrder = function (data) {
		// return factory.editOrders(data)
	// }
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