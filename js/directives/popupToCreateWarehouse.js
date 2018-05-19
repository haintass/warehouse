angular.module("myApp").directive('popupToCreateWarehouse', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/popupToCreateWarehouse.html'        
    }
}]);