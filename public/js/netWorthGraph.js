var moveChart = dc.lineChart('#monthly-move-chart');

//#### Stacked Area Chart
//Specify an area chart, by using a line chart with `.renderArea(true)`
moveChart
  .renderArea(true)
  .width(990)
  .height(200)
  .transitionDuration(1000)
  .margins({top: 30, right: 50, bottom: 25, left: 40})
  .dimension(moveMonths)
  .mouseZoomable(true)
  // Specify a range chart to link the brush extent of the range with the zoom focue of the current chart.
  .rangeChart(volumeChart)
  .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
  .round(d3.time.month.round)
  .xUnits(d3.time.months)
  .elasticY(true)
  .renderHorizontalGridLines(true)
  .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
  .brushOn(false)
  // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
  // legend
  // The `.valueAccessor` will be used for the base layer
  .group(indexAvgByMonthGroup, 'Monthly Index Average')
  .valueAccessor(function (d) {
    return d.value.avg;
  })
  // stack additional layers with `.stack`. The first paramenter is a new group.
  // The second parameter is the series name. The third is a value accessor.
  .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
    return d.value;
  })
  // title can be called by any stack layer.
  .title(function (d) {
    var value = d.value.avg ? d.value.avg : d.value;
    if (isNaN(value)) {
      value = 0;
    }
    return dateFormat(d.key) + '\n' + numberFormat(value);
  });
