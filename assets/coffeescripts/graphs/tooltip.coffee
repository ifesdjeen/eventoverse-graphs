class @Eventoverse.Graphs.Tooltips
  constructor: (@canvas, @args)->
    @alreadyRendered = {}

  render: (data_orig)->
    data = Eventoverse.Utils.mergeData(data_orig)

    tooltip = new Eventoverse.Graphs.Tooltip(@canvas, @args)
    tooltip.render(data)

class @Eventoverse.Graphs.Tooltip
  constructor: (@canvas, @args)->

  renderCircles: ()->
    @circles.enter()
      .append('svg:circle')
      .attr('class', (d)-> "data-point#{d.identifier}")
      .attr('cx', (d, i)=>
        if @args.ordinal_scale
          @canvas.x0(d.x)
        else
          @canvas.x(d.x))
      .attr('cy', (d, i)=> @canvas.y(d.y))
      .attr('r', ()-> 3)

  render: (data)=>
    identifier = data[0]["identifier"]
    @canvas.svg.selectAll(".data-point#{identifier}").remove()

    @circles = @canvas.svg.append('svg:g').selectAll(".data-point#{identifier}").data(data)

    @renderCircles()

    args = @args
    tipsy =
      gravity: 'w'
      html: true
      title: ()->
        args.tip_formatter(this.__data__)
    $('svg circle').tipsy(tipsy)

  cleanup: ()->
    @circles.remove()
