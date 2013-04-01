# Eventoverse Graphs

This is a simple graphing library, extracted from Eventoverse, which is a monitoring
service we've been developing for the last 2 years. It's primary intention is not to
replace tools like Richshaw or nvd3, we've tried to provide a toolset as close to d3
as possible, instead of making a wrapper that hides functionality (I apologize in
advance, since maybe it's my lack of understanding that have prevented
me from extending other tools, not library intention).

# Project goals

  * provide a simple interface for visualizing time series
  * be _very_ composable, allow people to roll with their own implementation of axis, line, combined charts and so on
  * provide dead simple interface for real-time graphs
  * allow fetching data from tools like Graphite and visualize it with JS

# Project status

Currently it's under heavy development. After it's been extracted, several features were added, that are not yet used in production.
Interface is rather stable, since it consists of 1 function, `render`, and a constructor.

# License

Copyright (C) 2012-2013 Alex Petrov

Distributed under Apache Public License.
