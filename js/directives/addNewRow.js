angular.module("myApp").directive('addNewRow', [function () {
    return {
        restrict: 'A',
        transclude: false,
        templateUrl: 'templates/addNewRow.html',
        scope: {
            rowCount: "="
        },
        controller: function ($scope) {
            console.log($scope)
        }
    }
}]);