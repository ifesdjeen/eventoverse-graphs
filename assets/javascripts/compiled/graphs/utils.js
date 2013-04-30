this.Eventoverse.Utils = JS.Class({});

this.Eventoverse.Utils.mergeData = function(data) {
    if (data && (data.values != null)) {
        return data.values;
    }
    return d3.merge(_.map(data, function(i) {
        return i.values;
    }));
};

this.Eventoverse.Utils = JS.Class({});
this.Eventoverse.Utils.denormalize_key = function(data) {
    return _.map(data, function(i, id) {
        i.values = _.map(i.values, function(j) {
            j["key"] = i.key;
            j["identifier"] = id;
            return j;
        });
        return i;
    });
};

this.Eventoverse.Utils.mergeData = function(data) {
    if (data && (data.values != null)) {
        return data.values;
    }
    return d3.merge(_.map(this.denormalize_key(data), function(d) {
        return d.values;
    }));
};
