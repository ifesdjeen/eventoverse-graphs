this.Eventoverse.Graphs.Histograms = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
  },

  renderHistogram: function(data) {
    var histogram;

    histogram = new Eventoverse.Graphs.Histogram(this.canvas, {
      histograms: this
    });

    return histogram.render(data);
  },

  render: function(data_orig) {
    var data;
    new Eventoverse.Graphs.LineColors(this.canvas).render(data_orig);
    data = Eventoverse.Utils.mergeData(data_orig);
    return this.renderHistogram(data);
  }
});


this.Eventoverse.Graphs.Histogram = new JS.Class({
  initialize: function(canvas, args) {
    this.canvas = canvas;
    this.args = args;
  },

  render: function(data) {
    var _this = this;

    this.canvas.svg.selectAll(".bar").remove();

    var amount = d3.max(_.map(_.groupBy(data, function(a) { return a.identifier; }), function(a) { return a.length }));

    var yMappings = {};

    _.each(data, function(d) {
      if (yMappings[d.x] === undefined) {
        yMappings[d.x] = d.y;
      } else {
        yMappings[d.x] += d.y;
      }
    });

    _this.canvas.stackedHeights = {};

    this.canvas.svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return _this.canvas.x(d.x);
      }).attr("width", 800 / (amount+15))
      .attr("y", function(d) {
        var y  = yMappings[d.x];
        yMappings[d.x] -= d.y;
        _this.canvas.stackedHeights[[d.x, d.y]] = y;
        return _this.canvas.y(y);
      }).attr("height", function(d) {
        return _this.canvas.height - _this.canvas.y(d.y);
      }).style("fill", function(d) {
        return _this.canvas.colorForIndex(d.identifier);
      }).style("stroke-width", "1px").style("stroke", "white")
      .attr("data-x", function(d) {
        return d.x;
      });
  }
});
