angular.module("myApp").directive('questionPopup', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/questionPopup.html'
    }
}]);