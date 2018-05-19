angular.module("myApp").directive('popupToCreateItem', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/popupToCreateItem.html'        
    }
}]);