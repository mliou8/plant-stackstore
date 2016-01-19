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
        	},
            allUsers: function (UserFactory) {
        		return UserFactory.fetchAll();
        	}
        }
    });
});



app.controller('AdminCtrl', function ($scope, $state, OrderFactory, UserFactory, AdminFactory, allOrders, allProducts, allUsers) {
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

	$scope.users = allUsers;
     $scope.adminMessage = "Select Status"
     $scope.editing = false;
     var userId = 0;
     $scope.statuses = ["true", "false"]

     $scope.checkId = function(id) {
        return id === userId;
     }

     $scope.test = "hi"

     $scope.updateStatus = function(status, id){
     	console.log("status", status)
     }
     $scope.changeStatus = function(id) {
        userId = id;
        $scope.editing = !$scope.editing;
        return $scope.editing;
     }

    // $scope.updateUser = function(id, text, rating) {
    //     var submitObj = {
    //         text: text,
    //         rating: rating
    //     };
    //     AdminFactory.updateUser(id, submitObj)
    //     .then(function(user){
    //         console.log("updated!", user);
    //         $scope.editing = false;
    //     })
    // }

  $scope.updateUser = function(status, id) {
  	console.log("new status", status)
        var submitObj = {
            status: status
        };
        AdminFactory.updateUser(id, submitObj)
        .then(function(user){
            console.log("updated!", user);
            $scope.editing = false;
        })
    }

    $scope.deleteUser = function(id){
        AdminFactory.deleteUser(id)
        .then(function(user){
            console.log("deleted!", user);
        })
        .then(function(){
            UserFactory.fetchAll()
            .then(function(users){
            console.log("USERS", users)
            $scope.users =users;
            })
        })
    }


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

app.factory('AdminFactory', function($http){
   var AdminFactory = {}

   AdminFactory.updateUser= function(id, data) {
       console.log("the id", id);
       return $http.put('api/user/' + id, data)
       .then(function(response){
           return response.data;
       })
   }

   AdminFactory.deleteUser= function(id, data) {
       console.log("the id", id);
       return $http.delete('api/user/' + id, data)
       .then(function(response){
           return response.data;
       })
   }

    return AdminFactory

})


