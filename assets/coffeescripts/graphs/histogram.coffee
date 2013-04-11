# With bar charts, there're several problems:
# First one is the fact that data is very sparse, therefore it's very complicated to locate it on the graph correctly
# That leads to the problem that
class @Eventoverse.Graphs.Histograms
  constructor: (@canvas)->
    @alreadyRendered = {}

  renderHistogram: (data, i)->
    histogram = new Eventoverse.Graphs.Histogram(@canvas, {histograms: this})
    histogram.render(data, i)

  render: (data_orig)->
    new Eventoverse.Graphs.LineColors(@canvas).render(data_orig)
    data = Eventoverse.Utils.mergeData(data_orig)
    sorted_data = _.sortBy(data, (d)-> -1 * d.y)
    @renderHistogram(sorted_data, data)

class @Eventoverse.Graphs.Histogram
  constructor: (@canvas, @args)->

  render: (data, data_orig)->
    @canvas.svg.selectAll(".bar").remove()

    width = 0
    width = @canvas.width / 55

    @canvas.svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          # .attr("x", (d) => @canvas.x(d.x))
          # http://bl.ocks.org/mbostock/3885304
          .attr("x", (d) => @canvas.x0(d.x))
          # .attr("width", (d, i) => width)
          .attr("width", @canvas.x0.rangeBand())
          .attr("y", (d) => @canvas.y(d.y))
          .attr("height", (d) => @canvas.height - @canvas.y(d.y))
          .style("fill", (d) => @canvas.colorForIndex(d.identifier))
          .style("stroke-width", "2px")
          .style("stroke", "white")
          .attr("data-x", (d)-> d.x)