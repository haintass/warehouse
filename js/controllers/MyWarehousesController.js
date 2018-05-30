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
            if (key == undefined) {
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
        
        $scope.AddItem = function() {
            AddWarehouse(Object.assign({}, $scope.item));
            $scope.ToHideShowPopup();
            $scope.item = {};
        }
        
        $scope.ChangeItem = function() {
            changedItem = Object.assign({}, $scope.item);
            ChangeWarehouse(changedItem);
            $scope.ToHideShowPopup();
        }
        
        $scope.DeleteItem = function(){
            memoryStorageRepositoryService.DeleteWarehouse(keyCurrentItem);
            $scope.ToHideShowPopup();
        }
}])