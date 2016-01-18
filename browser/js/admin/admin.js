app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
        	allOrders: function (OrderFactory) {
        		return OrderFactory.fetchAllOrders();
        	},
        	allProducts: function (OrderFactory) {
        		return OrderFactory.allProducts();
        	}
        }
    });
});



app.controller('AdminCtrl', function ($scope, $state, OrderFactory, allOrders, allProducts) {
	//Options for Status edit
	  $scope.statusOptions = [
	    {value: 1, text: 'status1'},
	    {value: 2, text: 'status2'},
	    {value: 3, text: 'status3'},
	    {value: 4, text: 'status4'}
	  ];
	$scope.status = {
	    status: 2
  	};
	$scope.orders = allOrders.map (function (order) {
		order.productString = [];
		order.products.forEach(function (product) {
			allProducts.forEach(function (allProduct) {
				if (product.product === allProduct._id) {
					order.productString.push(allProduct.name, product.quantity);
				}
			})
		})
		order.productString = order.productString.join(", ");
		return order;
	})
	console.log("Scope.orders ", $scope.orders);
	$scope.toggleShow = function (order) {
		if (order.showOrder) {
			order.showOrder = false;
		} else {
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
		},
		allProducts: function (){
			return $http.get('/api/products')
			.then(function (response) {
				return response.data;
			})
		}
	}
})


