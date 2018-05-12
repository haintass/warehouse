var mainModule = angular.module("myApp", ['ngMessages']);

mainModule.controller("mainCtrl", ["$scope", "memoryStorageRepositoryService", function($scope, memoryStorageRepositoryService) {
    $scope.menu = [
        {
            name: "main page",
            value: "#1"
        },
        
        {
            name: "My warehouses",
            value: "#2"
        },
        
        {
            name: "Goods",
            value: "#3"
        }
    ];
    
}])

