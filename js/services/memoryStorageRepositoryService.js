angular.module("myApp").service('memoryStorageRepositoryService', function () {
    var items = [
        {
            name: "item1",
            id: 1,
            amount: 200,
            price: 150
    },
        {
            name: "item2",
            id: 2,
            amount: 450,
            price: 50
    },
        {
            name: "item3",
            id: 3,
            amount: 10,
            price: 1500
    },
        {
            name: "item4",
            id: 4,
            amount: 60,
            price: 12000
    }
    ];
     

    return {
        GetItems: function () {
            return items;
        },

        AddItem: function () {
            if (Object.keys(this.item).length == 0) {
                return;
            } else {
                items.push(this.item);
                this.item = {};
            }
        },

        //WTF???!!!
        ChangeItem: function () {
            items[this.keyItem] = Object.assign({}, this.item);
        },

        DeleteItem: function () {
            items.splice(this.keyItem, 1);
        }
    }
})