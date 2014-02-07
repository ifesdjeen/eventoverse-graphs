JS.require('Eventoverse', function (a) {
    var area_chart, attrs, bar_chart, line_chart;
    attrs = {
        x: {
            caption: "Random time data"
        },
        y: {
            caption: "Random dvalue data, seconds",
            buffer_size: 400
        },
        interpolate: "cardinal",
        margin: {
          top: 500,
          right: 30,
          bottom: 30,
          left: 50
        },
        base_width: 100,
        base_height: 250

    };

    line_chart = new Eventoverse.Graphs.Canvas("#line_chart", attrs);
    line_chart.addElement(Eventoverse.Graphs.Lines);
    line_chart.addElement(Eventoverse.Graphs.MinLine);
    line_chart.addElement(Eventoverse.Graphs.MaxLine);
    line_chart.addElement(Eventoverse.Graphs.Tooltips, {
        // tip_formatter: function(d) {
        //     return "123";
        // }
    });

  vals = [
      { key: "key1", // key, identifier for data values
        values: [
          { x: 1371990607, // timestamp
            y: 975.2381164580584}, // value
          { x: 1371990627,
            y: 854.0232812520117}]
      },
      { key: "key2",
        values: [
          { x: 1371990607,
            y: 389.14758735336363},
          { x: 1371990617,
            y: 389.14758735336363},
          { x: 1371990627,
            y: 883.4289375226945}]
      }
    ];


    // vals = [Eventoverse.RandomData.generate_continuous(20, "key1"),
    //         Eventoverse.RandomData.generate_continuous(20, "key2")];

            // console.log(vals);
    line_chart.render(vals);
});
