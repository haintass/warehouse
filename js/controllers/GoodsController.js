angular.module("myApp").controller('GoodsController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {
            $scope.itemsName = memoryStorageRepositoryService.itemsName;
            $scope.possibleItems = memoryStorageRepositoryService.GetAllItems();
            var DeleteSpecificItems = memoryStorageRepositoryService.DeleteSpecificItems;
            var ChangeSpecificItems = memoryStorageRepositoryService.ChangeSpecificItems;

            $scope.itemInfo = {
                count: null,
                isEditMode: null,
                values: {
                    name: null,
                    price: null,
                    madeInChina: null
                }
            }

            DisableItemsEditMode();

            $scope.SaveChangesOfItems = function (itemId) {
                $scope.possibleItems = ChangeSpecificItems(itemId, $scope.itemInfo.value);
            }

            $scope.DeleteItems = function (itemId) {
                $scope.possibleItems = DeleteSpecificItems(itemId);
            };

            $scope.IsEditModeItem = function (itemId) {
                DisableItemsEditMode();
                $scope.isNewRow = false;

                $scope.ChangeEditModeOfItem(itemId);

                var isEditMode = $scope.possibleItems[itemId].isEditMode;

                if (isEditMode) {
                    $scope.itemInfo = {
                        count: $scope.possibleItems[itemId].count,
                        value: {
                            name: $scope.possibleItems[itemId].item.name,
                            price: $scope.possibleItems[itemId].item.price,
                            madeInChina: $scope.possibleItems[itemId].item.madeInChina
                        }
                    }
                }
                else {
                    $scope.itemInfo = {
                        count: null,
                        isEditMode: null,
                        values: {
                            name: null,
                            price: null,
                            madeInChina: null
                        }
                    }
                }
            }

            $scope.ChangeEditModeOfItem = function(itemId) {
                $scope.possibleItems[itemId].isEditMode = !$scope.possibleItems[itemId].isEditMode; 
            }

            function DisableItemsEditMode () {
                _.forEach($scope.possibleItems, function (value) {
                    Object.defineProperty(value, "isEditMode", { value: false, configurable: true, writable: true, enumerable: false });
                })
            };
        }])