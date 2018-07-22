angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var warehouses = [];
    var items = [];
    var warehouseId = 0;

    return {
        currentWarehouse: {},
        
        GetWarehouses: function() {
            return warehouses;
        },

        AddWarehouse: function(item) {
            warehouses.push({ name: item.name, id: warehouseId++ });
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
            items.push(newItem);
            this.currentWarehouse.items = newItem;
        },

        ChangeItem: function () {

        },

        DeleteItem: function () {

        }
    }
})