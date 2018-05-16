var mainModule = angular.module("myApp");

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

