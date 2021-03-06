this.Eventoverse.Graphs.LineColors = new JS.Class({
  initialize: function(canvas) {
    this.canvas = canvas;
  },

  renderColor: function(key, i, dp, div) {
    if (key == "null-keeper") return;

    var max, median, min;

    max = d3.round(d3.max(dp.values, function(a) {
      return a.y;
    }), 3);
    min = d3.round(d3.min(dp.values, function(a) {
      return a.y;
    }), 3);
    median = d3.round(d3.median(dp.values, function(a) {
      return a.y;
    }), 3);
    div.append($("<div><b>" + key + "</b>: max: " + max + ", min: " + min + ", median: " + median + "</div>")
               .attr('style', "color: " + this.canvas.colorForIndex(i) + "; "));
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
    this.lines = {};
  },
  renderLine: function(data, i) {
    if (data.key == "null-keeper" || _.isEmpty(data.values)) return;

    var line = new Eventoverse.Graphs.Line(this.canvas);
    line.render(data, i);
    this.lines[data.key] = line;
  },
  render: function(data) {
    var _this = this;

    new Eventoverse.Graphs.LineColors(this.canvas).render(data);
    return _.map(data, function(a, i) {
      return _this.renderLine(a, i);
    });
  },
  redraw: function(data) {
    var _this = this;
    var line;

    _.each(data, function(d, i) {
      if (_this.lines[d.key]) {
        line = _this.lines[d.key];
        line.redraw(d, i);
      } else {
        // _self.renderLine(d, i);
      }
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

  splitGaps: function(values) {
    var sum = [];
    _.reduce(
      _.map(values, function(i) {return i.x;}), function (a, b) {
        sum.push(b - a);
        return b;
      });

    var gapTheshold = d3.quantile(sum, 0.9);
    var newvals = [];
    var buffer = [];

    buffer.push(values[0]);
    _.reduce(values, function (a, b, c) {
      if ((b.x - a.x) <= gapTheshold) {
        buffer.push(b);
      } else {
        newvals.push(buffer);
        buffer = [b];
      }

      return b;
    });
    newvals.push(buffer);

    return newvals;
  },
  render: function(data) {
    var identifier, splitValues, _this;
    _this = this;

    identifier = data.values[0]["identifier"];
    this.canvas.svg.selectAll("path.eventoverse_graph_line" + identifier).remove();

    splitValues = this.splitGaps(data.values);

    _.each(splitValues, function(values) {
      _this.path = _this.path || _this.canvas.svg
        .append("g")
        .attr("class", "line eventoverse_graph_line" + identifier)
        .attr("clip-path", "url(#clip)")
        .append("path");

      _this.path
        .attr("d", _this.line()(data.values))
        .style("stroke", _this.canvas.colorForIndex(identifier))
        .transition()
        .duration(1)
        .ease("linear");
    });
  },
  redraw: function(data) {
    this.render(data);
    // this.path
    //   .data([data.values])
    //   .attr("d", this._line)
    //   .attr("transform", null)
    //   .transition()
    //   .duration(500)
    //   // Since we don't really know where to translate it, let's assume distance between two points is same
    //   .attr("transform", "translate(" + this.canvas.x(data.values[0].x - (data.values[2].x - data.values[1].x) ) + ",0)")
    //   .ease("linear");
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
