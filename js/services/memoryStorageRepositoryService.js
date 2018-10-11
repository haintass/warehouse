angular.module("myApp").service('memoryStorageRepositoryService', function () {
    /* ---------------EXAMPLE------------------ */
    var listOfPossibleItems = [
        {
            name: "motherboard",
            price: 5000,
            someBool: true
        },
        {
            name: "keyboard",
            price: 2000,
            someBool: false
        },
        {
            name: "Mouse",
            price: 1500,
            someBool: false
        },
        {
            name: "Monitor",
            price: 7000,
            someBool: true
        },
    ];

    var listOfVarehouse1 = [{item: listOfPossibleItems[0], count: 400}];
    var listOfVarehouse2 = [{item: listOfPossibleItems[0], count: 10}];



    var maxItems = [{
                name: "motherboard",
                count: 20,
                price: 5000,
                someBool: true
            }
    ];
    /* ----------------END EXAMPLE----------------- */

    /* ----------------NEW LOGIC----------------- */
    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            table: {
                name: "First table",
                listOfItems: [
                    {item: listOfPossibleItems[0], count: 100 },
                    {item: listOfPossibleItems[0], count: 50 },
                    {item: listOfPossibleItems[1], count: 20 }
                ]
            }
        }
    ]
    /* ----------------END NEW LOGIC----------------- */
    
    var warehouseId = warehouses.length;
    var currentWarehouseId = 0;

    var ObjectIsExistenceInList = function (list, object) {
        var isEqual = false;

        _.forEach(list, function (value) {
            if (_.isEqual(value, object.item)) {
                isEqual = true;
            }
        });

        return isEqual;
    }

    var GetKeyOfPossibleItem = function (object) {
        var a = -1;
        _.forEach(listOfPossibleItems, function (value, key) {
            if (_.isEqual(value, object.item)) {
                a = key;
            }
        });

        return a;
    }

    var self = {
        itemsName: ["Name", "Price", "Just bool", "Count"],

        SetCurrentWarehouseId: function (id) {
            currentWarehouseId = id;
        },

        GetWarehouses: function () {
            var allWarehouses = _.cloneDeep(warehouses);
            return allWarehouses;
        },

        GetCurrentWarehouse: function () {
            return _.cloneDeep(warehouses[currentWarehouseId]);
        },

        AddWarehouse: function (name) {
            warehouses.push({ name: name, id: warehouseId++ });
            
            return self.GetWarehouses();
        },

        ChangeWarehouse: function (newName, id) {
            warehouses[id].name = newName;

            return warehouses[id].name;
        },

        DeleteWarehouse: function (key) {
            warehouses.splice(key, 1);
            
            return self.GetWarehouses();
        },

        CreateTable: function (name) {
            warehouses[currentWarehouseId].table = {
                name: name,
                items: []
            };

            return self.GetCurrentWarehouse();
        },

        ChangeTableName: function (newName) {
            warehouses[currentWarehouseId].table.name = newName;

            return self.GetCurrentWarehouse();
        },

        DeleteTable: function () {
            warehouses[currentWarehouseId].table = null;

            return self.GetCurrentWarehouse();
        },

        AddItemsToTable: function (newItem) {
            if (!warehouses[currentWarehouseId].table.listOfItems) {
                warehouses[currentWarehouseId].table.listOfItems = [];
            }
            
            var isNewItem = !ObjectIsExistenceInList(listOfPossibleItems, newItem);

            if (!isNewItem) {
                warehouses[currentWarehouseId].table.listOfItems.push({item: newItem.item, count: newItem.count});
                
                return self.GetCurrentWarehouse();
            }
            else {
                listOfPossibleItems.push(newItem.item);
                warehouses[currentWarehouseId].table.listOfItems.push(newItem);
    
                return self.GetCurrentWarehouse();
            }
        },

        SaveChangesOfItems: function (newItem, currentItemId) {
            var isNewItemInPossibleItems = !ObjectIsExistenceInList(listOfPossibleItems, newItem);

            if (isNewItemInPossibleItems) {

            }
            else {
                var key = GetKeyOfPossibleItem(newItem);
                warehouses[currentWarehouseId].table.listOfItems[currentItemId].item = listOfPossibleItems[key];
                warehouses[currentWarehouseId].table.listOfItems[currentItemId].count = newItem.count;
            }

            return self.GetCurrentWarehouse();
        },

        DeleteItems: function (itemId) {
            warehouses[currentWarehouseId].table.listOfItems.splice(itemId, 1);

            return self.GetCurrentWarehouse();
        }
    }
    
    return self;
})