angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.warehouse = memoryStorageRepositoryService.currentWarehouse;
        $scope.isShowPopup = false;
        $scope.isNewItem = true;
        $scope.id = 0;

        $scope.ToHideShowPopup = function() {
            $scope.isShowPopup = !$scope.isShowPopup;
        }
}])