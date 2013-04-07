class @Eventoverse.Graphs.Tooltips
  constructor: (@canvas, @args)->

  renderTooltip: (data, i)->
    line = new Eventoverse.Graphs.Tooltip(@canvas, @args)
    line.render(data, i)

  render: (data)->
    _.map(data, (a, i) => @renderTooltip(a,i))

class @Eventoverse.Graphs.Tooltip
  constructor: (@canvas, @args)->

  render: (data)=>
    @circles = @canvas.svg.append('svg:g').selectAll('.data-point').data(data.values)

    @circles.enter()
      .append('svg:circle')
      .attr('class', 'data-point')
      .attr('cx', (d, i)=> @canvas.x(d.x))
      .attr('cy', (d, i)=> @canvas.y(d.y))
      .attr('r', ()-> 3)

    args = @args
    tipsy =
      gravity: 'w'
      html: true
      title: ()->
        args.tip_formatter(this.__data__)

    $('svg circle').tipsy(tipsy)

  cleanup: ()->
    @circles.remove()
