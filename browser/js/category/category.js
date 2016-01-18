app.config(function($stateProvider) {
    $stateProvider.state('category', {
        url: '/categories/:categoryName',
        // controller: 'CategoryCtrl',
        templateUrl: 'js/category/category.html',
        controller: function($scope, $stateParams, CategoryFactory) {

            console.log("HERE", $stateParams)
            CategoryFactory.fetchByName($stateParams.categoryName)
            .then(function(category){
                $scope.category = category;
            })
            .then(function(){
                console.log("Id:" + $scope.category._id)
                CategoryFactory.fetchById($scope.category._id)
                .then(function(products){
                    console.log(products);
                    $scope.products = products;
                    console.log($scope.products);
                })
            })
        }
        // resolve: {
        //     category: function(CategoryFactory, $stateParams) {
        //         return CategoryFactory.fetchByName($stateParams.name);
        //     },
        //     products: function(CategoryFactory, $stateParams, category) {
        //         return CategoryFactory.fetchById(category._id);
        //     }
        // }
    });
});

// app.controller('CategoryCtrl', function($scope, $stateParams) {
//     console.log($stateParams);
//     $scope.category = $stateParams.categoryName;
// })