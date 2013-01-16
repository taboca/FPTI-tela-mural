
var app =  {
	feedURL : URL_NOTICIAS,
	feed    : null, 

	background : null, 
	backgroundBackground : null, 
	curr: 0, 

	start : function() {
		this.element = document.createElement('div');
		this.element.className="appPanel";
		this.element.id = Math.random();
		this.picQueue = new Array();

		this.backgroundBackground=document.createElement('div');
		this.backgroundBackground.className="image";
		var img = document.createElement("img");
		this.backgroundBackground.appendChild(img);
		document.getElementById("container").appendChild(this.backgroundBackground);
		this.background=document.createElement('div');
		this.background.className="image";
		var img = document.createElement("img");
		this.background.appendChild(img);
		document.getElementById("container").appendChild(this.background);

		var first = document.createElement("div");
		first.setAttribute('style','position:absolute;top:0;left:0;');		
		this.firstId = "elementFirst";
		first.id = this.firstId;
		this.tweetRepeated = {};
		this.element.appendChild(first);
		document.getElementById("container").appendChild(this.element);

		var self = this;
		setTimeout( function(){self.updateFeed()},500);
	},

	init : function () { 
		// Notice this widget is now using the store, 
		// so it's ignoring the this.feedURL 
		this.feed = new t8l.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(t8l.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	} ,

	popRequest : function() {
		if (this.picQueue.length == 0) return false;

		var obj = this.picQueue.pop();
		var t = obj.title; 
		var d = obj.descFull; 
		var src = obj.src;

		document.getElementById("container").removeChild(this.background);
		this.background=this.backgroundBackground; 

		this.backgroundBackground=document.createElement('div');
		this.backgroundBackground.className="image";
		var img = document.createElement("img");
		this.backgroundBackground.appendChild(img);
		document.getElementById("container").insertBefore(this.backgroundBackground, this.background);

		this.backgroundBackground.firstChild.src=src;
		var these = this;
		this.backgroundBackground.firstChild.onload = function () { 
			these.transitionTo(t,d);
		} 

		return true;
	}, 

	transitionTo: function (t,d) { 

		var k = document.createElement('div');
		k.className = 'flexcontainer';
		k.innerHTML = '<div class="flex title" >'+t+'</div><div class="flex" data-flex="expand"></div><div class="flex description">'+d+'</div>';
		
		var t = 4;
	        var mm = "-moz-transition-property: opacity; -moz-transition-duration:"+t+"s;opacity:0 ; "
	        var oo = "-o-transition-property: opacity; -o-transition-duration:"+t+"s;opacity:0 ; "
	        var ww = "-webkit-transition-property: opacity; -webkit-transition-duration:"+t+"s;opacity:0 ; "

	        this.background.setAttribute("style", mm  + oo + ww);

		var old = this.element.firstChild;
		this.element.insertBefore(k, this.element.firstChild);
		this.element.removeChild(old);

        refreshFlex();
		var self = this;
		setTimeout( function(){self.updateFeed()},8000);
		return true;
	},

	updateFeed : function() {
		var self = this;
		if (!this.popRequest()) {
		   this.feed.load( function (e) { self.__feedUpdated(e) } );
		} 
	},

	__feedUpdated : function(result) {
		var self  = this;
		if(result.error) { }; 
		var obj = JSON.parse(result.data);
		self.picQueue.push(obj);
		setTimeout( function(){self.updateFeed()},1000);
	}
}


