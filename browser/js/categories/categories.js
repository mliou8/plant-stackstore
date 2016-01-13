app.config(function ($stateProvider) {
    $stateProvider.state('categories', {
        url: '/categories',
        templateUrl: 'js/categories/categories.html',
        controller: 'CategoriesCtrl',
        resolve: {
        	allCategories: function (CategoryFactory){
        		return CategoryFactory.fetchAll();
        	}
        }
    });
});

app.controller('CategoriesCtrl', function($scope, allCategories){
	$scope.categories = allCategories;
})

app.factory('CategoryFactory', function($http) {
	var CategoryFactory = {}
	CategoryFactory.fetchAll = function() {
		return $http.get('api/categories')
		.then(function(response){
			return response.data;
		})
	};

    CategoryFactory.fetchById = function(id) {

        return $http.get('/api/categories/' + id)
        .then(function(response){
            return response.data;
        });
    }

    CategoryFactory.fetchByName = function(name) {
        return $http.get('api/categories/name/'+ name)
        .then(function(response){
            console.log("response:" + response.data);
            return response.data;
        })
    }

	return CategoryFactory;
})

