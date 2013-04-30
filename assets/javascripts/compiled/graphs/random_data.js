this.Eventoverse.RandomData = JS.Class({});
this.Eventoverse.RandomData.counter = 100;

this.Eventoverse.RandomData.generate_one= function() {
    var rnd, time;
    time = Math.floor(new Date().getTime() / 1000);
    rnd = Math.random() * 1000;
    Eventoverse.RandomData.counter = Eventoverse.RandomData.counter + 20;
    return {
        x: time + Eventoverse.RandomData.counter,
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
