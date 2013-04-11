class @Eventoverse
class @Eventoverse.Graphs


class @Eventoverse.Utils
  @denormalize_key: (data)->
    _.map data, (i, id)->
      i.values = _.map i.values, (j)->
        j["key"] = i.key ; j["identifier"] = id
        j
      i
  @mergeData: (data)->
    return data.values if data && data.values?
    d3.merge(_.map @denormalize_key(data), (d)-> d.values)
