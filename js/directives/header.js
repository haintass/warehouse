angular.module("myApp").directive('header', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/header.html'        
    }
}]);