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
    line_chart.addElement(Eventoverse.Graphs.MinLine);
    line_chart.addElement(Eventoverse.Graphs.MaxLine);
    line_chart.addElement(Eventoverse.Graphs.Tooltips, {
        tip_formatter: function(d) {
            return "123";
        }
    });
    vals = [Eventoverse.RandomData.generate_continuous(20, "key1"),
            Eventoverse.RandomData.generate_continuous(20, "key2")];
    line_chart.render(vals);
});
