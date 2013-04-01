$(()->
  attrs =
    x:
      caption: "Random time data"
    y:
      caption: "Random value data, seconds"
      buffer_size: 400

  line_chart = new Eventoverse.Graphs.Canvas("#line_chart", attrs)
  line_chart.addElement(Eventoverse.Graphs.Line)
  line_chart.addElement(Eventoverse.Graphs.MinLine)
  line_chart.addElement(Eventoverse.Graphs.MaxLine)
  line_chart.addElement(Eventoverse.Graphs.Tooltip, {tip_formatter: (d)-> "123"})
  line_chart.render(Eventoverse.RandomData.generate(20))

  area_chart = new Eventoverse.Graphs.Canvas("#area_chart", attrs)
  area_chart.addElement(Eventoverse.Graphs.Area)
  area_chart.addElement(Eventoverse.Graphs.Tooltip, {tip_formatter: (d)-> "123"})
  area_chart.render(Eventoverse.RandomData.generate(20))

  bar_chart = new Eventoverse.Graphs.Canvas("#bar_chart", attrs)
  bar_chart.addElement(Eventoverse.Graphs.Histogram)
  bar_chart.render(Eventoverse.RandomData.generate(20))

  # bar_chart.addElement(Eventoverse.Graphs.Brush)

  # d3.json("/demo_data/bar_chart.json", (all_data)->
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
