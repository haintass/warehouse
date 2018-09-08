angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {            
            $scope.itemsName = memoryStorageRepositoryService.itemsName;
            $scope.warehouse = memoryStorageRepositoryService.GetCurrentWarehouse();
            $scope.isEmptyWarehouse = $scope.warehouse.tables ? $scope.warehouse.tables.length == 0 ? true : false : true;
            $scope.isShowPopup = false;
            $scope.isNewRow = false;

            $scope.TableIsEmpty = function () {
                if ($scope.warehouse.tables) {
                    if ($scope.warehouse.tables.length > 0) {
                        return false;
                    }
                    return true;
                }
                return true;
            }
        }]);