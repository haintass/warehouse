angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
       $scope.obj = memoryStorageRepositoryService.currentWarehouse;
}])