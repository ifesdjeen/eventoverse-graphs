

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
    line_chart.addElement(Eventoverse.Graphs.Line);
    line_chart.addElement(Eventoverse.Graphs.MinLine);
    line_chart.addElement(Eventoverse.Graphs.MaxLine);
    line_chart.addElement(Eventoverse.Graphs.Tooltip, {
      tip_formatter: function(d) {
        return "123";
      }
    });
    line_chart.render(Eventoverse.RandomData.generate(20));
    area_chart = new Eventoverse.Graphs.Canvas("#area_chart", attrs);
    area_chart.addElement(Eventoverse.Graphs.Area);
    area_chart.addElement(Eventoverse.Graphs.Tooltip, {
      tip_formatter: function(d) {
        return "123";
      }
    });
    area_chart.render(Eventoverse.RandomData.generate(20));
    bar_chart = new Eventoverse.Graphs.Canvas("#bar_chart", attrs);
    bar_chart.addElement(Eventoverse.Graphs.Histogram);
    return bar_chart.render(Eventoverse.RandomData.generate(20));
  });

  this.Eventoverse.RandomData = JS.Class({});
  this.Eventoverse.RandomData.counter = 100;
  this.Eventoverse.RandomData.generate_one= function() {
      var rnd, time;
      time = Math.floor(new Date().getTime() / 1000);
      rnd = Math.random() * 10;
      Eventoverse.RandomData.counter = Eventoverse.RandomData.counter + 20;
      return {
          x: time + Eventoverse.RandomData.counter,
          y: rnd
      };
  };

  this.Eventoverse.RandomData.generate = function(num) {
      var all;
      all = _.map(_.range(0, num), this.generate_one);
      return {
        values: all,
        key: "Test Data",
        color: "#123456"
      };
    };

    return RandomData;

  })();
