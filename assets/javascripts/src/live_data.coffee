class @LiveFeed
  constructor: ()->
    @endpoint  = "ws://#{window.location.host}/apps/#{$("#application").val()}/env/#{$("#environment").val()}/live/feed/"
    @rowsLimit = 50
    @dispatchers = []

    @messageRate = 0
    @lastMessageTimestamp = null


  onMessage: (type, data, html)->

    _.each(@dispatchers, ((dispatcher)-> dispatcher(data)))

    currentTimestamp = Math.round(new Date() / 1000)
    if (@lastMessageTimestamp && @lastMessageTimestamp == currentTimestamp)
      @messageRate += 1
    else
      console.log(@messageRate, data.received_at) if console?
      @messageRate = 1


    @lastMessageTimestamp = currentTimestamp
    # Elements.from(html).inject(@tbody, 'top')
    # @maybePruneLastRow()

  addDispatcher: (dispatcher)->
    @dispatchers.push(dispatcher)

  dispatchMessage: (evt)->
    payload = JSON.parse(evt.data)
    @onMessage(payload.type, payload.data, payload.html)

  watch: ()->
    @socket  = new WebSocket(@endpoint)
    @socket.onmessage = @dispatchMessage.bind(this)


  maybePruneLastRow: ()->
    if(@getRowCount() > @rowsLimit)
      lastRow = @tbody.getElements("tr").getLast()
      if(lastRow != undefined)
      	lastRow.destroy()

  getRowCount: (tbody)->
    @element.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length

$ ()->
  if ($("#graphs").length > 0)
    feed = new LiveFeed()
    feed.watch()
    stats = JSON.parse($("#stats").val())


    $("#graphs").append($("<h3>Performance data</h3>"))

    attrs =
      x:
        caption: "Last 400 data points"
      y:
        caption: "Response time, seconds"
      buffer_size: 400

    graph_config =
      feed: feed
      filter: ((data)-> data.type == "page_load")
      extractor: ((data)-> {y: (data.additional_info.execution_time), complete_info: data})

    new Eventoverse.Graphs.RealTimeCanvas("#graphs", attrs)
      .addElement(Eventoverse.Graphs.RealTimeLine, graph_config)
      .addElement(Eventoverse.Graphs.Controls, {tip_formatter: (d)-> "<dl><dt>Received At</dt><dd>#{d.complete_info.received_at}</dd><dt>URL</dt><dd>#{d.complete_info.additional_info.url}</dd><dt>Host</dt><dd>#{d.complete_info.hostname}</dd><dt>Status</dt><dd>#{d.complete_info.additional_info.status}</dd><dt>Time (sec)</dt><dd>#{d.complete_info.additional_info.execution_time}</dd><dt>User Agent</dt><dd>#{d.complete_info.additional_info.user_agent}</dd></dl>"})
      .render({values: d3.range(400).map(()-> {y: 0, complete_info: {}})})

    _.each stats.hosts, (host)->
      $("#graphs").append($("<h3>Memory on #{host}</h3>"))

      attrs =
        x:
          caption: "Last 400 data points"
        y:
          caption: "Memory (GB)"
        buffer_size: 400


      graph_config =
        feed: feed
        filter: ((data)-> (data.type == "memory_usage" && data.hostname == host))
        extractor: ((data)-> {y: (data.additional_info.HeapMemoryUsage.used / 1000000000), complete_info: data})

      new Eventoverse.Graphs.RealTimeCanvas("#graphs", attrs)
        .addElement(Eventoverse.Graphs.RealTimeLine, graph_config)
        .addElement(Eventoverse.Graphs.Controls, {tip_formatter: (d)-> "<dl><dt>Received At</dt><dd>#{d.complete_info.received_at}</dd><dt>Memory(heap): </dt><dd>#{d.complete_info.additional_info.HeapMemoryUsage.used}</dd><dt>Memory(non-heap): </dt><dd>#{d.complete_info.additional_info.NonHeapMemoryUsage.used}</dd></dl>"})
        .render({values: d3.range(400).map(()-> {y: 0, complete_info: {}})})
