angular.module("myApp").controller('MyWarehousesController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.isShowPopup = false;
        $scope.ToHideShowPopup = function() {
            $scope.isShowPopup = !$scope.isShowPopup;
        }
        
        $scope.warehouses = memoryStorageRepositoryService.GetWarehouses();
        $scope.AddWarehouse = memoryStorageRepositoryService.AddWarehouse;
}])