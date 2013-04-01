class @Eventoverse.Graphs.Brush
  constructor: (@canvas)->
    @x2 = d3.time.scale()
      .range([0, @canvas.width])

    @brush = d3.svg.brush()
      .x(@x2)
      .on("brush", @onBrush)
      .on("brushend", @onBrushEnd)


  convertData: (data)->
    data[0].values

  render: (data)=>
    data = @convertData(data)

    @x2.domain(d3.extent(data, (d)-> d.x))

    @canvas.svg.append("g")
      .attr("class", "x brush")
      .call(@brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", @canvas.height + 7)

    this

  onBrush: ()=>
    @canvas.svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", @canvas.width)
      .attr("height", @canvas.height)
    @canvas.x.domain(if @brush.empty() then @x2.domain() else [@brush.extent()[0].getTime(), @brush.extent()[1].getTime()])

  onBrushEnd: ()=>
    @canvas.svg.select(".brush").call(@brush.clear())

    start = @canvas.x.domain()[0].getTime()
    end = @canvas.x.domain()[1].getTime()

    @x2.domain([start, end])

    if(end - start > 100000)
      d3.json "/graphs/temperature/minute.json?start=#{start}&end=#{end}", (all_data)=>
        @canvas.render(all_data, {skip: this})
    else
      d3.json "/graphs/temperature/raw.json?start=#{start}&end=#{end}", (all_data)=>
        @canvas.render(all_data, {skip: this})

    this

  resetZoom: ()->
    console.log(@x2.domain)
    @canvas.x.domain(@x2.domain())
    @canvas.svg.select(".x.axis").call(@canvas.xAxis)

    this
