angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            items:
                [
                    {
                        fieldName: "Name", fieldType: "String",
                        value: ["motherboard", "RAM", "keyboard", "monitor"]
                    },
                    {
                        fieldName: "Count", fieldType: "Number",
                        value: [20, 50, 10, 15]
                    },
                    {
                        fieldName: "Price", fieldType: "Number",
                        value: [5000, 2000, 2500, 7000]
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
    var currentWarehouseId = null;

    var setCorrectType = function (value, type) {
        if (type === "Number") {
           return +value;
        }
    }

    return {
        SetCurrentWarehouseId: function (id) {
            currentWarehouseId = id;
        },

        GetWarehouses: function () {
            return warehouses;
        },

        GetCurrentWarehouse: function () {
            return warehouses[currentWarehouseId];
        },

        AddWarehouse: function (item) {
            warehouses.push({ name: item.name, id: warehouseId++ });
        },

        ChangeWarehouse: function (newItem) {
            warehouses[newItem.id] = newItem;
        },

        DeleteWarehouse: function (key) {
            warehouses.splice(key, 1);
        },

        GetItems: function () {
            return items;
        },

        AddItem: function (newItem) {
            items.push(newItem);
            warehouses[currentWarehouseId].items = newItem;
        },

        ChangeItem: function () {

        },

        DeleteItems: function () {
            warehouses[currentWarehouseId].items = null;
        },

        AddNewValueToItems: function (values) {
            _.forEach(values, function (value, key) {
                if (!warehouses[currentWarehouseId].items[key].value) {
                    warehouses[currentWarehouseId].items[key].value = [];
                }

                value = setCorrectType(value, warehouses[currentWarehouseId].items[key].fieldType);
                
                warehouses[currentWarehouseId].items[key].value.push(value);
            })
        },

        DeleteValuesFromItems: function (values, valueId) {
            _.forEach(values, function (value, key) {
                warehouses[currentWarehouseId].items[key].value.splice(valueId, 1);
            });
        },

        SaveValuesChangesInItems: function (newValue, itemId, valueId) {
            if (warehouses[currentWarehouseId].items[itemId].value[valueId] != newValue) {
                newValue = setCorrectType(newValue, warehouses[currentWarehouseId].items[itemId].fieldType);
                warehouses[currentWarehouseId].items[itemId].value[valueId] = newValue;
            }
        }
    }
})