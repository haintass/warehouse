angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {            
            $scope.itemsName = memoryStorageRepositoryService.itemsName;
            $scope.warehouse = memoryStorageRepositoryService.GetCurrentWarehouse();
            var CreateTable = memoryStorageRepositoryService.CreateTable;
            var ChangeTableName = memoryStorageRepositoryService.ChangeTableName;
            var DeleteTable = memoryStorageRepositoryService.DeleteTable;
            var AddItemsToTable = memoryStorageRepositoryService.AddItemsToTable;
            var SaveChangesOfItems = memoryStorageRepositoryService.SaveChangesOfItems;
            var DeleteItems = memoryStorageRepositoryService.DeleteItems;

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

            if ($scope.warehouse.table) {
                $scope.warehouseInfo.tableName = $scope.warehouse.table.name;
            }

            DisableItemsEditMode();

            $scope.DeleteItems = function (itemId) {
                $scope.warehouse = DeleteItems(itemId);
            }

            // TODO: checking on a changes before connect to repositoryService
            $scope.SaveChangesOfItems = function (itemId) {
                $scope.warehouse = SaveChangesOfItems(
                    [
                        $scope.warehouseInfo.items.name,
                        $scope.warehouseInfo.items.count,
                        $scope.warehouseInfo.items.price,
                        $scope.warehouseInfo.items.bool
                    ],
                    itemId
                );
                
                $scope.warehouse.table.items[itemId].isEditMode = false;
            };

            $scope.IsEditModeItems = function (itemId) {
                DisableItemsEditMode();
                $scope.isNewRow = false;

                 $scope.ChangeEditModeOfItems(itemId);

                var isEditMode = $scope.warehouse.table.items[itemId].isEditMode;
                
                if (isEditMode) {
                    $scope.warehouseInfo.items = {
                        name: $scope.warehouse.table.items[itemId][0],
                        count: $scope.warehouse.table.items[itemId][1],
                        price: $scope.warehouse.table.items[itemId][2],
                        bool: $scope.warehouse.table.items[itemId][3]
                    }


                }
                else {
                    $scope.warehouseInfo.items = {
                        name: "",
                        count: null,
                        price: null,
                        bool: false
                    }
                }
            };

            $scope.ChangeEditModeOfItems = function(itemId) {
                $scope.warehouse.table.items[itemId].isEditMode =
                !$scope.warehouse.table.items[itemId].isEditMode; 
            }

            $scope.AddItemsToTable = function () {
                var items = [
                    $scope.warehouseInfo.items.name,
                    $scope.warehouseInfo.items.count,
                    $scope.warehouseInfo.items.price,
                    $scope.warehouseInfo.items.bool
                ];

                $scope.warehouse = AddItemsToTable(items);
                $scope.CancelNewItems();
            };

            $scope.CancelNewItems = function () {
                $scope.warehouseInfo.items = {
                    name: "",
                    count: null,
                    price: null,
                    bool: false
                };

                DisableItemsEditMode();
                NewRow();
            };
            
            $scope.CreateTable = function () {
                $scope.warehouse = CreateTable($scope.warehouseInfo.tableName);   
            };

            $scope.ChangeTableName = function () {
                if ($scope.warehouseInfo.tableName !== $scope.warehouse.table.name){
                    $scope.warehouse = ChangeTableName($scope.warehouseInfo.tableName);
                }
                $scope.IsEditMode();
            };

            $scope.DeleteTable = function () {
                $scope.warehouse = DeleteTable();
                $scope.warehouseInfo.tableName = "";
            };

            $scope.IsEditMode = function () {
                $scope.warehouseInfo.editMode = !$scope.warehouseInfo.editMode;
            };

            function NewRow () {
                $scope.isNewRow = !$scope.isNewRow;
            };

            $scope.TableIsEmpty = function () {
                if ($scope.warehouse.table) {
                    if ($scope.warehouse.table.items && $scope.warehouse.table.items.length > 0) {
                        return false;
                    }
                    return true;
                }
                return true;
            };

            function DisableItemsEditMode () {
                if ($scope.warehouse.table && $scope.warehouse.table.items) {
                    _.forEach($scope.warehouse.table.items, function (value) {
                        value.isEditMode = false;
                    })
                }
            };

        }]);