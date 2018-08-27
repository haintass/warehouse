angular.module("myApp").directive('header', [function() {
    return {
        restrict: 'A',
        templateUrl: 'templates/header.html'        
    }
}]);

angular.module("myApp").directive('numberTextBox', [function() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var parseViewValue = function(value) {
            console.log('numberTextBox param - ', value);

            var result = +value;
            console.log('numberTextBox return ', result);

            return result
          }
     
          ngModel.$parsers.push(parseViewValue);
        }
      }
}]);

