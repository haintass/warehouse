angular.module("myApp").service('memoryStorageRepositoryService', function () {
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

    var currentWarehouseId = 1;

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
            return warehouses[currentWarehouseId];
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
        }
    }
    
    return self;
})