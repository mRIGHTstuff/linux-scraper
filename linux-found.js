var casper = require('casper').create({
	//verbose: true,
	//logLevel: 'debug'
});
var nextLink = "#tobj43169 a"; 
var prevLink = "#tobj43167 a";
var count = 0

casper.setFilter('page.confirm', function(message) {
    self.received = message;
    this.echo("message to confirm : " + message);
    return true;
});
/*
casper.on('error', function(msg,backtrace) {
  this.echo("=========================");
  this.echo("ERROR:");
  this.echo(msg);
  this.echo(backtrace);
  this.echo("=========================");
});

casper.on("page.error", function(msg, backtrace) {
  this.echo("=========================");
  this.echo("PAGE.ERROR:");
  this.echo(msg);
  this.echo(backtrace);
  this.echo("=========================");
}); */

casper.options.viewportSize = {width: 1000, height: 600};

casper.start('', function(){
	this.capture('linux.png');
});

casper.then(function() {
	casper.waitForSelector(nextLink, function() {
		if (this.visible(nextLink)) {
        this.click(nextLink);
        this.wait(2000);
    }   else {
        this.echo("END");
    	}
	});
});

casper.then(function() {
	var current = 1;
	var end = 740;
	for (current = 1; current < 740; current++) {
		(function(cntr) {
			casper.then(function(){
				if (this.visible(nextLink)) {
				this.capture("linux" + cntr + ".png");
				this.click(nextLink);
				this.wait(2000);
			}
			})
		})(current);

	}
});

casper.run();