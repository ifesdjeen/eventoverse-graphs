---
title: "Eventoverse Graphs"
layout: default
---

## Eventoverse Graphs

This is a simple graphing library, extracted from Eventoverse, which is a monitoring
tool we've been working on for the last 2 years. It's primary intention is not to
replace tools like [Rickshaw](http://code.shutterstock.com/rickshaw/) or [nvd3](http://nvd3.org/),
we've tried to provide a toolset as close to d3 as possible, instead of making a wrapper
that hides functionality.

You can [find this project on GitHub](http://github.com/ifesdjeen/eventoverse-graphs).

## Simple Line Chart

<div id="line_chart"></div>

<br/>

Creating a Line Chart is as simple as adding a proper html element to your page, for
example, `#line_chart`:

```html
<div id="line_chart"></div>
```

Core of the library is `Eventoverse.Graphs.Canvas`. It's a canvas with grid and axes,
the rest of elements will be rendered on top of it.

Now, let's initialize __Eventoverse Graphs__ and render the chart itslef:

```javascript
JS.require('Eventoverse', function (a) {
  var line_chart, attrs;

  // Configura captions for graphs
  attrs = {
    x: { caption: "Random time data" },
    y: { caption: "Random value data, seconds" }
  };

  // Initialize Canvas with the jQuery root element selector
  line_chart = new Eventoverse.Graphs.Canvas("#line_chart", attrs);

  // Add a Line element
  line_chart.addElement(Eventoverse.Graphs.Lines);

  // Use built-in random data generator
  vals = [Eventoverse.RandomData.generate_continuous(20, "key1"),
          Eventoverse.RandomData.generate_continuous(20, "key2")];
  line_chart.render(vals);
});
```

## Area chart

<div id="area_chart"></div>

To render Area chart, you can use `Eventoverse.Graphs.Area`:

```javascript
var area_chart = new Eventoverse.Graphs.Canvas("#area_chart", attrs);
area_chart.addElement(Eventoverse.Graphs.Area);
area_chart.addElement(Eventoverse.Graphs.Tooltips);
area_chart.render(Eventoverse.RandomData.generate(20));
```

## Bar chart (stacked)

<div id="bar_chart"></div>
<br/>

```javascript
bar_chart = new Eventoverse.Graphs.Canvas("#bar_chart", attrs);
bar_chart.addElement(Eventoverse.Graphs.Histograms);
bar_chart.addElement(Eventoverse.Graphs.Tooltips, {
  ordinal_scale: true
});

vals = [Eventoverse.RandomData.generate_continuous(20, "key1"),
        Eventoverse.RandomData.generate_continuous(20, "key2"),
        Eventoverse.RandomData.generate_continuous(20, "key3"),
        Eventoverse.RandomData.generate_continuous(20, "key4"),
        Eventoverse.RandomData.generate_continuous(20, "key5")];
```

## Min/max lines for Line Chart

Adding minimum or maximum values to your graphs is as easy as:

```javascript
line_chart.addElement(Eventoverse.Graphs.MinLine);
line_chart.addElement(Eventoverse.Graphs.MaxLine);
```

They will identifiy `min` and `max` values of your data, and will be rendered as
a red (max) and blue (min) lines above and under your line graph, as you can see
on the example graph.

## Tooltips

In order to add interactivity to your graphs, you may want to add `Tooltips` to it.
To do that, just pass `Eventoverse.Graphs.Tooltips` to `addElement`:

```javascript
line_chart.addElement(Eventoverse.Graphs.Tooltips);
```

## Data format

Data should be fed to the library in a following format (array of hashes,
where `key` holds information about the caption and identifies the `values`,
and values are given as an array of `x` and `y` tuples, where `x` is a timestamp
and `y` is a numerical value):

```javascript
[
  { key: "key1", // key, identifier for data values
    values: [
      { x: 1371990607, // timestamp
        y: 975.2381164580584}, // value
      { x: 1371990627,
        y: 854.0232812520117}]
  },
  { key: "key2"
    values: [
      { x: 1371990607,
        y: 389.14758735336363},
      { x: 1371990627,
        y: 883.4289375226945}]
  }
]
```

## Developing
