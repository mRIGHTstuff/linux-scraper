var casper = require('casper').create({
	/* verbose: true,
	logLevel: 'debug' */
});

var pages = [];
var currentPage = 0;

function addPages(page) {
	this.then(function() {
		var found = this.evaluate(searchLinks);
		this.echo(found.length + " pages found on " + page);
		pages = pages.concat(found);
	});
}

function searchPages() {
	var filter, map;
	filter = Array.prototype.filter;
	map = Array.prototype.map;
	return map.call(filter.call(document.querySelectorAll('id="toc"'), function(a) {
		return (/^http:\/\/)
	}))
}

casper.setFilter('page.confirm', function(message) {
    self.received = message;
    this.echo("message to confirm : " + message);
    return true;
});

/* casper.on('error', function(msg,backtrace) {
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

casper.options.viewportSize = {width: 1600, height: 950};

casper.start('', function(){

});

casper.then(function() {
	this.capture('linux.png');
});

casper.run();