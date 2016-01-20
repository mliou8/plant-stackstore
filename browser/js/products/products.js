app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            },
            allReviews: function(ProductFactory) {
                return ProductFactory.fetchAllReviews();
            },
            allCategories: function(ProductFactory) {
                return ProductFactory.fetchAllCategories();
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
        }
    });
});

app.controller('ProductsCtrl', function($scope, user, allProducts, allCategories, ProductFactory, allReviews) {
          //Returns the products scope object and maps onto it
          //two new properties. The average of the reviews, and how many there are
 console.log("all products", allProducts)
  console.log("all reviews", allReviews)
 $scope.user = user;
 console.log("USER", user)
$scope.adminEditing = false;
$scope.categories = allCategories;


  // selected categories
  $scope.selection = [];

  // toggle selection for a given fruit by name
  $scope.toggleSelection = function toggleSelection(category) {
    var idx = $scope.selection.indexOf(category._id);

    // is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // is newly selected
    else {
      $scope.selection.push(category._id);
    }
  };





 $scope.products = allProducts.map(function (product) {
    console.log("product in all products: ", product);
        product.reviews = allReviews.filter(function (review) {
            //this is because after deleting there won't be a product, and we decided not to delete the reviews so we have them for later reference (in case, you know, we want them)
            if (review.product) {
                return review.product._id === product._id
            }
        })
        product.categories = "";
        for (var i = 0; i < product.category.length; i++) {
            for (var j = 0; j < allCategories.length; j++) {
                if (allCategories[j]._id === product.category[i]) {
                    product.category[i] = allCategories[j].name;
                }
            }
        }
        var sum = 0;
        product.reviewLength = product.reviews.length;
        product.reviews.forEach(function (review) {
            sum = sum + review.rating
        })
        product.average = Math.floor((sum) / (product.reviewLength));
        return product;
    })
    console.log($scope.products);

    $scope.editClicked = function() {
        $scope.adminEditing = !$scope.adminEditing;
        return $scope.adminEditing;
    }

    //delete a product
    $scope.deleteProduct = function(product) {
        //console.log("PRODUCT: ", product._id);
        return ProductFactory.deleteProduct(product._id)
        .then(function(){
            //console.log("INDEX! ", $scope.products.indexOf(product));
            $scope.products.splice($scope.products.indexOf(product),1);
        })
    }

    //add product
    $scope.addProduct = function() {
        console.log("name, ", $scope.name);
        console.log("photo, ", $scope.photo);
        console.log("selected Categories ", $scope.selection);
        var submitObj = {
            name: $scope.name,
            photo: $scope.photo,
            price: $scope.price,
            stock: $scope.stock,
            category: $scope.selection
        }
        return ProductFactory.createProduct(submitObj)
        .then(function(product){
            $scope.products.push(product);
        })
    }
});

app.factory('ProductFactory', function($http) {
    return {
        fetchAll: function() {
            return $http.get('/api/products')
                .then(function(response) {
                    return response.data;
                });
        },
        fetchById: function(id) {
            return $http.get('/api/products/' + id)
                .then(function(response) {
                    return response.data;
                });
        },
        createReview: function(data) {
            return $http.post('api/review', data)
            .then(function(response){
                return response.data;
            })
        },
        fetchReviewsById: function(id) {
            return $http.get('api/products/reviews/' + id)
            .then(function(response){
                return response.data;
            });
        },
        fetchAllReviews: function() {
            return $http.get('api/review')
            .then (function (response) {
                return response.data;
            });
        },
        fetchAllCategories: function() {
            return $http.get('api/categories')
            .then (function (response) {
                return response.data;
            });
        },
        editProduct: function(id, data) {
            return $http.put('api/products/' + id, data)
            .then(function(response){
                return response.data;
            })
        },
        deleteProduct: function(id) {
            return $http.delete('api/products/' + id)
            .then(function(response){
                return response.data;
            })
        },
        createProduct: function(data) {
            return $http.post('api/products/', data)
            .then(function(response){
                return response.data;
            })
        }
    }
})