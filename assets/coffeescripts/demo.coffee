$(()->
  attrs =
    x:
      caption: "Last 400 data points"
    y:
      caption: "Response time, seconds"
      buffer_size: 400


  Eventoverse.canvas = new Eventoverse.Graphs.Canvas("#line_chart", attrs)
  Eventoverse.canvas.addElement(Eventoverse.Graphs.Histogram)

  # Eventoverse.canvas.addElement(Eventoverse.Graphs.Line)
  # Eventoverse.canvas.addElement(Eventoverse.Graphs.Area)
  # Eventoverse.canvas.addElement(Eventoverse.Graphs.Brush)
  # Eventoverse.canvas.addElement(Eventoverse.Graphs.MinLine)
  # Eventoverse.canvas.addElement(Eventoverse.Graphs.MaxLine)
  # Eventoverse.canvas.addElement(Eventoverse.Graphs.Tooltip, {tip_formatter: (d)-> "123"})
  Eventoverse.canvas.render(Eventoverse.RandomData.generate(20))

  # d3.json("/demo_data/line_chart.json", (all_data)->
  #   )
  )


class @Eventoverse.RandomData
  @counter: 100
  @generate_one: ()->
    time = Math.floor(new Date().getTime() / 1000)
    rnd = Math.random() * 10
    Eventoverse.RandomData.counter = Eventoverse.RandomData.counter + 20
    {x: time + Eventoverse.RandomData.counter, y: rnd}

  @generate: (num)->
    all = _.map _.range(0, num), @generate_one
    {values: all, key: "Test Data", color: "#123456"}
