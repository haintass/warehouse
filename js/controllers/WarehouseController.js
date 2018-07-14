angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.warehouse = memoryStorageRepositoryService.currentWarehouse;
        $scope.isShowPopup = false;
        $scope.isNewItem = true;
        $scope.arr = [
            { fieldName: "", fieldType: "" }
        ]
        
        $scope.addField = function() {
            $scope.arr.push({ fieldName: "", fieldType: "" });
        }

        $scope.removeField = function(index) {
            $scope.arr.splice(index, 1);
        }

        $scope.ToHideShowPopup = function() {
            $scope.isShowPopup = !$scope.isShowPopup;
        }
}])