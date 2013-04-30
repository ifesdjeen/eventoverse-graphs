JS.Packages(function() {
    with(this) {
        file('assets/javascripts/vendor/jquery.js',
             'assets/javascripts/vendor/tipsy.js',
             'assets/javascripts/vendor/underscore.js',
             'assets/javascripts/vendor/graph/d3.js',
             'assets/javascripts/vendor/graph/colorbrewer.js',
             'assets/javascripts/compiled/graphs/core.js',
             'assets/javascripts/compiled/graphs/utils.js',
             'assets/javascripts/compiled/graphs/random_data.js',
             'assets/javascripts/compiled/graphs/canvas.js',
             'assets/javascripts/compiled/graphs/line.js',
             'assets/javascripts/compiled/graphs/histogram.js',
             'assets/javascripts/compiled/graphs/tooltip.js')
            .provides("Eventoverse")
            .requires('JS.Class');
    }
});
