angular.module("myApp").controller('MyWarehousesController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.warehouses = memoryStorageRepositoryService.GetWarehouses();
        $scope.AddWarehouse = memoryStorageRepositoryService.AddWarehouse;
}])