angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {            
            $scope.itemsName = memoryStorageRepositoryService.itemsName;
            $scope.warehouse = memoryStorageRepositoryService.GetCurrentWarehouse();
            var CreateTable = memoryStorageRepositoryService.CreateTable;
            var ChangeTableName = memoryStorageRepositoryService.ChangeTableName;
            var DeleteTable = memoryStorageRepositoryService.DeleteTable;
            var AddItemsToTable = memoryStorageRepositoryService.AddItemsToTable;

            $scope.isNewRow = false;
            $scope.warehouseInfo = {
                tableName: "",
                editMode: false,
                tableId: 0,
                items: {
                    name: "",
                    count: null,
                    price: null,
                    bool: false
                }
            };

            if ($scope.warehouse.tables) {
                $scope.warehouseInfo.tableName = $scope.warehouse.tables[$scope.warehouseInfo.tableId].name;
            }

            $scope.AddItemsToTable = function () {
                var items = [
                    $scope.warehouseInfo.items.name,
                    $scope.warehouseInfo.items.count,
                    $scope.warehouseInfo.items.price,
                    $scope.warehouseInfo.items.bool
                ];

                $scope.warehouse = AddItemsToTable(items, $scope.warehouseInfo.tableId);
                $scope.CancelNewItems();
            };

            $scope.CancelNewItems = function () {
                $scope.warehouseInfo.items = {
                    name: "",
                    count: null,
                    price: null,
                    bool: false
                };

                NewRow();
            };
            
            $scope.CreateTable = function () {
                $scope.warehouse = CreateTable($scope.warehouseInfo.tableName);   
            };

            $scope.ChangeTableName = function () {
                if ($scope.warehouseInfo.tableName !== $scope.warehouse.tables[$scope.warehouseInfo.tableId].name){
                    $scope.warehouse = ChangeTableName($scope.warehouseInfo.tableName, $scope.warehouseInfo.tableId);
                }
                $scope.IsEditMode();
            };

            $scope.DeleteTable = function () {
                $scope.warehouse = DeleteTable($scope.warehouseInfo.tableId);
                $scope.warehouseInfo.tableName = "";
            };

            $scope.IsEditMode = function () {
                $scope.warehouseInfo.editMode = !$scope.warehouseInfo.editMode;
            };

            function NewRow () {
                $scope.isNewRow = !$scope.isNewRow;
            };

            $scope.TableIsEmpty = function () {
                if ($scope.warehouse.tables) {
                    if ($scope.warehouse.tables[$scope.warehouseInfo.tableId].items.length > 0) {
                        return false;
                    }
                    return true;
                }
                return true;
            };
        }]);