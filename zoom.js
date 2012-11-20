/* ***** BEGIN LICENSE BLOCK *****
* Version: MPL 1.1/GPL 2.0/LGPL 2.1
*
* The contents of this file are subject to the Mozilla Public License Version
* 1.1 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
* http://www.mozilla.org/MPL/
*
* Software distributed under the License is distributed on an "AS IS" basis,
* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
* for the specific language governing rights and limitations under the
* License.
*
* The Original Code is TelaSocial TagVisor
*
* The Initial Developer of the Original Code is Taboca TelaSocial.
* Portions created by the Initial Developer are Copyright (C) 2011
* the Initial Developer. All Rights Reserved.
*
* Contributor(s):
* Marcio Galli <mgalli@taboca.com>
*
* Alternatively, the contents of this file may be used under the terms of
* either the GNU General Public License Version 2 or later (the "GPL"), or
* the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
* in which case the provisions of the GPL or the LGPL are applicable instead
* of those above. If you wish to allow use of your version of this file only
* under the terms of either the GPL or the LGPL, and not to allow others to
* use your version of this file under the terms of the MPL, indicate your
* decision by ddomElementting the provisions above and replace them with the notice
* and other provisions required by the GPL or the LGPL. If you do not ddomElementte
* the provisions above, a recipient may use your version of this file under
* the terms of any one of the MPL, the GPL or the LGPL.
*
* ***** END LICENSE BLOCK ***** */

var tv = { 

	viewWidth: null,
	viewHeight: null, 
	dataStyle: "", 

	setup: function (doc) { 
	
		if(doc) { 
			viewWidth = doc.body.clientWidth;
			viewHeight =  doc.body.clientHeight;
		} else { 
			viewWidth = document.body.clientWidth;
			viewHeight =  document.body.clientHeight;
		} 
		var dataStyle = this.dataStyle + "html { overflow:hidden; width:100%; height:100%; } body { margin:0 ;}";
		var inlinestyle = document.createElement('link');
		inlinestyle.setAttribute("rel","stylesheet");
		inlinestyle.setAttribute("href","data:text/css,"+ escape(dataStyle));
		document.getElementsByTagName("head")[0].appendChild(inlinestyle);
	}, 
	refreshView: function (d) { 
		this.viewLeft = d.documentElement.clientLeft;
		this.viewTop =  d.documentElement.clientTop;
		this.viewWidth = d.documentElement.clientWidth;
		this.viewHeight = d.documentElement.clientHeight;
	}, 
	offset: function (domElement) {
	        if(!domElement) domElement = this;
	        var x = domElement.offsetLeft;
	        var y = domElement.offsetTop;
	        while (domElement = domElement.offsetParent) {
	                x += domElement.offsetLeft;
	                y += domElement.offsetTop;
	        }
        	return { left: x, top: y };
	},
	do: function (a, t, d) { 

		var x = 0; 
		var y = 0;
		var center = true;
		this.refreshView(d); 
		var el = this.offset(a);

		if(!center) { 
			var x= el.left - this.viewLeft;
			var y= el.top - this.viewTop;
		} else { 
			var x= el.left - this.viewLeft - parseInt((this.viewWidth - parseInt(a.offsetWidth))/2);	
			var y= el.top - this.viewTop - parseInt((this.viewHeight - parseInt(a.offsetHeight))/2);	

		} 
	        d.body.setAttribute("style","-moz-transition-property: -moz-transform; -moz-transform:translate("+parseInt(-1*x)+"px,"+parseInt(-1*y)+"px); -moz-transition-duration:"+t+"s; -webkit-transition-property: -webkit-transform; -webkit-transform:translate("+parseInt(-1*x)+"px,"+parseInt(-1*y)+"px); -webkit-transition-duration:"+t+"s; -o-transition-property: -o-transform; -o-transform:translate("+parseInt(-1*x)+"px,"+parseInt(-1*y)+"px); -o-transition-duration:"+t+"s;");

		var el = this.offset(a);
		var sW = this.viewWidth/a.offsetWidth;
		var sH = this.viewHeight/a.offsetHeight;

		var sC = 0;
	
			var x= el.left;	
			var y= el.top;	

		var probeHeight = a.offsetHeight*sW;
		if(probeHeight<=this.viewHeight) { 
			sC = sW ;
			this.recordScale = a.offsetWidth/this.viewWidth;
		} 
		else { 
		 sC = sH;
		 this.recordScale = a.offsetHeight/this.viewHeight;
		} 
	        var str =   "-moz-transition-property: -moz-transform, -moz-transform-origin: 0 0 ; -moz-transition-duration:"+t+"s;-moz-transform:scale("+sC+");";
	        str += "-webkit-transition-property: -webkit-transform, -webkit-transform-origin: 0 0 ; -webkit-transition-duration:"+t+"s;-webkit-transform:scale("+sC+");";
	        str += "-o-transition-property: -o-transform, -o-transform-origin: 0 0 ; -o-transition-duration:"+t+"s;-o-transform:scale("+sC+");";
	        d.documentElement.setAttribute("style",str);
	} 
} 
