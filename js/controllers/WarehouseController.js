angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.warehouse = memoryStorageRepositoryService.currentWarehouse;
        $scope.isShowPopup = false;
        $scope.isNewTable = $scope.warehouse.items ? $scope.warehouse.items[0].value ? false : true : true;
        $scope.itemsCount = [];

        $scope.getItemsOfWarehouse = function() {
            if ($scope.warehouse.items !== undefined) {
                if ($scope.warehouse.items[0].value !== undefined) {
                    for (var key in $scope.warehouse.items[0].value) {
                        $scope.itemsCount.push(key);
                    };
                }
            }
        };
        $scope.getItemsOfWarehouse();

        $scope.ToHideShowPopup = function() {
            $scope.isShowPopup = !$scope.isShowPopup;
            $scope.isNewTable = $scope.warehouse.items ? $scope.warehouse.items[0].value ? false : true : true;
        };
}])