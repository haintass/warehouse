angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            items: [
                { fieldName: "first item", fieldType: "String" },
                { fieldName: "Count", fieldType: "Integer" }
            ]
        },
        {
            name: "Second warehouse",
            id: 1
        },
        {
            name: "Third warehouse",
            id: 2
        },
        {
            name: "Fourth warehouse",
            id: 3
        }
    ];
    var items = [];
    var warehouseId = warehouses.length;

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