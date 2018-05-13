var mainModule = angular.module("myApp", ['ngMessages']);

mainModule.controller("mainCtrl", ["$scope", "memoryStorageRepositoryService", function($scope, memoryStorageRepositoryService) {
    $scope.menu = [
        {
            name: "Main page",
            value: "#main-page"
        },
        
        {
            name: "My warehouses",
            value: "#my-warehouses"
        },
        
        {
            name: "Goods",
            value: "#goods"
        }
    ];
    
}])

