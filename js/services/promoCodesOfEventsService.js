angular.module("myApp").service('promoCodesOfEventsService', function () {
    var promoCodes = {
        "promo1": {
            isValid: true,
            discountType: "percent",
            discountAmount: 15
        },
        "promo2": {
            isValid: true,
            discountType: "amount",
            discountAmount: 200
        },
        "promo3": {
            isValid: false,
            discountType: "amount",
            discountAmount: 400
        }
    }


    return {
        
    }
})