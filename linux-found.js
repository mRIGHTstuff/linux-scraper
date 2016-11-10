var casper = require('casper').create({
	verbose: true,
	logLevel: 'debug'
});
var nextLink = "#tobj43169 a"; 
var prevLink = "#tobj43167 a";

casper.setFilter('page.confirm', function(message) {
    self.received = message;
    this.echo("message to confirm : " + message);
    return true;
});

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
}); 

casper.options.viewportSize = {width: 1000, height: 750};

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

while(true) {
	var count = []
	casper.visible(prevLink, function() {
		this.visible(nextLink, function() {
			this.capture("linux" + count++ + ".png")
		})
		this.click(nextLink);
		this.wait(2000);
	})
};


casper.run();