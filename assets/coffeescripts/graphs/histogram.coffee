class @Eventoverse.Graphs.Histogram
  constructor: (@canvas)->

  render: (data)->
    @canvas.svg.selectAll(".bar")
          .data(data.values)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", (d) => @canvas.x(d.x))
          .attr("width", (d, i) => @canvas.width / data.values.length )
          .attr("y", (d) => @canvas.y(d.y))
          .attr("height", (d) => @canvas.height - @canvas.y(d.y))
