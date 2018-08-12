angular.module("myApp").directive('popupToCreateItem', ['memoryStorageRepositoryService', function (memoryStorageRepositoryService) {
    return {
        restrict: 'A',
        templateUrl: 'templates/popups/popupToCreateItem.html',
        controller: function ($scope) {
            $scope.isNewItem = true;
            $scope.itemFields = [];

            var setFields = function() {
                if ($scope.warehouse.items) {
                    _.forEach($scope.warehouse.items, function (value, key) {
                        $scope.itemFields.push({
                            fieldName: value.fieldName,
                            fieldType: value.fieldType
                        });
                    });
                }
                else {
                    $scope.itemFields = [{ fieldName: "", fieldType: "" }];
                }
            };
            setFields();

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

            var ChangeItems = function () {
                
            }

            $scope.DeleteItems = function () {
                memoryStorageRepositoryService.DeleteItems();
                setFields();
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

                    if (action === 'add'){
                        AddItem();
                    }
                    else {
                        ChangeItems();
                    }
                }
            }
        }
    }
}]);