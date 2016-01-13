app.config(function ($stateProvider) {
    $stateProvider.state('categories', {
        url: '/categories',
        templateUrl: 'js/categories/categories.html',
        controller: 'CategoryCtrl',
        resolve: {
        	allCategories: function (CategoryFactory){
        		return CategoryFactory.fetchAll();
        	}
        }
    });
});

app.controller('CategoryCtrl', function($scope, allCategories){
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

	return CategoryFactory;
})

