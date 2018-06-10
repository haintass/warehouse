angular.module("myApp").controller('WarehousesController',
    ['$scope', 'memoryStorageRepositoryService',
    function($scope, memoryStorageRepositoryService) {
        $scope.$on('warehouseObject', function(datas) {
            $scope.obj = datas;
        })
}])