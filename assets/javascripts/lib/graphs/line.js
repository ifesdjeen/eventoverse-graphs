this.Eventoverse.Graphs.LineColors = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
  },

  renderColor: function(key, i, dp, div) {
    var max, median, min;

    max = d3.max(dp.values, function(a) {
      return a.y;
    });
    min = d3.min(dp.values, function(a) {
      return a.y;
    });
    median = d3.median(dp.values, function(a) {
      return a.y;
    });
    return div.append($("<div>" + key + ", max: " + max + ", min: " + min + ", median: " + median + "</div>")
                      .attr('style', "color: " + (this.canvas.colorForIndex(i)) + "; "));
  },

  render: function(data) {
    var div,
        _this = this;

    $(this.canvas.selector).find(".line_colors").remove();
    div = $("<div class='line_colors'</div>");
    _.map(data, function(a, i) {
      return _this.renderColor(a.key, i, a, div);
    });
    return $(this.canvas.selector).append(div);
  }
});


this.Eventoverse.Graphs.Lines = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
  },
  renderLine: function(data, i) {
    var line;

    line = new Eventoverse.Graphs.Line(this.canvas);
    return line.render(data, i);
  },
  render: function(data) {
    var _this = this;

    new Eventoverse.Graphs.LineColors(this.canvas).render(data);
    return _.map(data, function(a, i) {
      return _this.renderLine(a, i);
    });
  }
});

this.Eventoverse.Graphs.Line = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
  },

  line: function() {
    var _this = this;

    if (this._line) {
      return this._line;
    }
    return this._line = d3.svg.line().interpolate(this.canvas.defaults.interpolate).x(function(d) {
      return _this.canvas.x(d.x);
    }).y(function(d) {
      return _this.canvas.y(d.y);
    });
  },

  render: function(data) {
    var identifier;

    identifier = data.values[0]["identifier"];
    this.canvas.svg.selectAll("path.eventoverse_graph_line" + identifier).remove();
    this.path = this.canvas.svg.append("path").datum(data.values).attr("class", "line eventoverse_graph_line" + identifier).attr("clip-path", "url(#clip)").attr("d", this.line()).style("stroke", this.canvas.colorForIndex(identifier));
    return this;
  }
});

this.Eventoverse.Graphs.AggregateLine = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
  },

  line: function() {
    var _this = this;

    if (this._line) {
      return this._line;
    }
    return this._line = d3.svg.line().interpolate(this.canvas.defaults.interpolate).x(function(d) {
      return _this.canvas.x(d.x);
    }).y(function(d) {
      return _this.canvas.y(d.y);
    });
  },

  render: function(data) {
    data = Eventoverse.Utils.mergeData(data);
    this.min_x = d3.min(data, function(d) {
      return d.x;
    });
    this.max_x = d3.max(data, function(d) {
      return d.x;
    });
    this.min_y = d3.min(data, function(d) {
      return d.y;
    });
    return this.max_y = d3.max(data, function(d) {
      return d.y;
    });
  }

});

this.Eventoverse.Graphs.MinLine = new JS.Class(this.Eventoverse.Graphs.AggregateLine, {

  initialize: function() {
    this.callSuper();
  },

  render: function(data) {
    var min_line;

    this.callSuper();

    this.canvas.svg.selectAll("path.min").remove();
    min_line = [
      {
        x: this.min_x,
        y: this.min_y
      }, {
        x: this.max_x,
        y: this.min_y
      }
    ];
    return this.canvas.svg.append("path")
      .datum(min_line)
      .attr("class", "line min")
      .attr("d", this.line())
      .attr('stroke-width', 2)
      .attr('stroke', "green");
  }
});

this.Eventoverse.Graphs.MaxLine = new JS.Class(this.Eventoverse.Graphs.AggregateLine, {
  initialize: function() {
    this.callSuper();
  },

  render: function(data) {
    var max_line;

    this.callSuper();
    max_line = [
      {
        x: this.min_x,
        y: this.max_y
      }, {
        x: this.max_x,
        y: this.max_y
      }
    ];
    this.canvas.svg.selectAll("path.max").remove();
    return this.canvas.svg.append("path")
      .datum(max_line)
      .attr("class", "line max")
      .attr("d", this.line())
      .attr('stroke-width', 2)
      .attr('stroke', "green");
  }

});

this.Eventoverse.Graphs.Area = new JS.Class({

  initialize: function(canvas) {
    this.canvas = canvas;
  },

  area: function() {
    var _this = this;

    if (this._area) {
      return this._area;
    }
    return this._area = d3.svg.area().interpolate(this.canvas.defaults.interpolate).x(function(d) {
      return _this.canvas.x(d.x);
    }).y0(this.canvas.height).y1(function(d) {
      return _this.canvas.y(d.y);
    });
  },

  render: function(data) {
    this.canvas.svg.selectAll("path.eventoverse_graph_area").remove();
    this.path = this.canvas.svg
      .append("path")
      .datum(data.values)
      .attr("class", "area eventoverse_graph_area")
      .attr("d", this.area());
    return this;
  }
});
