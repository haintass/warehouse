angular.module("myApp").service('memoryStorageRepositoryService', function () {

    var listOfPossibleItems = [{
        name: "motherboard",
        price: 5000,
        someBool: true
    },{
        name: "keyboard",
        price: 100,
        someBool: true
    }];


    var listOfVarehouse1 = [{item: listOfPossibleItems[0], count: 400}];
    var listOfVarehouse2 = [{item: listOfPossibleItems[0], count: 10}];



    var maxItems = [{
                name: "motherboard",
                count: 20,
                price: 5000,
                someBool: true
            }
    ];

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
            tables: [
                {
                    name: "First table",
                    id: 0,
                    items: items[0]
                }
            ]
        },
        {
            name: "Second warehouse",
            id: 1,
            tables: [
                {
                    name: "Get out!!!",
                    id: 0,
                    items: []
                }
            ]
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

    var self = {
        itemsName: ["Name", "Count", "Price", "Just bool"],

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
        },

        DeleteWarehouse: function (key) {
            warehouses.splice(key, 1);
            
            return self.GetWarehouses();
        },

        CreateTable: function (name) {
            if (!warehouses[currentWarehouseId].tables) {
                warehouses[currentWarehouseId].tables = [];
            }

            warehouses[currentWarehouseId].tables.push({
                name: name,
                id: warehouses[currentWarehouseId].tables.length,
                items: []
            });

            return self.GetCurrentWarehouse();
        },

        ChangeTableName: function (newName, tableId) {
            warehouses[currentWarehouseId].tables[tableId].name = newName;

            return self.GetCurrentWarehouse();
        },

        DeleteTable: function (id) {
            warehouses[currentWarehouseId].tables.splice(id, 1);

            if (warehouses[currentWarehouseId].tables.length === 0) {
                warehouses[currentWarehouseId].tables = null;
            }

            return self.GetCurrentWarehouse();
        },

        AddItemsToTable: function (newItems, tableId) {
            if (!warehouses[currentWarehouseId].tables[tableId].items) {
                warehouses[currentWarehouseId].tables[tableId].items = [];
            }
            
            warehouses[currentWarehouseId].tables[tableId].items.push(newItems);

            return self.GetCurrentWarehouse();
        },

        SaveChangesOfItems: function (newItem, currentTableId, currentItemId) {
            warehouses[currentWarehouseId].tables[currentTableId].items[currentItemId] = newItem;

            return self.GetCurrentWarehouse();
        },

        DeleteItems: function (tableId, itemId) {
            warehouses[currentWarehouseId].tables[tableId].items.splice(itemId, 1);

            return self.GetCurrentWarehouse();
        }
    }
    
    return self;
})