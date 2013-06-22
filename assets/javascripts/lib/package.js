JS.Packages(function() {
    with(this) {
        file('assets/javascripts/vendor/jquery.js',
             'assets/javascripts/vendor/tipsy.js',
             'assets/javascripts/vendor/underscore.js',
             'assets/javascripts/vendor/graph/d3.js',
             'assets/javascripts/vendor/graph/colorbrewer.js',
             'assets/javascripts/lib/graphs/core.js',
             'assets/javascripts/lib/graphs/utils.js',
             'assets/javascripts/lib/graphs/random_data.js',
             'assets/javascripts/lib/graphs/canvas.js',
             'assets/javascripts/lib/graphs/line.js',
             'assets/javascripts/lib/graphs/histogram.js',
             'assets/javascripts/lib/graphs/tooltip.js')
            .provides("Eventoverse")
            .requires('JS.Class');
    }
});
