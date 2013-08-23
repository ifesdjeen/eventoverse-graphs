JS.require('Eventoverse', function (a) {
  var area_chart, attrs, bar_chart, line_chart;
  attrs = {
    x: {
      caption: "Random time data"
    },
    y: {
      caption: "Random value data, seconds",
      buffer_size: 400
    }
  };

  line_chart = new Eventoverse.Graphs.Canvas("#line_chart", attrs);
  line_chart.addElement(Eventoverse.Graphs.Lines);
  // line_chart.addElement(Eventoverse.Graphs.MinLine);
  // line_chart.addElement(Eventoverse.Graphs.MaxLine);
  line_chart.addElement(Eventoverse.Graphs.Tooltips, {
    tip_formatter: function(d) {
      return "123";
    }
  });
  vals = [Eventoverse.RandomData.generate_continuous(20, "key1"),
          Eventoverse.RandomData.generate_continuous(20, "key2")];
  line_chart.render(vals);
  var last_timestamp = _.last(vals[0].values).x;
  function pushValues() {
    vals = [{ key: "key1", values: [Eventoverse.RandomData.generate_one(last_timestamp)]},
            { key: "key2", values: [Eventoverse.RandomData.generate_one(last_timestamp)]}];
    last_timestamp += 2000;

    line_chart.redraw(vals);
    _.delay(pushValues, 1000);
  }
  _.delay(pushValues, 1000);
});
