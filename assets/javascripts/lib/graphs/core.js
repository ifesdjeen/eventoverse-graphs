this.Eventoverse = {debug: false};
this.Eventoverse.Graphs = {};

Eventoverse.version = "0.1.0";

Eventoverse.log = function(){
  if (!Eventoverse.debug)
    return;

  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};
