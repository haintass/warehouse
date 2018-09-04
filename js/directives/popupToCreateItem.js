angular.module("myApp").directive('popupToCreateItem', ['memoryStorageRepositoryService', function (memoryStorageRepositoryService) {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/popupToCreateItem.html',
        controller: function ($scope) {
            $scope.isNewTable = true;
            $scope.tableName = "";
        }
    }
}]);