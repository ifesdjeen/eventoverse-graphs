this.Eventoverse.Graphs.Canvas = (function() {
  Canvas.prototype.defaults = {
    x: {
      caption: ""
    },
    y: {
      caption: ""
    },
    interpolate: "cardinal",
    margin: {
      top: 20,
      right: 30,
      bottom: 30,
      left: 50
    },
    base_width: 1000,
    base_height: 250
  };

  function Canvas(selector, attrs) {
    this.selector = selector;
    this.attrs = attrs;
    this.colors = d3.scale.category10();
    this.elements = [];

    this.width = this.defaults.base_width - this.defaults.margin.left - this.defaults.margin.right;
    this.height = this.defaults.base_height - this.defaults.margin.top - this.defaults.margin.bottom;

    this.x = d3.time.scale().range([0, this.width]);
    this.y = d3.scale.linear().range([this.height, 0]);

    this.svg = d3.select(this.selector).append("svg")
      .attr("width", this.defaults.base_width)
      .attr("height", this.defaults.base_height)
      .append("g")
      .attr("transform", "translate(" + this.defaults.margin.left + "," + this.defaults.margin.top + ")");

    this.svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.defaults.base_width)
      .attr("height", this.defaults.base_height);

    return this;
  }

  Canvas.prototype.addElement = function(element, args) {
    this.elements.push(new element(this, args));
    return this;
  };

  Canvas.prototype.xAxis = function() {
    return d3.svg.axis()
      .scale(this.x)
      .orient("bottom")
      .tickSubdivide(false)
      .tickFormat(this.x_formatter);
  };

  Canvas.prototype.yAxis = function() {
    return d3.svg.axis()
      .scale(this.y)
      .orient("left")
      .ticks(10)
      .tickSubdivide(1);
  };

  Canvas.prototype.prepareAxes = function() {
    var renderedYAxis;

    this.axes = this.svg.append("svg:g").classed("rules", true);
    this.axes.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + this.height + ")")
      .append("text")
      .attr("x", this.width)
      .attr("dy", "2.5em")
      .style("text-anchor", "end")
      .text(this.attrs.x.caption || this.defaults.x.caption);

    this.axes.append("g")
      .classed("x grid", true)
      .attr("transform", "translate(0," + this.height + ")");

    this.axes.append("g").classed("y grid", true);
    renderedYAxis = this.axes.append("g").classed("y axis", true);
    renderedYAxis.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(this.attrs.y.caption || this.defaults.y.caption);
    return this;
  };

  Canvas.prototype.render = function(data, opts) {
    this.data = data;
    this.prepareAxes();
    this.renderAxes(data);
    return _.each(this.elements, function(element) {
      if (opts && opts.skip === element) {
        return;
      }

      Eventoverse.log("Starting rendering: ", element, data);
      element.render(data);
      Eventoverse.log("Finished rendering: ", element, data);
    });
  };

  Canvas.prototype.x_formatter = d3.time.format("%H:%M");

  Canvas.prototype.renderAxes = function(all_data) {
    var data, extension, extension_min, very_max, very_max_x, very_min, very_min_x, _ref;

    data = Eventoverse.Utils.mergeData(all_data);
    this.x0 = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
    this.x0.domain(_.map(data, function(d) {
      return d.x;
    }));
    very_min = d3.min(data, function(d) {
      return d.y;
    });
    very_max = d3.max(data, function(d) {
      return d.y;
    });
    very_min_x = d3.min(data, function(d) {
      return d.x;
    });
    very_max_x = d3.max(data, function(d) {
      return d.x;
    });

    extension = (very_max - very_min) / 10;
    extension_min = (very_min - extension) < 0 ? 0 : (very_min - extension);

    this.x.domain([very_min_x, very_max_x]);
    this.y.domain([extension_min, very_max + extension]);
    this.svg.select(".x.axis").call(this.xAxis());
    this.svg.select(".y.axis").call(this.yAxis());
    this.svg.select(".x.grid").call(this.xAxis().tickSize(-this.height, 0, 0).tickFormat(""));
    this.svg.select(".y.grid").call(this.yAxis().tickSize(-this.width, 0, 0).tickFormat(""));
    return this;
  };

  Canvas.prototype.colorForIndex = function(i) {
    return this.colors(i);
  };

  return Canvas;

})();
