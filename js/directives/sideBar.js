angular.module("myApp").directive('sideBar', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/sideBar.html'        
    }
}]);