// Generated by CoffeeScript 1.4.0
(function() {

  this.Eventoverse = (function() {

    function Eventoverse() {}

    return Eventoverse;

  })();

  this.Eventoverse.Graphs = (function() {

    function Graphs() {}

    return Graphs;

  })();

  this.Eventoverse.Utils = (function() {

    function Utils() {}

    Utils.mergeData = function(data) {
      if (data && (data.values != null)) {
        return data.values;
      }
      return d3.merge(_.map(data, function(i) {
        return i.values;
      }));
    };

    return Utils;

  })();

}).call(this);