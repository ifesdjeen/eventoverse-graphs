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
        // Set how the line is drawn
        // more options at https://github.com/mbostock/d3/wiki/SVG-Shapes
        interpolate: "linear",
        margin: {
          top: 0,
          right: 5,
          // Setting the bottom to 0 crops off the Y axis
          bottom: 0,
          left: 35
        },
        base_width: 300,
        base_height: 250

    };

    line_chart = new Eventoverse.Graphs.Canvas("#line_chart", attrs);
    line_chart.addElement(Eventoverse.Graphs.Lines);

    // You can comment out any of these to disable the feature
    line_chart.addElement(Eventoverse.Graphs.MinLine);
    line_chart.addElement(Eventoverse.Graphs.MaxLine);
    line_chart.addElement(Eventoverse.Graphs.Tooltips, {
        tip_formatter: function(d) {
            // Format the tool tips as you like
            return d.key + ': ' + d.y.toFixed(2) + ' at ' + new Date(d.x *1000);
        }
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

    // Or if you want to use random data ...
    // vals = [Eventoverse.RandomData.generate_continuous(20, "key1"),
    //         Eventoverse.RandomData.generate_continuous(20, "key2")];

    line_chart.render(vals);
});
