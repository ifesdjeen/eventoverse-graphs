this.Eventoverse.Graphs.BoxPlot = new JS.Class({
  initialize: function (elem) {
    this.elem = elem;

    this.emptyDataPoints();

    var data = this.dataPts;

    var margin = {top: 40, right: 20, bottom: 30, left: 20},
        width = 100 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    this.chart = d3.box()
      .whiskers(this.iqr(1.5))
      .width(width)
      .height(height)

    this.chart.domain([0, Infinity]);

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
    data = data[0].values[0].y;
    // this.chart.outliers(this.outl);
    this.chart.domain([data[0], data[data.length - 1]]);
    this.svg.data([data]).call(this.chart);
  },

  redraw: function(data) {
    this.render(data);
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
  },

  // Returns a function to compute the interquartile range.
  iqr: function(k) {
    return function(d, i) {
      var q1 = d.quartiles[0],
          q3 = d.quartiles[2],
          iqr = (q3 - q1) * k,
          i = -1,
          j = d.length;
      while (d[++i] < q1 - this.iqr);
      while (d[--j] > q3 + this.iqr);
      return [i, j];
    };
  }
});
