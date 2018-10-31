angular.module("myApp").directive('charts', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/charts.html',
        controller: function (memoryStorageRepositoryService) {
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(DrawLargestCountGoods);
            google.charts.setOnLoadCallback(DrawLargestPriceGoods);

            var listOfFiveGoodsWithTheMostCount = memoryStorageRepositoryService.GetFiveGoodsWithTheMostCount();
            listOfPossibleItems = memoryStorageRepositoryService.GetFiveGoodsWithTheMostExpensivePrice();
      
            function DrawLargestCountGoods() {
                var data = google.visualization.arrayToDataTable([['Item', 'Count']]);
          
                for (var i = 0; i < listOfFiveGoodsWithTheMostCount.length; i++) {
                    data.xg.push({
                        c: [
                            {v: listOfFiveGoodsWithTheMostCount[i].item.name},
                            {v: listOfFiveGoodsWithTheMostCount[i].count}
                        ]
                    });
                }
        
                var options = {
                    title: 'The greatest amount of goods',
                    is3D: true
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(data, options);
            }

            function DrawLargestPriceGoods () {
                var arr = [['Item', 'Price', 'Count']];

                for (var i = 0; i < listOfPossibleItems.length; i++) {
                    arr.push([
                        listOfPossibleItems[i].item.name,
                        listOfPossibleItems[i].item.price,
                        listOfPossibleItems[i].count
                    ]);
                }

                var data = google.visualization.arrayToDataTable(
                   arr
                 );

                var options = {
                    title: 'The most expensive goods'
                }

                var chart = new google.visualization.BarChart(document.getElementById('barchart'));
                chart.draw(data, options);
            }
        }
    }
});