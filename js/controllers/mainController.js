var mainModule = angular.module("myApp", ['ngMessages', 'ngRoute']);

mainModule.config(function($routeProvider) {
    $routeProvider
    .when('/main-page', {
        templateUrl: 'views/main-page.html',
        controller: 'controllers/MainPageController'
    })
    .when('/my-warehouses', {
        templateUrl: 'views/my-warehouses.html'
    })
    .when('/goods', {
        templateUrl: 'views/goods.html'
    })
    
});

mainModule.controller("mainController", ["$scope", "memoryStorageRepositoryService", function($scope, memoryStorageRepositoryService) {
    $scope.menu = [
        {
            name: "Main page",
            value: "#!main-page"
        },
        
        {
            name: "My warehouses",
            value: "#!my-warehouses"
        },
        
        {
            name: "Goods",
            value: "#!goods"
        }
    ];
    
}])

