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
                item: {
                    count: null,
                    values: {
                        name: "",
                        price: null,
                        madeInChina: false
                    }
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
                var newItem = {
                    count: $scope.warehouseInfo.item.count,
                    item: {
                        name: $scope.warehouseInfo.item.value.name,
                        price: $scope.warehouseInfo.item.value.price,
                        madeInChina: $scope.warehouseInfo.item.value.madeInChina
                    }
                };
                
                $scope.warehouse.table.listOfItems[itemId].isEditMode = false;

                var oldItem = {
                    item: $scope.warehouse.table.listOfItems[itemId].item,
                    count: $scope.warehouse.table.listOfItems[itemId].count
                };
                if (_.isEqual(newItem, oldItem)) {
                    return;
                }
                
                $scope.warehouse = SaveChangesOfItems(newItem, itemId);
            };

            $scope.IsEditModeItems = function (itemId) {
                DisableItemsEditMode();
                $scope.isNewRow = false;

                 $scope.ChangeEditModeOfItems(itemId);

                var isEditMode = $scope.warehouse.table.listOfItems[itemId].isEditMode;
                
                if (isEditMode) {
                    $scope.warehouseInfo.item = {
                        count: $scope.warehouse.table.listOfItems[itemId].count,
                        value: {
                            name: $scope.warehouse.table.listOfItems[itemId].item.name,
                            price: $scope.warehouse.table.listOfItems[itemId].item.price,
                            madeInChina: $scope.warehouse.table.listOfItems[itemId].item.madeInChina
                        }
                    }


                }
                else {
                    $scope.warehouseInfo.item = {
                        count: null,
                        value: {
                            name: "",
                            price: null,
                            madeInChina: false  
                        }
                    }
                }
            };

            $scope.ChangeEditModeOfItems = function(itemId) {
                $scope.warehouse.table.listOfItems[itemId].isEditMode =
                !$scope.warehouse.table.listOfItems[itemId].isEditMode; 
            }

            $scope.AddItemsToTable = function () {
                var items = {
                    item: {
                           name: $scope.warehouseInfo.item.value.name,
                           price: $scope.warehouseInfo.item.value.price,
                           madeInChina: $scope.warehouseInfo.item.value.madeInChina
                    },
                    count: $scope.warehouseInfo.item.count
                };

                $scope.warehouse = AddItemsToTable(items);
                $scope.CancelNewItems();
            };

            $scope.CancelNewItems = function () {
                $scope.warehouseInfo.item = {
                    count: null,
                    value: {
                        name: "",
                        price: null,
                        madeInChina: false
                    }
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
                    if ($scope.warehouse.table.listOfItems && $scope.warehouse.table.listOfItems.length > 0) {
                        return false;
                    }
                    return true;
                }
                return true;
            };

            function DisableItemsEditMode () {
                if ($scope.warehouse.table && $scope.warehouse.table.listOfItems) {
                    _.forEach($scope.warehouse.table.listOfItems, function (value) {
                        Object.defineProperty(value, "isEditMode", { value: false, configurable: true, writable: true, enumerable: false });
                    })
                }
            };

        }]);