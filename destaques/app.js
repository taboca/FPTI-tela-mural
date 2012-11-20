var app =  {
	feedURL : URL_DESTAQUES2,
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
		this.feed = new t8l.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(t8l.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);
	} ,
        

	popRequest : function() {
		if (this.picQueue.length == 0) return false;

		var obj = this.picQueue.pop();
		var t = obj.title; 
		var d = obj.desc; 
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
		k.className = 'app_element';
		
		k.innerHTML = '<div class="title">'+t+'</div><div class="description">'+d+'</div>';
		
		var t = 4;
	        var mm = "-moz-transition-property: opacity; -moz-transition-duration:"+t+"s;opacity:0 ; "
	        var oo = "-o-transition-property: opacity; -o-transition-duration:"+t+"s;opacity:0 ; "
	        var ww = "-webkit-transition-property: opacity; -webkit-transition-duration:"+t+"s;opacity:0 ; "

	        this.background.setAttribute("style", mm  + oo + ww);

		var old = this.element.firstChild;
		this.element.insertBefore(k, this.element.firstChild);
		var diff = window.innerHeight - k.offsetHeight;
		//k.style.marginTop=diff+"px";
		this.element.removeChild(old);

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
     		$(result.xmlDocument).find('item').each(function(){ 
			var title = $(this).find('title').text();
			var docDate=new Date();
			var docDateString = title.split("/");
			var docDay = docDateString[0];
			var docMonth = docDateString[1];
			var docYear = docDateString[2];
			docDate.setFullYear(parseInt(docYear),parseInt(docMonth-1),parseInt(docDay));
			var today = new Date();
			var link = $(this).find('description').text();
			var src = "http"+link.split('http')[1].split('jpg')[0]+"jpg";
			$('#temp').html(link);
			var plainText = $('#temp').text();	
			self.picQueue.push({'title':title, 'desc': plainText, 'src':src});
		});
		setTimeout( function(){self.updateFeed()},1000);
	}
}


