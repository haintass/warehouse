angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {
            $scope.warehouse = memoryStorageRepositoryService.GetCurrentWarehouse();
            $scope.isShowPopup = false;
            $scope.isEditing = false;
            $scope.isNewRow = false;
            $scope.isNewTable = $scope.warehouse.items ? false : true;

            var AddNewValueToItems = memoryStorageRepositoryService.AddNewValueToItems;
            var DeleteValuesFromItems = memoryStorageRepositoryService.DeleteValuesFromItems;
            var SaveValuesChangesInItems = memoryStorageRepositoryService.SaveValuesChangesInItems;
            var DeleteTable = memoryStorageRepositoryService.DeleteItems;

            $scope.addNewValueToItems = function () {
                $(document).on("click", ".add-new-item", function () {
                    var newItems = [];
                    var empty = false;
                    var input = $(this).parents("tr").find('input[type="text"]');

                    input.each(function () {
                        if (!$(this).val()) {
                            $(this).addClass("error-validation-input");
                            $(this).nextAll().addClass("required");
                            $(this).nextAll().removeClass("incorrect-type");

                            empty = true;
                        } else {
                            $(this).removeClass("error-validation-input");
                            $(this).nextAll().removeClass("required");
                        }
                    });
                    $(this).parents("tr").find(".error-validation-input").first().focus();

                    if (!empty) {
                        input.each(function (key, item) {
                            if (checkTypeValueField(item.value, $scope.warehouse.items[key].fieldType)) {
                                $(this).removeClass("error-validation-input");
                                $(this).nextAll().removeClass("incorrect-type");
                            }
                            else {
                                $(this).addClass("error-validation-input");
                                $(this).nextAll().addClass("incorrect-type");
                            }
                        });

                        if (!input.hasClass('error-validation-input')) {
                            _.forEach(input, function (item, key) {
                                newItems.push(item.value);
                                item.value = "";
                            });
                            AddNewValueToItems(newItems);

                            $("#addNewButton").prop('disabled', false);
                            $scope.isNewRow = !$scope.isNewRow;
                            $scope.$apply();
                        }
                    }
                });
            };

            $scope.DeleteItemsInRow = function () {
                $(document).on("click", ".delete", function () {
                    if (this.dataset.valueid) {
                        var valueId = +this.dataset.valueid;

                        DeleteValuesFromItems($scope.warehouse.items, valueId);
                    }
                    else {
                        $scope.isNewRow = false;
                        $("#addNewButton").prop('disabled', false);
                        var input = $(this).parents("tr").find('input[type="text"]');
                        input.nextAll().removeClass("required");

                        _.forEach(input, function (value) {
                            value.value = "";
                        });
                    }

                    $scope.$apply();
                });
            };

            $scope.SaveChanges = function () {
                $(document).on("click", ".add-changes", function () {
                    if (this.dataset.valueid) {
                        var valueId = +this.dataset.valueid;
                        var inputs = $(this).parents('tr').find('input[type="text"]');

                        inputs.each(function (key, item) {
                            if (!$(this).val()) {
                                $(this).addClass("error-validation-input");
                                $(this).nextAll().removeClass("incorrect-type");
                                $(this).nextAll().addClass("required");
                            } else {
                                $(this).removeClass("error-validation-input");
                                $(this).nextAll().removeClass("required");

                                if (checkTypeValueField(item.value, $scope.warehouse.items[key].fieldType)) {
                                    $(this).removeClass("error-validation-input");
                                    $(this).nextAll().removeClass("incorrect-type");
                                }
                                else {
                                    $(this).addClass("error-validation-input");
                                    $(this).nextAll().addClass("incorrect-type");
                                }
                            }

                            SaveValuesChangesInItems(item.value, key, valueId);
                        });
                    }
                });
            };
            
            $scope.checkFieldValidity = function (item) {
                if (item.$error.required && item.$dirty) {
                    return true;
                }
                else {
                    false;
                }
            }

            var checkTypeValueField = function (value, type) {
                switch (type) {
                    case "String":
                        return typeof value === "string";
                        break;
                    case "Number":
                        return !isNaN(parseFloat(value)) && isFinite(value);
                        break;
                    case "Boolean":
                        return typeof value === "boolean";
                        break;
                }
            };

            $scope.AddColumns = function () {
                $scope.isNewRow = !$scope.isNewRow;
                var input = $("table.table tr:last").find('input[type="text"]');
                $("#addNewButton").prop('disabled', true);

                input.each(function () {
                    $(this).removeClass("error-validation-input");
                });
            }

            $scope.ToHideShowPopup = function () {
                $scope.isShowPopup = !$scope.isShowPopup;
                $scope.isNewTable = $scope.warehouse.items ? false : true;
            };

            $scope.DeleteItems = function () {
                DeleteTable();
                $scope.isNewTable = true;
                $scope.itemFields = [{ fieldName: "", fieldType: "" }];
            }

            $scope.getItemsOfWarehouse = function () {
                if ($scope.warehouse.items !== undefined) {
                    if ($scope.warehouse.items[0].value !== undefined) {
                        var itemsCount = [];
                        for (var key in $scope.warehouse.items[0].value) {
                            itemsCount.push(key);
                        };
                        return itemsCount;
                    }
                    return [];
                }
                return [];
            };

            $scope.getRowsOfTable = function () {
                if ($scope.warehouse.items !== undefined) {
                    var count = [];
                    for (var key in $scope.warehouse.items) {
                        count.push(key);
                    };
                    return count;
                }
            };
        }])