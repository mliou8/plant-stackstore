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
        	isadmin: function (AuthService, $state) {
        	 AuthService.getLoggedInUser()
        		.then (function (user) {
        			console.log("user ", user);
        			if(!user.admin || !user) {
        				console.log("Naughty naughty");
        				return $state.go('home');
        			}
        			return
        		})
		    },
            allUsers: function (UserFactory) {
        		return UserFactory.fetchAll();
        	}
        }
    });
});

app.controller('AdminCtrl', function ($scope, $state, OrderFactory, UserFactory, AdminFactory, allOrders, allProducts, allUsers, MailFactory) {
	//Options for Status edit

	$scope.statusOptions = [
	  {value: 'pending', text: 'pending'},
	  {value: 'completed', text: 'completed'},
	  {value: 'delivered', text: 'delivered'},
	  {value: 'shipped', text: 'shipped'}
	];

  $scope.sendMail = function (data) {
    console.log("Got into Controller")
    return MailFactory.sendMail(data);
  }
	$scope.editOrder = function (data) {
		alert("Thanks for editing the order!")
    $scope.sendMail(data);
		return OrderFactory.editOrder(data._id, data);
	}

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

    $scope.updateStatus = function(status, id){
    	console.log("status", status)
    }

    $scope.changeStatus = function(id) {
       userId = id;
       $scope.editing = !$scope.editing;
       return $scope.editing;
    }

  	$scope.updateUser = function(status, id) {
  		var submitObj = {
  		    admin: status
  		};

  		AdminFactory.updateUser(id, submitObj)
  			.then(function(user){
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
            		$scope.users =users;
            	})
        })
    }

    $scope.resetPW = function(id){
        AdminFactory.resetPW(id)
        	.then(function(){
            	UserFactory.fetchAll()
            		.then(function(users){
            			$scope.users = users;
            		})
        	})
    }
});

app.factory('AdminFactory', function($http){
   var AdminFactory = {}

   AdminFactory.updateUser= function(id, data) {
	       return $http.put('/api/user/' + id, data)
       .then(function(response){
           return response.data;
       })
   }

   AdminFactory.resetPW= function(id) {
       return $http.put('/api/user/' + id, {reset: true})
       .then(function(response){
           return response.data;
       })
   }

   AdminFactory.deleteUser= function(id, data) {
       return $http.delete('api/user/' + id, data)
       .then(function(response){
           return response.data;
       })
   }
    return AdminFactory;

})

app.factory('MailFactory', function ($http) {
 return {
    sendMail: function (data) {
      console.log("Factory")
          $http.post('/api/email', data)
    }
  }
})


