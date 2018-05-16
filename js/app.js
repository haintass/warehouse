angular.module("myApp", ['ngMessages', 'ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when('/main-page', {
        templateUrl: 'views/main-page.html',
        controller: 'MainPageController'
    })
    .when('/my-warehouses', {
        templateUrl: 'views/my-warehouses.html',
        controller: 'MyWarehousesController'
    })
    .when('/goods', {
        templateUrl: 'views/goods.html'
    })
});
