var mainModule = angular.module("myApp");

mainModule.controller("MainController", ["$scope", function($scope) {
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

