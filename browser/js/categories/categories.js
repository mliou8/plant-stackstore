app.config(function ($stateProvider) {
    $stateProvider.state('categories', {
        url: '/categories',
        templateUrl: 'js/categories/categories.html',
        controller: 'CategoriesCtrl',
        resolve: {
        	allCategories: function (CategoryFactory){
        		return CategoryFactory.fetchAll();
        	},
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('CategoriesCtrl', function($scope, allCategories, user, CategoryFactory){
	$scope.categories = allCategories;
    $scope.adminEditing = false;
    $scope.user = user;

    //logic for admin editing
    $scope.editClicked = function() {
        $scope.adminEditing = !$scope.adminEditing;
        return $scope.adminEditing;
    }

    $scope.addCategory = function() {
        console.log("SCOPED CATEGORIES: ", $scope.categories);
        console.log($scope.category);
        var submitObj = {
            name: $scope.category
        }
        return CategoryFactory.createCategory(submitObj)
        .then(function(category){
            console.log("CATEGORIES: ", category);
            $scope.categories.push(category);
            //$scope.categories = categories;
        })
    }

    $scope.deleteCategory = function(category) {
        console.log("INDEX OF: ", $scope.categories.indexOf(category));
        return CategoryFactory.deleteCategory(category._id)
        .then(function(){
            $scope.categories.splice($scope.categories.indexOf(category),1);
        })
    }
})

app.factory('CategoryFactory', function($http) {
	var CategoryFactory = {}
	CategoryFactory.fetchAll = function() {
		return $http.get('/api/categories')
		.then(function(response){
			return response.data;
		})
	};

    CategoryFactory.fetchById = function(id) {

        return $http.get('/api/categories/' + id)
        .then(function(response){
            return response.data;
        });
    };

    CategoryFactory.fetchByName = function(name) {
        return $http.get('/api/categories/name/'+ name)
        .then(function(response){
            console.log("response:" + response.data);
            return response.data;
        })
    };

    CategoryFactory.createCategory = function(data) {
        return $http.post('api/categories/', data)
        .then(function(response){
            return response.data;
        })
    };

    CategoryFactory.deleteCategory = function(id) {
        return $http.delete('api/categories/'+id)
        .then(function(response){
            return response.data;
        })
    }


	return CategoryFactory;
})

