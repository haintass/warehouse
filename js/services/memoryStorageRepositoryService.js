angular.module("myApp").service('memoryStorageRepositoryService', function () {
    /* ---------------EXAMPLE------------------ */
    var listOfPossibleItems = [
        {
            name: "motherboard",
            count: 100,
            price: 5000,
            someBool: true
        },
        {
            name: "keyboard",
            count: 200,
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
                id: 0,
                items: [ listOfPossibleItems[0], listOfPossibleItems[1] ], 
                count: 100 
            }
        }
    ]
    /* ----------------END NEW LOGIC----------------- */


    var items = [
        [
            ["motherboard", 20, 5000, true],
            ["RAM", 50, 2000, false],
            ["Keyboard", 10, 2500, false],
            ["Mouse", 40, 1500, true],
            ["Monitor", 250, 12500, true]
        ]
    ];

    var warehouses1 = [
        {
            name: "First warehouse",
            id: 0,
            table:
            {
                name: "First table",
                id: 0,
                items: items[0]
            }
        },
        {
            name: "Second warehouse",
            id: 1,
            table:
            {
                name: "Get out!!!",
                id: 0,
                items: []
            }
            
        },
        {
            name: "Third warehouse",
            id: 2,
            table: null
        },
        {
            name: "Fourth warehouse",
            id: 3,
            table: null
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

        AddItemsToTable: function (newItems) {
            if (!warehouses[currentWarehouseId].table.items) {
                warehouses[currentWarehouseId].table.items = [];
            }
            
            warehouses[currentWarehouseId].table.items.push(newItems);

            return self.GetCurrentWarehouse();
        },

        SaveChangesOfItems: function (newItem, currentItemId) {
            warehouses[currentWarehouseId].table.items[currentItemId] = newItem;

            return self.GetCurrentWarehouse();
        },

        DeleteItems: function (itemId) {
            warehouses[currentWarehouseId].table.items.splice(itemId, 1);

            return self.GetCurrentWarehouse();
        }
    }
    
    return self;
})