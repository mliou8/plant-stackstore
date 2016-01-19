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

	$scope.editOrder = function (data) {
		alert("Thanks for editing the order!")
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

    $scope.test = "hi"

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
  		    status: status
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
            			$scope.users =users;
            		})
        	})
    }
    $scope.mailtime = function (data) {
    	return MailFactory.transporter.sendMail(MailFactory.mailOptions, function(error, data){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + data.response);
		});
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
		editOrder: function (id, body) {
			console.log("id ", id)
			console.log("body", body)
			return $http.put('/api/orders/' + id, body)
			.then(function (response) {
				console.log("success");
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
	       return $http.put('api/user/' + id, data)
       .then(function(response){
           return response.data;
       })
   }

   AdminFactory.resetPW= function(id) {
       return $http.put('api/user/' + id, {reset: true})
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
		var nodemailer = require('nodemailer');
		var MailFactory = {};
		//create reusable transporter object using the default SMTP transport
		MailFactory.transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

		// set up email data with unicode symbols
		MailFactory.mailOptions = {
		    from: 'Awesome Sauce 👥 <plant.stackstore@gmail.com>', // sender address
		    to: 'plant.stackstore@gmail.com', // list of receivers
		    subject: 'Hello ✔', // Subject line
		    text: 'Hello world 🐴', // plaintext body
		    html: '<b>Hello world 🐴</b>' // html body
		};
		// send mail with defined transport object
		MailFactory.transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
		return MailFactory;
})


