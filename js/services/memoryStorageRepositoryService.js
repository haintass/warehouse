angular.module("myApp").service('memoryStorageRepositoryService', function () {
    /* ---------------EXAMPLE------------------ */
    /*var listOfVarehouse1 = [{item: listOfPossibleItems[0], count: 400}];
    var listOfVarehouse2 = [{item: listOfPossibleItems[0], count: 10}];*/



    var maxItems = [{
                name: "motherboard",
                count: 20,
                price: 5000,
                madeInChina: true
            }
    ];
    /* ----------------END EXAMPLE----------------- */

    /* ----------------NEW LOGIC----------------- */
    var listOfPossibleItems = [
        {
            name: "motherboard",
            price: 5000,
            madeInChina: true
        },
        {
            name: "keyboard",
            price: 2000,
            madeInChina: false
        },
        {
            name: "Mouse",
            price: 1500,
            madeInChina: false
        },
        {
            name: "Monitor",
            price: 7000,
            madeInChina: true
        },
        {
            name: "HDD",
            price: 3000,
            madeInChina: true
        },
        {
            name: "SSD",
            price: 3000,
            madeInChina: false
        }
    ];

    var warehouses = [
        {
            name: "First warehouse",
            id: 0,
            table: {
                name: "First table",
                listOfItems: [
                    {item: listOfPossibleItems[0], count: 100 },
                    {item: listOfPossibleItems[0], count: 50 },
                    {item: listOfPossibleItems[1], count: 20 },
                    {item: listOfPossibleItems[3], count: 60 },
                    {item: listOfPossibleItems[5], count: 240 }
                ]
            }
        },
        {
            name: "Second warehouse",
            id: 1,
            table: {
                name: "First table",
                listOfItems: [
                    {item: listOfPossibleItems[1], count: 50 },
                    {item: listOfPossibleItems[3], count: 75 },
                    {item: listOfPossibleItems[4], count: 115 }
                ]
            }
        },
        {
            name: "Third warehouse",
            id: 2,
            table: {
                name: "My table",
                listOfItems: [
                    {item: listOfPossibleItems[2], count: 120 },
                    {item: listOfPossibleItems[3], count: 80 }
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
            var item = value.item ? value.item : value;

            if (_.isEqual(item, object)) {
                isEqual = true;
            }
        });

        return isEqual;
    }

    var ObjectIsExistenceInWarehouses = function (item) {
        var itemExistence = false;
        _.forEach(warehouses, function (value) {
            itemExistence = ObjectIsExistenceInList(value.table.listOfItems, item);

            if (itemExistence) {
                return false;
            }
        });

        return itemExistence;
    }

    var GetKeyOfPossibleItem = function (object) {
        var a = 0;
        
        _.forEach(listOfPossibleItems, function (value, key) {
            if (_.isEqual(value, object)) {
                a = key;
            }
        });

        return a;
    }

    var self = {
        itemsName: ["Name", "Price", "Made in China", "Count"],

        GetFiveGoodsWithTheMostExpensivePrice: function () {
            var allItems = self.GetAllItems();

            function DescendingSorting (a, b) {
                if (a.item.price < b.item.price) {
                    return 1;
                }
                if (a.item.price > b.item.price) {
                    return -1;
                }
                return 0;
            }

            allItems.sort(DescendingSorting);

            var firstFiveItems = [];

            for (var i = 0; i < 5; i++) {
                if (allItems[i] === undefined) {
                    break;
                }
                firstFiveItems.push(allItems[i]);
            }

            return firstFiveItems;
        },

        GetFiveGoodsWithTheMostCount: function () {
            var allItems = self.GetAllItems();

            function DescendingSorting (a, b) {
                if (a.count < b.count) {
                    return 1;
                }
                if (a.count > b.count) {
                    return -1;
                }
                return 0;
            }

            allItems.sort(DescendingSorting);

            var firstFiveItems = [];

            for (var i = 0; i < 5; i++) {
                if (allItems[i] === undefined) {
                    break;
                }
                firstFiveItems.push(allItems[i]);
            }

            return firstFiveItems;
        },

        ChangeSpecificItems: function (currentItemId, newValues) {
            listOfPossibleItems[currentItemId].name = newValues.name;
            listOfPossibleItems[currentItemId].price = newValues.price;
            listOfPossibleItems[currentItemId].madeInChina = newValues.madeInChina;

            return self.GetAllItems();
        },

        DeleteSpecificItems: function (itemId) {
            var item = listOfPossibleItems[itemId];
            listOfPossibleItems.splice(itemId, 1);

            for (var i = 0; i < warehouses.length; i++) {
                for (var j = 0; j < warehouses[i].table.listOfItems.length; j++) {
                    if (_.isEqual(warehouses[i].table.listOfItems[j].item, item)) {
                        warehouses[i].table.listOfItems.splice(j, 1);
                        j--;
                    }
                }
            }

            return self.GetAllItems();
        },

        GetAllItems: function () {
            var allItems = GetAllItemsWithTotalCount(_.cloneDeep(listOfPossibleItems));

            function GetAllItemsWithTotalCount (list) {
                var items = [];

                _.forEach(list, function (value) {
                    items.push({
                        item: value,
                        count: GetTotalCountsForItem(value)
                    });
                });

                function GetTotalCountsForItem (item) {
                    var totalCount = 0;
                    _.forEach(warehouses, function (value) {
                        _.forEach(value.table.listOfItems, function (itemOfWarehouse) {
                            if (_.isEqual(itemOfWarehouse.item, item)) {
                                totalCount += itemOfWarehouse.count;
                            }
                        });
                    });

                    return totalCount;
                }

                return items;
            }

            return allItems;
        },

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
            
            var itemExistence = ObjectIsExistenceInList(listOfPossibleItems, newItem.item);

            if (itemExistence) {
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
            var newItemExistence = ObjectIsExistenceInList(listOfPossibleItems, newItem.item);

            if (!newItemExistence) {
                var key = GetKeyOfPossibleItem(warehouses[currentWarehouseId].table.listOfItems[currentItemId].item);

                listOfPossibleItems.push(newItem.item);
                warehouses[currentWarehouseId].table.listOfItems[currentItemId] = newItem;

                newItemExistence = ObjectIsExistenceInWarehouses(listOfPossibleItems[key]);
                
                if (!newItemExistence) {
                    listOfPossibleItems.splice(key, 1);
                }
                
            }
            else {
                var oldItem = warehouses[currentWarehouseId].table.listOfItems[currentItemId].item;
                var key = GetKeyOfPossibleItem(newItem.item);
                warehouses[currentWarehouseId].table.listOfItems[currentItemId].item = listOfPossibleItems[key];
                warehouses[currentWarehouseId].table.listOfItems[currentItemId].count = newItem.count;

                var oldItemExistence = ObjectIsExistenceInWarehouses(oldItem);
                key = GetKeyOfPossibleItem(oldItem);
                if (!oldItemExistence) {
                    listOfPossibleItems.splice(key, 1);
                }
            }
            

            return self.GetCurrentWarehouse();
        },

        DeleteItems: function (itemId) {
            var item = warehouses[currentWarehouseId].table.listOfItems[itemId].item;   
                     
            warehouses[currentWarehouseId].table.listOfItems.splice(itemId, 1);

            var itemExistence = ObjectIsExistenceInWarehouses(item);
            
            if (!itemExistence) {
                var key = GetKeyOfPossibleItem(item);
                listOfPossibleItems.splice(key, 1);
            }

            return self.GetCurrentWarehouse();
        }
    }
    
    return self;
})