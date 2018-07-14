angular.module("myApp").controller('MyWarehousesController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.isShowPopup = false;
        $scope.isNewItem = true;
        $scope.item = {};
        
        var keyCurrentItem;
        var changedItem = {};
        
        $scope.ToHideShowPopup = function(key) {
            keyCurrentItem = key;
            if (key === undefined) {
                $scope.item = {};
                $scope.isNewItem = true;
            }
            else {
                $scope.isNewItem = false;
                $scope.item = Object.assign({}, $scope.warehouses[keyCurrentItem])
            }
            
            $scope.isShowPopup = !$scope.isShowPopup;
        }
        
        $scope.warehouses = memoryStorageRepositoryService.GetWarehouses();
        var DeleteWarehouse = memoryStorageRepositoryService.DeleteWarehouse;
        var AddWarehouse = memoryStorageRepositoryService.AddWarehouse;
        var ChangeWarehouse = memoryStorageRepositoryService.ChangeWarehouse;
        
        $scope.AddWarehouse = function() {
            AddWarehouse(Object.assign({}, $scope.item));
            $scope.ToHideShowPopup();
            $scope.item = {};
        }
        
        $scope.ChangeWarehouse = function() {
            changedItem = Object.assign({}, $scope.item);
            ChangeWarehouse(changedItem);
            $scope.ToHideShowPopup();
        }
        
        $scope.DeleteWarehouse = function(){
            DeleteWarehouse(keyCurrentItem);
            $scope.ToHideShowPopup();
        }
        
        $scope.sendDatas = function() {
            memoryStorageRepositoryService.currentWarehouse = $scope.item;
        }
}])