angular.module("myApp").directive('messagesOfInvalidFields', [function () {
    return {
        restrict: 'A',
        transclude: false,
        templateUrl: 'templates/messagesOfInvalidFields.html',
        scope: {
            itemOfValidation: "="
        }
    }
}]);