angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var warehouses = [];
    var items = [];
     

    return {
        GetWarehouses: function() {
            return warehouses;
        },

        AddWarehouse: function(name, id) {
            warehouses.push({ name: name, id: warehouses.lenght });
        },

        ChangeWarehouse: function(key) {

        },

        DeleteWarehouse: function() {

        },

        GetItems: function () {
            return items;
        },

        AddItem: function () {

        },

        ChangeItem: function () {

        },

        DeleteItem: function () {

        }
    }
})