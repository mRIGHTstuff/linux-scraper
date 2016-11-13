
var casper = require('casper').create({
	//Debug data below is commented out unless necessary
	//verbose: true,
	//logLevel: 'debug'
});
// These variables reference elements on the page
var nextLink = "#tobj43169 a"; 
var prevLink = "#tobj43167 a";
var count = 0

// This function confirms that a page loads
casper.setFilter('page.confirm', function(message) {
    self.received = message;
    this.echo("message to confirm : " + message);
    return true;
});

// error logs should be put in for debugging purposes but otherwise are unnecessary.
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

// Adjust the size of the casper viewport for screens
casper.options.viewportSize = {width: 1000, height: 600};

// The first webpage to load and capture, very straightforward
casper.start('webpage here', function(){
	// the first screen is saved as a png
	this.capture('linux.png');
});

// The first function for iterating through a single page
casper.then(function() {
	// wait for the element to finish loading, necessary for JS pages as they may not load all elements evenly
	casper.waitForSelector(nextLink, function() {
		// first loop, if the variable is visible it starts
		if (this.visible(nextLink)) {
			// click the element and wait
        	this.click(nextLink);
        	this.wait(2000);
    }   else {
    		// if the element is not visible then it's over
        	this.echo("END");
    	}
	});
});

// the function for iterating through remaining pages after first
casper.then(function() {
	// these variables determine how many times to iterate, it will keep working up to the end number but will not take screenshots if the number of pages is smaller.  This is less clean than telling it to stop on the final page.
	var current = 1;
	var end = 740;
	// initial attempts used a while loop, but a for loop was found to better execute the task
	for (current = 1; current < 740; current++) {
		// basically the same as above, it will just keep executing in a loop
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

// Now the task at hand is to have it save the pages content as html.  Currently it only takes a photo of the initial page.
// If content requires scrolling it will be off screen and this is undesirable for obvious reasons.
// Pages saved as html should have full content available.

casper.run();