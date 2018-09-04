angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var itemsName = ["Name", "Count", "Price", "Just bool"]
    
    function createTrueItem(name, count, price, isMadeInChina){
        return {
            name:name, 
            count:count, 
            price:price,
            isMadeInChina:isMadeInChina, 

            getTotalPrice: getTotalPrice,
            getDetails: getDetails
        }

        function getTotalPrice(){
            if(this.isMadeInChina){
                return this.count * this.price * 0.5;
            }

            return this.count * this.price;
        }

        function getDetails(){
            return `Name: ${this.name}. And total price = ${ this.getTotalPrice() } `;
        }
    }

    /* Out World */
    var trueItems = [
        createTrueItem("motherboard", 20, 5000, true),
        createTrueItem("RAM", 50, 2000, false),
        createTrueItem("keyboard", 20, 5000, true),
    ];

    var sum = trueItems[0].getTotalPrice() +  trueItems[1].getTotalPrice() +  trueItems[2].getTotalPrice();





    var items = [
        [
            ["motherboard", 20, 5000, true],
            ["RAM", 50, 2000, false],
            ["Keyboard", 10, 2500, false],
            ["Mouse", 40, 1500, true],
            ["Monitor", 250, 12500, true]
        ]
    ];

    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            itemsName: itemsName,
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
    var currentWarehouseId = 0;

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