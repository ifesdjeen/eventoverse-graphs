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
            right: 20,
            bottom: 30,
            left: 50
        }
    };

    function Canvas(selector, attrs) {
        this.selector = selector;
        this.attrs = attrs;
        this.colors = d3.scale.category10();
        this.elements = [];
        this.width = 1000 - this.defaults.margin.left - this.defaults.margin.right;
        this.height = 250 - this.defaults.margin.top - this.defaults.margin.bottom;
        this.x = d3.time.scale().range([0, this.width]);
        this.y = d3.scale.linear().range([this.height, 0]);
        this.svg = d3.select(this.selector).append("svg").attr("width", this.width + this.defaults.margin.left + this.defaults.margin.right).attr("height", this.height + this.defaults.margin.top + this.defaults.margin.bottom).append("g").attr("transform", "translate(" + this.defaults.margin.left + "," + this.defaults.margin.top + ")");
        this.svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", this.width).attr("height", this.height);
        this.prepareAxes();
        this;
    }

    Canvas.prototype.addElement = function(element, args) {
        this.elements.push(new element(this, args));
        return this;
    };

    Canvas.prototype.xAxis = function() {
        return d3.svg.axis().scale(this.x).orient("bottom").tickSubdivide(false).tickSize(5, 0, 5).tickFormat(this.x_formatter);
    };

    Canvas.prototype.yAxis = function() {
        return d3.svg.axis().scale(this.y).orient("left").ticks(10).tickSubdivide(1).tickSize(10, 5, 10);
    };

    Canvas.prototype.prepareAxes = function() {
        var renderedYAxis;

        this.axes = this.svg.append("svg:g").classed("rules", true);
        this.axes.append("g").classed("x axis", true).attr("transform", "translate(0," + this.height + ")").append("text").attr("x", this.width).attr("dy", "2.5em").style("text-anchor", "end").text(this.attrs.x.caption || this.defaults.x.caption);
        this.axes.append("g").classed("x grid", true).attr("transform", "translate(0," + this.height + ")");
        this.axes.append("g").classed("y grid", true);
        renderedYAxis = this.axes.append("g").classed("y axis", true);
        renderedYAxis.append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(this.attrs.y.caption || this.defaults.y.caption);
        return this;
    };

    Canvas.prototype.render = function(data, opts) {
        this.data = data;
        this.renderAxes(data);
        return _.each(this.elements, function(element) {
            if (opts && opts.skip === element) {
                return;
            }
            console.log("Starting rendering: ", element, data);
            element.render(data);
            return console.log("Finished rendering: ", element, data);
        });
    };

    Canvas.prototype.x_formatter = d3.time.format("%H:%M");

    Canvas.prototype.renderAxes = function(all_data) {
        var data, extension, extension_min, very_max, very_max_x, very_min, very_min_x, x_step, _ref;

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
        x_step = (very_max_x - very_min_x) / data.length;
        this.x.domain(d3.extent(data, function(d, i) {
            return very_min_x + (x_step * i);
        }));
        extension = (very_max - very_min) / 10;
        extension_min = (_ref = (very_min - extension) < 0) != null ? _ref : {
            0: very_min - extension
        };
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
