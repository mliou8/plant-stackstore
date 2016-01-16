app.config(function ($stateProvider) {

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/user/register.html',
        controller: 'RegisterCtrl'
    });

});

app.controller('RegisterCtrl', function ($scope, AuthService, $state, Upload, $timeout) {

     $scope.avatarID = "blank-avatar"
     $scope.image_source = "https://s-media-cache-ak0.pinimg.com/236x/ee/1b/fc/ee1bfc6d80856df0a748bda63e69d4d4.jpg";

     $scope.setFile = function(element) {
        console.log("HERE")
      $scope.currentFile = element.files[0];
       var reader = new FileReader();

      reader.onload = function(event) {
        $scope.image_source = event.target.result
        $scope.avatarID = "profile-preview"
        $scope.$apply()

      }
      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(element.files[0]);
    }

    $scope.registerUser = function (userInfo) {

        $scope.error = null;

        AuthService.register(userInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid registration credentials.';
        });

    };

        $scope.registerSubmit = function() {
            console.log("submitting")
            console.log("valid", form.file.$valid)
            console.log("file", $scope.file)
          if ($scope.file) {
            console.log("have valid file")
            $scope.upload($scope.file);
          }
        };

        $scope.upload = function (file) {
            console.log("trying to upload")
        Upload.upload({
            url: '/api/user/uploads',
            method: 'POST',
            headers: {
                     'Content-Type': file.type
            },
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


});