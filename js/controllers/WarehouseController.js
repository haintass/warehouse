angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.warehouse = memoryStorageRepositoryService.currentWarehouse;
        $scope.isShowPopup = false;
        $scope.isNewItem = true;

        $scope.ToHideShowPopup = function() {
            $scope.isShowPopup = !$scope.isShowPopup;
        }
}])