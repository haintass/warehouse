angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var warehouses = [];
    var items = [];
    var someId = 0;

    return {
        currentWarehouse: {},
        
        GetWarehouses: function() {
            return warehouses;
        },

        AddWarehouse: function(item) {
            warehouses.push({ name: item.name, id: someId++ });
        },

        ChangeWarehouse: function(newItem) {
            warehouses[newItem.id] = Object.assign({}, newItem);
        },

        DeleteWarehouse: function(key) {
            warehouses.splice(key, 1);
        },

        GetItems: function () {
            return items;
        },

        AddItem: function (newItem) {
            
        },

        ChangeItem: function () {

        },

        DeleteItem: function () {

        }
    }
})