class @Eventoverse
class @Eventoverse.Graphs

class @Eventoverse.Utils
  @mergeData: (data)->
    return data.values if data.values?
    d3.merge(_.map(data, (i)-> i.values))
