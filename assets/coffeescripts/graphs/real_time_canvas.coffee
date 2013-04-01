class @Eventoverse.Graphs.RealTimeCanvas extends Eventoverse.Graphs.Canvas
  xFormatter: ()-> ""
  constructor: (@selector, @attrs)->
    super(@selector, @attrs)
    @attrs.paused = false

  render: (data, opts)->
    @data = data
    @renderAxes(data)

    _.each @elements, (element)->
      if (opts && opts.skip == element)
        return

      console.log("Starting rendering: ", element, data)
      element.render(data)
      console.log("Finished rendering: ", element, data)

  renderAxes: (all_data)->
    data = Eventoverse.Utils.mergeData(all_data)

    @svg.select(".x.axis").call(@xAxis())
    @svg.select(".y.axis").call(@yAxis())

    @svg.select(".x.grid").call(@xAxis().tickSize(-@height,0,0).tickFormat(""))
    @svg.select(".y.grid").call(@yAxis().tickSize(-@width,0,0).tickFormat(""))

    this
