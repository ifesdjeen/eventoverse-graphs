this.Eventoverse.Graphs.Canvas = new JS.Class({
  defaults: {
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
    base_width: 800,
    base_height: 250
  },

  initialize: function (selector, attrs) {
    // console.log(attrs);

    // do we want to use the defaults or user pased settings?
    
    $(selector).css('width', this.defaults.base_width + "px");
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
  },

  addElement: function(element, args) {
    this.elements.push(new element(this, args));
    return this;
  },

  xAxis: function() {
    return d3.svg.axis()
      .scale(this.x)
      .orient("bottom")
      .tickSubdivide(false)
      .tickFormat(this.x_formatter);
  },

  yAxis: function() {
    return d3.svg.axis()
      .scale(this.y)
      .orient("left")
      .ticks(10)
      .tickSubdivide(1);
  },

  prepareAxes: function() {
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
  },

  render: function(data, opts) {
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
  },

  x_formatter: d3.time.format("%H:%M"),

  renderAxes: function(all_data) {
    var data, very_max, very_max_x, very_min, very_min_x, _ref;

    data = Eventoverse.Utils.mergeData(all_data);

    very_min_x = d3.min(data, function(d) {
      return d.x;
    });
    very_max_x = d3.max(data, function(d) {
      return d.x;
    });

    this.x.domain([very_min_x, very_max_x]);
    this.y.domain(this.domain(data));
    // this.y.domain([extension_min, max_sum_y]);

    this.svg.select(".x.axis").call(this.xAxis());
    this.svg.select(".y.axis").call(this.yAxis());
    this.svg.select(".x.grid").call(this.xAxis().tickSize(-this.height, 0, 0).tickFormat(""));
    this.svg.select(".y.grid").call(this.yAxis().tickSize(-this.width, 0, 0).tickFormat(""));
    return this;
  },

  domain: function (data) {
    var very_min, very_max, extension, extension_min;

    very_min = d3.min(data, function(d) {
      return d.y;
    });
    very_max = d3.max(data, function(d) {
      return d.y;
    });

    extension = (very_max - very_min) / 10;
    extension_min = (very_min - extension) < 0 ? 0 : (very_min - extension);

    extension_min = (very_min - extension) < 0 ? 0 : (very_min - extension);
    return [extension_min, very_max + extension];
  },

  colorForIndex: function(i) {
    return this.colors(i);
  }
});

this.Eventoverse.Graphs.StackedCanvas = new JS.Class(this.Eventoverse.Graphs.Canvas, {
  domain: function(data) {
    var domain = this.callSuper();
    var yMappings = {};

    _.each(data, function(d) {
      if (yMappings[d.x] === undefined) {
        yMappings[d.x] = d.y;
      } else {
        yMappings[d.x] += d.y;
      }
    });

    max_sum_y = _.max(yMappings, function(d) {return d;});
    return [domain[0], max_sum_y];
  }
});
