angular.module("myApp").directive('popupToCreateItem', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/popupToCreateItem.html',
        controller: function($scope) {
            $scope.itemFields = [{ fieldName: "", fieldType: "" }];
            
            $scope.addField = function() {
                $scope.itemFields.push({ fieldName: "", fieldType: "" });
            }
            
            $scope.removeField = function(index) {
                $scope.itemFields.splice(index, 1);
            }
        }
    }
}]);