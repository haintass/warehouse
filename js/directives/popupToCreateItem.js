angular.module("myApp").directive('popupToCreateItem', ['memoryStorageRepositoryService', function (memoryStorageRepositoryService) {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/popupToCreateItem.html',
        controller: function ($scope) {
            $scope.isNewItem = true;
            $scope.itemFields = [];
            $scope.itemFields = [{ fieldName: "", fieldType: "" }];
            

            $scope.addField = function () {
                $scope.itemFields.push({ fieldName: "", fieldType: "" });
            }

            $scope.removeField = function (index) {
                $scope.itemFields.splice(index, 1);
            }

            var AddItem = function () {
                memoryStorageRepositoryService.AddItem(Object.assign({}, $scope.itemFields));
                $scope.isNewItem = false;
                $scope.ToHideShowPopup();
            }

            $scope.checkFieldValidity = function (item) {
                if (item.$error.required && item.$dirty) {
                    return true;
                }
                else {
                    false;
                }
            }

            $scope.checkFormValidity = function (form, action) {
                if (form.$error.required) {
                    $scope.formIsInvalid = true;
                }
                else {
                    $scope.formIsInvalid = false;
                    AddItem();
                }
            }
        }
    }
}]);