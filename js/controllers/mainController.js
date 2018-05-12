var mainModule = angular.module("myApp", ['ngMessages']);

mainModule.controller("mainCtrl", ["$scope", "memoryStorageRepositoryService", function($scope, memoryStorageRepositoryService) {
    $scope.menu = [
        {
            name: "Склады",
            value: "#1"
        },
        
        {
            name: "Сотрудники",
            value: "#2"
        },
        
        {
            name: "Товары",
            value: "#3"
        }
    ];
    
}])

