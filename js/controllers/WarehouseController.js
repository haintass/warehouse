angular.module("myApp").controller('WarehouseController',
    ['$scope', 'memoryStorageRepositoryService',
        function ($scope, memoryStorageRepositoryService) {
            $scope.warehouse = memoryStorageRepositoryService.currentWarehouse;
            $scope.isShowPopup = false;
            $scope.isEditing = false;
            $scope.isNewRow = false;
            $scope.isNewTable = $scope.warehouse.items ? $scope.warehouse.items[0].value ? false : true : true;
            var addNewItemsButton = $("#addNewButton");

            $scope.addNewItem = function () {
                $(document).on("click", ".add", function () {
                    var empty = false;

                    var input = $(this).parents("tr").find('input[type="text"]');

                    input.each(function () {
                        if (!$(this).val()) {
                            $(this).addClass("error-validation-input");
                            $(this).nextAll().addClass("required");
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
                                $scope.warehouse.items[key].value.push(item.value);
                                item.value = "";
                            });

                            $scope.isNewRow = !$scope.isNewRow;
                            addNewItemsButton.prop('disabled', false);
                        }
                    }

                    $scope.$apply();
                });
            };

            $scope.SaveChanges = function () {
                $(document).on("click", ".add", function () {
                    if (this.dataset.itemid) {
                        var itemId = +this.dataset.itemid;
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

                            $scope.warehouse.items[key].value[itemId] = item.value;
                        });

                        $scope.$apply();
                    }
                });
            };

            $scope.DeleteItemsInRow = function () {
                $(document).on("click", ".delete", function () {
                    if (this.dataset.itemid) {
                        var itemId = +this.dataset.itemid;

                        _.forEach($scope.warehouse.items, function (value, key) {
                            $scope.warehouse.items[key].value.splice(itemId, 1);
                        });
                    }
                    else {
                        $scope.isNewRow = false;
                        addNewItemsButton.prop('disabled', false);
                        var input = $(this).parents("tr").find('input[type="text"]');

                        _.forEach(input, function (value) {
                            value.value = "";
                        });
                    }

                    $scope.$apply();
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
                addNewItemsButton.prop('disabled', true);

                input.each(function () {
                    $(this).removeClass("error-validation-input");
                });
            }

            $scope.ToHideShowPopup = function () {
                $scope.isShowPopup = !$scope.isShowPopup;
                $scope.isNewTable = $scope.warehouse.items ? $scope.warehouse.items[0].value ? false : true : true;
            };

            $scope.getItemsOfWarehouse = function () {
                if ($scope.warehouse.items !== undefined) {
                    if ($scope.warehouse.items[0].value !== undefined) {
                        var itemsCount = [];
                        for (var key in $scope.warehouse.items[0].value) {
                            itemsCount.push(key);
                        };
                        return itemsCount;
                    }
                }
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