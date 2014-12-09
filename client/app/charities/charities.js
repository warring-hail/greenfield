angular.module('pledgr.charities', [])

.controller('CharitiesController', function($scope, $http, $stateParams) {
  $scope.orgids = [
    $stateParams.c1,
    $stateParams.c2,
    $stateParams.c3
  ];
  $scope.orgids.forEach(function(orgid) {
    $http.get('/api/charity/' + orgid)
      .success(function(data) {
        $scope.makeChart(data);
      })
      .error(function(data, status) {
        console.log('ERROR', status, data);
      });
  });

  $scope.makeChart = function(data) {
    if (data && data.metrics) {
      var metrics = data.metrics;
      var program = parseFloat(metrics['Program Expenses']);
      var administrative = parseFloat(metrics['Administrative Expenses']);
      var fundraising = parseFloat(metrics['Fundraising Expenses']);
      var id = '#' + data.orgid;
      var charityExpensesChartDiv = '<div id=' + data.orgid + '></div>';
      $('#highchart-container').append(charityExpensesChartDiv);
      $(id).highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 1,//null,
          plotShadow: false
        },
        credits: false,
        title: {
          text: data.name
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Expenses',
          data: [
            ['Program', program],
            ['Administrative', administrative],
            ['Fundraising', fundraising]
          ]
        }]
      });
    }
  };
});
