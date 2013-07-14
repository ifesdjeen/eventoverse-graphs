this.Eventoverse.Graphs.Tooltips = new JS.Class({
  initialize: function(canvas, args) {
    this.canvas = canvas;
    this.args = args || {};
    this.alreadyRendered = {};
  },

  render: function(data_orig) {
    var data, tooltip, tooltip_class;

    data = Eventoverse.Utils.mergeData(data_orig);
    data = _.reject(data, function(i) { return i.key === "null-keeper"; });

    tooltip_class = this.args.tooltip_class || Eventoverse.Graphs.Tooltip;

    tooltip = new tooltip_class(this.canvas, this.args);
    tooltip.render(data);
  }
});

this.Eventoverse.Graphs.Tooltip = new JS.Class({
  initialize: function(canvas, args) {
    this.canvas = canvas;
    this.args = args;
    this.render = _.bind(this.render, this);
  },

  renderCircles: function() {
    var _this = this;

    return this.circles
      .enter()
      .append('svg:circle')
      .attr('class', function(d) {
        return "data-point" + d.identifier;
      }).attr('cx', function(d, i) {
        return _this.canvas.x(d.x);
      }).attr('cy', function(d, i) {
        return _this.canvas.y(d.y);
      }).attr('r', function() {
        return 3;
      });
  },

  render: function(data) {
    var args, identifier, tipsy;
    var _this = this;

    identifier = data[0]["identifier"];

    this.canvas.svg.selectAll(".data-point" + identifier).remove();
    this.circles = this.canvas.svg.append('svg:g').selectAll(".data-point" + identifier).data(data);
    this.renderCircles(data);
    args = this.args;
    tipsy = {
      gravity: 'w',
      html: true,
      title: function() {
        if (_this.args.tip_formatter) {
          return args.tip_formatter(this.__data__);
        } else {
          return _this.tip_formatter(this.__data__);
        }
      }
    };
    return $('svg circle').tipsy(tipsy);
  },

  tip_formatter: function(d) {
    return "" + (new Date(d.x)) + " " + d.y + " (" + d.key + ")";
  },

  cleanup: function() {
    return this.circles.remove();
  }
});

this.Eventoverse.Graphs.StackedTooltip = new JS.Class(this.Eventoverse.Graphs.Tooltip, {
  renderCircles: function(data) {
    var _this = this;

    this.circles.enter()
      .append('svg:circle')
      .attr('class', function(d) {
        return "data-point" + d.identifier;
      }).attr('cx', function(d, i) {
        return _this.canvas.x(d.x);
      }).attr('cy', function(d, i) {
        return _this.canvas.y(_this.canvas.stackedHeights[[d.x, d.y]]);
      }).attr('r', function() {
        return 3;
      });
  }
});
