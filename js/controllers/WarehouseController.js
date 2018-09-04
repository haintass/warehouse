angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {
            //TO DO:
            // create table with name
            // delete table
            // add new items
            // remove items
            // change items
            // validation
            //[ {isEditing: false, item:{name...count...price...}} ]

            
            $scope.itemsName = memoryStorageRepositoryService.itemsName;
            $scope.warehouse = memoryStorageRepositoryService.GetCurrentWarehouse();
            $scope.isEmptyWarehouse = $scope.warehouse.tables ? $scope.warehouse.tables.length == 0 ? true : false : true;
            $scope.isShowPopup = false;
            $scope.isNewRow = false;

            _.forEach($scope.warehouse.items, function (value) {
                value.isEditing = false;
            })
            
            var AddNewValueToItems = memoryStorageRepositoryService.AddNewValueToItems;
            var DeleteValuesFromItems = memoryStorageRepositoryService.DeleteValuesFromItems;
            var SaveValuesChangesInItems = memoryStorageRepositoryService.SaveValuesChangesInItems;
            var DeleteTable = memoryStorageRepositoryService.DeleteItems;

            
        }])