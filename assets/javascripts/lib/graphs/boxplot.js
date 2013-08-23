this.Eventoverse.Graphs.BoxPlot = new JS.Class({
  initialize: function (elem) {
    this.elem = elem;

    this.emptyDataPoints();

    var data = this.dataPts;

    var margin = {top: 40, right: 20, bottom: 30, left: 20},
        width = 100 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    this.chart = d3.box()
      .whiskers(function(d, i) {return [0, 4];})
      .outliers(this.outl)
      .width(width)
      .height(height)
      .duration(10)
      .quartiles(function(d){return [d[1], d[2], d[3]];});

    this.chart.domain([0, 0]);

    this.svg = d3.selectAll(this.elem)
      .data([data])
      .append("svg")
      .attr("class", "box")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(this.chart);
  },

  render: function(data) {
    this.chart.outliers(this.outl);
    this.chart.domain([data[0], data[data.length - 1]]);
    this.svg.data([data]).call(this.chart);
  },
  redraw: function(data) {
    xthis.render(data);
  },

  emptyDataPoints: function() {
    this.dataPts = [0, 0, 0, 0, 0];
  },

  outl: function(d, i) {
    if (d.length > 5) {
      return d3.range(5, d.length - 1);
    } else {
      return [];
    }
  }
});
