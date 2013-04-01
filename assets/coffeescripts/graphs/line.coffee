class @Eventoverse.Graphs.Line
  constructor: (@canvas)->

  line: ()->
    return @_line if @_line

    @_line = d3.svg.line()
      .interpolate(@canvas.defaults.interpolate)
      .x((d)=> @canvas.x(d.x))
      .y((d)=> @canvas.y(d.y))

  render: (data)->
    @canvas.svg.selectAll("path.eventoverse_graph_line").remove()

    @path = @canvas.svg.append("path")
      .datum(data.values)
      .attr("class", "line eventoverse_graph_line")
      .attr("clip-path", "url(#clip)")
      .attr("d", @line())
      .style("stroke", data.color)

    this

class @Eventoverse.Graphs.RealTimeLine extends Eventoverse.Graphs.Line
  constructor: (@canvas, @args)->
    @args.feed.addDispatcher(@tick)

  line: ()=>
    return @_line if @_line

    @_line = d3.svg.line()
      .interpolate(@canvas.defaults.interpolate)
      .x((d, i) => @canvas.x(i))
      .y((d, i) => @canvas.y(d.y))

  render: (data)->
    super(data)

  tick: (data)=>
    if (!@args.filter(data))
      return;

    @canvas.data.values.push(@args.extractor(data))

    if !@canvas.attrs.paused
      @path.attr("d", @line())
        .attr("transform", null)
        .transition()
        .duration(1)
        .ease("linear")
        .attr("transform", "translate(" + @canvas.x(0) + ")")

    @canvas.data.values.shift()

class @Eventoverse.Graphs.AggregateLine
  constructor: (@canvas) ->

  line: ()->
    return @_line if @_line

    @_line = d3.svg.line()
      .interpolate(@canvas.defaults.interpolate)
      .x((d)=> @canvas.x(d.x))
      .y((d)=> @canvas.y(d.y))

  render: (data)->
    data = Eventoverse.Utils.mergeData(data)

    @min_x = d3.min data, (d) -> d.x
    @max_x = d3.max data, (d) -> d.x

    @min_y = d3.min data, (d) -> d.y
    @max_y = d3.max data, (d) -> d.y

class @Eventoverse.Graphs.MinLine extends @Eventoverse.Graphs.AggregateLine
  render: (data)->
    super(data)

    @canvas.svg.selectAll("path.min").remove()

    min_line = [{x: @min_x, y: @min_y}, {x: @max_x, y: @min_y}]

   	@canvas.svg.append("path")
      .datum(min_line)
      .attr("class", "line min")
      .attr("d", @line())
      .attr('stroke-width', 2)
      .attr('stroke', "green")


class @Eventoverse.Graphs.MaxLine extends @Eventoverse.Graphs.AggregateLine
  render: (data)->
    super(data)

    max_line = [{x: @min_x, y: @max_y}, {x: @max_x, y: @max_y}]

    @canvas.svg.selectAll("path.max").remove()

   	@canvas.svg.append("path")
      .datum(max_line)
      .attr("class", "line max")
      .attr("d", @line())
      .attr('stroke-width', 2)
      .attr('stroke', "green")



class @Eventoverse.Graphs.Area
  constructor: (@canvas)->

  area: ()->
    return @_area if @_area

    @_area = d3.svg.area()
      .interpolate(@canvas.defaults.interpolate)
      .x((d)=> @canvas.x(d.x))
      .y0(@canvas.height)
      .y1((d)=> @canvas.y(d.y))

  render: (data)->
    @canvas.svg.selectAll("path.eventoverse_graph_area").remove()

    @path = @canvas.svg.append("path")
      .datum(data.values)
      .attr("class", "area eventoverse_graph_area")
      .attr("d", @area())

    this
