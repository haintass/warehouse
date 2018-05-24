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
                $scope.isNewItem = true;
            }
            else {
                $scope.isNewItem = false;
                changedItem.id = key;
            }
            
            $scope.isShowPopup = !$scope.isShowPopup;
        }
        
        $scope.warehouses = memoryStorageRepositoryService.GetWarehouses();
        var DeleteWarehouse = memoryStorageRepositoryService.DeleteWarehouse;
        var AddWarehouse = memoryStorageRepositoryService.AddWarehouse;
        var ChangeWarehouse = memoryStorageRepositoryService.ChangeWarehouse;
        
        $scope.AddChangeItem = function(action) {
            if (action == 'add') {
                AddWarehouse(Object.assign({}, $scope.item));
                $scope.isShowPopup = false;
            }
            if (action == 'change') {
                changedItem.name = $scope.item.name;
                ChangeWarehouse(changedItem)
            }
        }
        
        $scope.DeleteItem = function(key){
            memoryStorageRepositoryService.DeleteWarehouse(keyCurrentItem);
        }
}])