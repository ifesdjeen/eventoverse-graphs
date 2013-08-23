this.Eventoverse.RandomData = JS.Class({});
this.Eventoverse.RandomData.counter = 100;

this.Eventoverse.RandomData.generate_one= function(_time) {
  var rnd, time;
  if (_time) {
    time = _time;
  } else {
    Eventoverse.RandomData.counter = Eventoverse.RandomData.counter + 1000;
    time = Math.floor(new Date().getTime());
    time = time + Eventoverse.RandomData.counter;
  }

  rnd = Math.random() * 1000;

  return {
    x: time,
    y: rnd
  };
};

this.Eventoverse.RandomData.generate = function(num, key) {
  var all;
  all = _.map(_.range(0, num), this.generate_one);
  return {
    identifier: num,
    values: all,
    key: key || "Test Data"
  };
};

this.Eventoverse.RandomData.generate_continuous = function(num, key) {
  var all;
  Eventoverse.RandomData.counter = 100;
  all = _.map(_.range(0, num), _.bind(function () {
    return this.generate_one();
  }, this));
  return {
    values: all,
    key: key || "Test Data"
  };
};
