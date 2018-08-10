angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            items:
            [
                { fieldName: "Name", fieldType: "String",
                    value: [ "motherboard", "RAM", "keyboard", "monitor" ]
                },
                { fieldName: "Count", fieldType: "Number",
                    value: [ 20, 50, 10, 15 ]
                },
                { fieldName: "Price", fieldType: "Number",
                    value: [ 5000, 2000, 2500, 7000 ]
                }
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