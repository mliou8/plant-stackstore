app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        controller: 'ProductCtrl',
        templateUrl: 'js/product/product.html',
        resolve: {
            product: function(ProductFactory, $stateParams) {
                return ProductFactory.fetchById($stateParams.productId);
            },
            reviews: function(ProductFactory, $stateParams) {
                console.log($stateParams.productId);
                return ProductFactory.fetchReviewsById($stateParams.productId);
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            categories: function(CategoryFactory) {
                return CategoryFactory.fetchAll();
            }
        }
    });
});

app.controller('ProductCtrl', function($scope, categories, reviews, product, user, CartFactory, ProductFactory, AuthService) {
    $scope.product = product;
    $scope.reviews = reviews;
    $scope.user = user;
    $scope.amount = 1;
    $scope.adminEditing = false;
    $scope.categories = categories;
    console.log($scope.categories);

    //console.log("admin?", $scope.user.admin);

    //logic for making the button show and disappear
    $scope.showButton = true;

    //logic for making form show and disappear
    $scope.formSubmitted = false;

    //logic for star ratings
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.addToCart = function() {
        CartFactory.addToCart([{
            product: $scope.product._id,
            quantity: $scope.amount
        }],user);
    }

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };

    //logic for review submit form
    $scope.list = [];
    $scope.text = '';
    $scope.submit = function() {
        var submitObject = {
            rating: $scope.rate,
            text: $scope.text,
            product: $scope.product,
            user: $scope.user._id
        };

        ProductFactory
        .createReview(submitObject)
        .then(function(review){
            $scope.list.push(review);
            $scope.text = '';

            ProductFactory.fetchReviewsById($scope.product._id)
            .then(function(reviews){
                $scope.reviews=reviews;
                $scope.formSubmitted = true;
            })
        })
    }

    //logic for admin editing
    $scope.editClicked = function() {
        $scope.adminEditing = !$scope.adminEditing;
        return $scope.adminEditing;
    }

    $scope.editProduct = function(data) {
        console.log(data);
        return ProductFactory.editProduct(product._id, data);
    }

    $scope.addCategory = function(data) {
        console.log("data is ", data);
        console.log("newCategory is ", $scope.cat);
        data.category.push($scope.cat);
        return ProductFactory.editProduct(product._id, data);
    }
    $scope.deleteCategory = function(category) {
        $scope.product.category.splice($scope.product.category.indexOf(category), 1);
        return ProductFactory.editProduct(product._id, $scope.product);
    }

    $scope.changePhoto = function() {
        $scope.product.photo[0] = $scope.photo;
        return ProductFactory.editProduct(product._id, $scope.product);
    }
});
