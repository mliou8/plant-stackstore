app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, CategoryFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            CategoryFactory.fetchAll().then(function(cats){
                console.log("cats", cats)
                scope.categories = cats
                scope.items = cats.map(function(cat){
                    return cat.name
                })
                scope.items.sort()
                scope.categories = scope.items
        })

            scope.items = [
                { label: 'Cart', state: 'cart' },
                { label: 'Admin Panel', state: 'admin', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            AuthService.getLoggedInUser()
                .then (function (user) {
                    if (!user.admin) {
                        scope.admin = false
                        return false;
                    } else {
                        scope.admin = true
                        return true
                    }
                })



            // console.log("ADMIN?", scope.admin)


            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);


}
    };

});