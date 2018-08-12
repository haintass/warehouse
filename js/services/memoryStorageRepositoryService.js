angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var items = [
        [
            {
                fieldName: "Name", fieldType: "String", id: 0,
                value: ["motherboard", "RAM", "keyboard", "monitor"]
            },
            {
                fieldName: "Count", fieldType: "Number", id: 1,
                value: [20, 50, 10, 15]
            },
            {
                fieldName: "Price", fieldType: "Number", id: 2,
                value: [5000, 2000, 2500, 7000]
            },
            {
                fieldName: "bool test", fieldType: "Boolean", id: 3,
                value: [true, false, false, true]
            }
        ]
    ];

    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            items: items[0]  
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
    
    var warehouseId = warehouses.length;
    var currentWarehouseId = null;

    var setCorrectType = function (value, type) {
        if (type === "Number") {
            return +value;
        }
        if (type === "Boolean")
        {
            return value === "true" ? true : false;
        }
        return value;
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
            _.forEach(newItem, function (value, key) {
                value.id = key;
            });
            items.push(newItem);
            warehouses[currentWarehouseId].items = newItem;
        },

        ChangeItems: function (oldValue, newValue) {
            _.isEqual(oldValue[0], newValue[0])
            warehouses[currentWarehouseId].items = items;
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

        //TODO: FIX ERROR IN EDIT MODE
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