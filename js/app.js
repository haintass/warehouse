angular.module("myApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/main-page',
    {
        templateUrl: 'index.html'
    })
    .when('/my-warehouses',
    { 
        templateUrl: 'views/my-warehouses.html'
    })
    .when('/goods',
    {
        templateUrl: 'views/goods.html'
    });
})