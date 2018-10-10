angular.module("myApp").controller('MyWarehousesController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.isShowPopup = false;
        $scope.isNewItem = true;
        $scope.isNewRow = false;
        $scope.warehouseInfo = {
            name: "",
            id: null
        };
        
        $scope.warehouses = memoryStorageRepositoryService.GetWarehouses().slice();
        var DeleteWarehouse = memoryStorageRepositoryService.DeleteWarehouse;
        var AddWarehouse = memoryStorageRepositoryService.AddWarehouse;
        var ChangeWarehouse = memoryStorageRepositoryService.ChangeWarehouse;

        DisableEditMode();        
        
        $scope.NewRow = function() {
            DisableEditMode();
            $scope.warehouseInfo.name = "";
            $scope.isNewRow = !$scope.isNewRow;
        };

        $scope.AddWarehouse = function() {
            $scope.warehouses = AddWarehouse($scope.warehouseInfo.name);
            $scope.NewRow();
            $scope.warehouseInfo.name = "";
        };
        
        $scope.ChangeName = function(id) {
            _.forEach($scope.warehouses, function(value) {
                value.isEditMode = value.id === id ? value.isEditMode : false;
            });
            
            if ($scope.isNewRow){
                $scope.NewRow();
            }

            $scope.warehouseInfo.name = $scope.warehouses[id].name;
            $scope.warehouses[id].isEditMode = !$scope.warehouses[id].isEditMode;
        };

        $scope.SaveName = function (newName, id) {
            $scope.warehouses[id].name = ChangeWarehouse(newName, id);
            $scope.ChangeName(id);
            $scope.warehouses[id].isEditMode = false;
        };

        $scope.DeleteWarehouse = function(id){
            $scope.warehouses = DeleteWarehouse(id);
        };

        $scope.CloseOpenQuestionPopup = function(key) {
            $scope.isShowPopup = !$scope.isShowPopup;

            if (_.isNumber(key)) {
                $scope.warehouseInfo.id = key;
            }
        };
        
        $scope.SetWarehouseId = function () {
            memoryStorageRepositoryService.SetCurrentWarehouseId($scope.warehouseInfo.id);
        }

        $scope.IsEmptyWarehouse = function () {
            return $scope.warehouses.length === 0 && !$scope.isNewRow;
        }

        function DisableEditMode () {
            if ($scope.warehouses.length > 0) {
                _.forEach($scope.warehouses, function (value) {
                    value.isEditMode = false;
                })
            }
        };
}])