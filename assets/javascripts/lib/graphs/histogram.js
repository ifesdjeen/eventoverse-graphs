this.Eventoverse.Graphs.Histograms = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
    this.alreadyRendered = {};
  },

  renderHistogram: function(data, i) {
    var histogram;

    histogram = new Eventoverse.Graphs.Histogram(this.canvas, {
      histograms: this
    });
    return histogram.render(data, i);
  },

  render: function(data_orig) {
    var data, sorted_data;

    new Eventoverse.Graphs.LineColors(this.canvas).render(data_orig);
    data = Eventoverse.Utils.mergeData(data_orig);
    sorted_data = _.sortBy(data, function(d) {
      return -1 * d.y;
    });
    return this.renderHistogram(sorted_data, data);
  }
});


this.Eventoverse.Graphs.Histogram = new JS.Class({
  initialize: function(canvas, args) {
    this.canvas = canvas;
    this.args = args;
  },

  render: function(data, data_orig) {
    var width,
        _this = this;

    this.canvas.svg.selectAll(".bar").remove();
    width = 0;
    width = this.canvas.width / 55;
    return this.canvas.svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
      return _this.canvas.x0(d.x);
    }).attr("width", this.canvas.x0.rangeBand()).attr("y", function(d) {
      return _this.canvas.y(d.y);
    }).attr("height", function(d) {
      return _this.canvas.height - _this.canvas.y(d.y);
    }).style("fill", function(d) {
      return _this.canvas.colorForIndex(d.identifier);
    }).style("stroke-width", "2px").style("stroke", "white").attr("data-x", function(d) {
      return d.x;
    });
  }
});
