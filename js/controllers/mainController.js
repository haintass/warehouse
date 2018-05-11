var mainModule = angular.module("myApp", ['ngMessages']);

mainModule.controller("mainCtrl", ["$scope", "memoryStorageRepositoryService", function($scope, memoryStorageRepositoryService) {
    $scope.menu = [
        {
            name: "Склады",
            value: "#1"
        },
        
        {
            name: "Сотрудники",
            value: "#2"
        },
        
        {
            name: "Товары",
            value: "#3"
        }
    ];
    $scope.warehouses = {};
    $scope.isShowWindowToCreateItem = false;
    $scope.isNewItem = true;
    $scope.item = {};
    
    $scope.keyItem;
    $scope.ToHideShowPopup = function(key) {
        if (key == undefined) {
            $scope.item = {};
            $scope.isNewItem = true;
            $scope.keyItem = key;
        }
        else {
            $scope.isNewItem = false;
            $scope.item = Object.assign({}, $scope.items[key]);    
            $scope.keyItem = key;
        }
        
        $scope.isShowWindowToCreateItem = !$scope.isShowWindowToCreateItem;
    }
     
    $scope.isNewItem = memoryStorageRepositoryService.isNewItem;
    
    $scope.items = memoryStorageRepositoryService.GetItems();   
    $scope.Add = memoryStorageRepositoryService.AddItem;
    $scope.Change = memoryStorageRepositoryService.ChangeItem;
    $scope.Delete = memoryStorageRepositoryService.DeleteItem;

    $scope.AddChangeItem = function (action) {
        if ($scope.addItemForm.$valid) {
            action == 'add' ? $scope.Add() : $scope.Change();
            $scope.ToHideShowPopup();
        }
    }
    
    $scope.DeleteItem = function() {
        $scope.Delete();
        $scope.ToHideShowPopup();
    }
}])

